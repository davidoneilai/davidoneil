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

function mountNet() {
  const btn = document.querySelector<HTMLButtonElement>('.net');
  if (!btn) return;

  const stepEl = btn.querySelector('.net__step');
  const lossEl = btn.querySelector('.net__loss');
  const spark = btn.querySelector('.net__spark polyline');
  const edges = [...btn.querySelectorAll<SVGLineElement>('.net__edge')];
  const pulses = btn.querySelectorAll('.net__fwd, .net__bwd');
  const nodes = btn.querySelectorAll('.net__node');
  const hops = 4;
  const fwd = (h: number) => btn.querySelectorAll(`.net__fwd[data-hop="${h}"]`);
  const bwd = (h: number) => btn.querySelectorAll(`.net__bwd[data-hop="${h}"]`);
  const layer = (l: number) => btn.querySelectorAll(`[data-layer="${l}"]`);

  let epoch = 1;
  let step = 0;
  let loss = 0.912;
  let history = [loss];

  const render = () => {
    if (stepEl) stepEl.textContent = `epoch ${epoch} · step ${String(step).padStart(2, '0')}`;
    if (lossEl) lossEl.textContent = `loss ${loss.toFixed(3)}`;
    const top = Math.max(...history);
    spark?.setAttribute(
      'points',
      history.map((v, i) => `${((i / 15) * 64).toFixed(1)},${(15 - (v / top) * 13).toFixed(1)}`).join(' '),
    );
  };

  const learn = () => {
    if (loss < 0.06) {
      epoch += 1;
      step = 0;
      loss = 0.9;
      history = [loss];
    } else {
      step += 1;
      loss *= gsap.utils.random(0.72, 0.86);
      history = [...history, loss].slice(-16);
    }
    render();
  };

  render();
  if (reduced) {
    btn.disabled = true;
    return;
  }

  const css = getComputedStyle(document.documentElement);
  const white = css.getPropertyValue('--white').trim();
  const lit = css.getPropertyValue('--accent-soft').trim();
  const hot = css.getPropertyValue('--warm-soft').trim();

  const travel = (lines: NodeListOf<Element>) =>
    gsap.fromTo(
      lines,
      { strokeDashoffset: 14 },
      {
        strokeDashoffset: (_i: number, el: Element) => -Number((el as SVGElement).dataset.len),
        duration: 0.42,
        ease: 'power1.in',
        stagger: { each: 0.005, from: 'random' },
        immediateRender: false,
      },
    );
  const flash = (targets: NodeListOf<Element>, color: string) =>
    gsap.fromTo(targets, { fill: color }, { fill: white, duration: 0.55, immediateRender: false });

  let running: gsap.core.Timeline | null = null;
  let next: gsap.core.Tween | null = null;
  let visible = false;

  const settle = () => {
    next?.kill();
    if (visible) next = gsap.delayedCall(2.2, run);
  };

  function run() {
    next?.kill();
    running?.kill();
    gsap.set(pulses, { strokeDashoffset: 14 });
    gsap.set(nodes, { fill: white });

    const tl = gsap.timeline({ onComplete: settle });
    const hop = 0.26;
    let at = 0;
    for (let h = 0; h < hops; h++, at += hop) {
      tl.add(travel(fwd(h)), at);
      tl.add(flash(layer(h + 1), lit), at + 0.32);
    }
    at += 0.2;
    tl.add(flash(layer(hops), hot), at);
    at += 0.15;
    for (let h = hops - 1; h >= 0; h--, at += hop) {
      tl.add(travel(bwd(h)), at);
      tl.add(flash(layer(h), hot), at + 0.32);
    }
    tl.addLabel('update', at + 0.15);
    edges.forEach((edge) => {
      const width = Number(edge.getAttribute('stroke-width'));
      const nextWidth = gsap.utils.clamp(0.35, 2.1, width + gsap.utils.random(-0.22, 0.22));
      tl.to(edge, { attr: { 'stroke-width': nextWidth.toFixed(2) }, duration: 0.5, ease: 'power2.out' }, 'update');
    });
    tl.call(learn, undefined, 'update');
    running = tl;
  }

  new IntersectionObserver(([entry]) => {
    visible = Boolean(entry?.isIntersecting);
    if (!visible) next?.kill();
    else if (!running?.isActive()) settle();
  }).observe(btn);

  btn.addEventListener('click', run);
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
}

mountStack();
mountNet();
mountTokens();
