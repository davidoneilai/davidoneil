import gsap from 'gsap';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function mountStack() {
  const kickers = [...document.querySelectorAll<HTMLElement>('.block-kicker')];
  if (!kickers.length) return;

  const mark = () => {
    const atEnd = scrollY + innerHeight >= document.documentElement.scrollHeight - 4;
    const line = innerHeight * 0.28;
    let current = kickers[atEnd ? kickers.length - 1 : 0];
    if (!atEnd) {
      for (const kicker of kickers) {
        if (kicker.getBoundingClientRect().top <= line) current = kicker;
      }
    }
    kickers.forEach((kicker) => kicker.classList.toggle('is-current', kicker === current));
  };

  document.addEventListener('scroll', mark, { passive: true });
  mark();
}

function mountTokens() {
  const root = document.querySelector<HTMLElement>('.lm');
  if (!root || reduced) return;

  const steps = JSON.parse(root.dataset.steps ?? '[]') as { t: string; p: number; alt: [string, number][] }[];
  const toks = [...root.querySelectorAll<HTMLElement>('.tok')];
  const rows = [...root.querySelectorAll<HTMLElement>('.lm__row')];
  const bars = rows.map((row) => row.querySelector('.lm__bar span'));
  if (!steps.length || toks.length !== steps.length) return;

  const options = (i: number): [string, number][] => [[steps[i].t, steps[i].p], ...steps[i].alt];
  const show = (i: number) =>
    options(i).forEach(([t, p], r) => {
      const row = rows[r];
      if (!row) return;
      row.querySelector('.lm__tok')!.textContent = t;
      row.querySelector('.lm__p')!.textContent = p.toFixed(2);
    });

  let tl: gsap.core.Timeline | null = null;
  const play = () => {
    tl?.kill();
    toks.forEach((tok) => tok.classList.add('is-pending'));
    gsap.set(bars, { scaleX: 0 });
    tl = gsap.timeline();
    steps.forEach((_step, i) => {
      const opts = options(i);
      tl!
        .call(() => show(i))
        .fromTo(
          bars,
          { scaleX: 0 },
          {
            scaleX: (r: number) => opts[r]?.[1] ?? 0,
            duration: 0.34,
            ease: 'power2.out',
            stagger: 0.04,
            immediateRender: false,
          },
        )
        .call(() => toks[i].classList.remove('is-pending'))
        .fromTo(toks[i], { autoAlpha: 0, y: 4 }, { autoAlpha: 1, y: 0, duration: 0.22, immediateRender: false })
        .to({}, { duration: 0.2 });
    });
  };

  const seen = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return;
    play();
    seen.disconnect();
  });
  seen.observe(root);
  root.querySelector('.lm__replay')?.addEventListener('click', play);
  // When the visitor's model converges, the LM head "speaks" once more.
  document.addEventListener('train:converged', play);
}

mountStack();
mountTokens();
