/**
 * ECHO-style steering demo. A register axis α ∈ [-1, 1] composes with a prompt:
 * the nearest axis anchor picks the (pre-written) answer, which is re-"decoded"
 * token by token; SAE latent activations interpolate continuously with α.
 */

type Latent = [string, number];
type Data = {
  prompts: { q: string; out: [string, string, string] }[];
  features: [Latent[], Latent[], Latent[]];
  latents: { label: string; id: string }[];
};

const root = document.querySelector<HTMLElement>('.steer');
const dataEl = document.getElementById('steer-data');
if (root && dataEl) mount(root, JSON.parse(dataEl.textContent ?? '{}') as Data);

function mount(root: HTMLElement, { prompts, features, latents }: Data) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const range = root.querySelector<HTMLInputElement>('.steer__range')!;
  const axis = JSON.parse(range.dataset.axis ?? '[]') as string[];
  const out = root.querySelector<HTMLElement>('.steer__out')!;
  const text = root.querySelector<HTMLElement>('.steer__text')!;
  const live = root.querySelector<HTMLElement>('.steer__live')!;
  const qEl = root.querySelector<HTMLElement>('.steer__q span')!;
  const alphaOut = root.querySelector<HTMLElement>('.steer__alpha')!;
  const callAlpha = root.querySelector<HTMLElement>('.steer__call-alpha')!;
  const status = root.querySelector<HTMLElement>('.steer__status')!;
  const count = root.querySelector<HTMLElement>('.steer__count')!;
  const bars = root.querySelector<HTMLOListElement>('.steer__bars')!;
  const ticks = [...root.querySelectorAll<HTMLElement>('.steer__ticks span')];
  const promptBtns = [...root.querySelectorAll<HTMLButtonElement>('.steer__prompt')];
  const generating = root.querySelector('.steer__generating')?.textContent ?? '…';

  let prompt = 0;
  let level = 1;
  let timer = 0;

  const ids = new Map(latents.map((l) => [l.label, l.id]));
  const act = (lvl: number, label: string) => features[lvl].find(([l]) => l === label)?.[1] ?? 0.04;
  // piecewise-linear activation between anchors at α = -1, 0, +1
  const activation = (alpha: number, label: string) => {
    const [lo, hi, t] = alpha < 0 ? [0, 1, alpha + 1] : [1, 2, alpha];
    return act(lo, label) * (1 - t) + act(hi, label) * t;
  };
  const levelOf = (alpha: number) => (alpha < -0.33 ? 0 : alpha > 0.33 ? 2 : 1);
  // word-ish tokens for latin scripts, 1–2 char tokens for Han
  const tokenize = (s: string) => s.match(/\s*\p{Script=Han}{1,2}|\s*[^\s\p{Script=Han}]+/gu) ?? [s];

  const renderBars = (alpha: number) => {
    const top = latents
      .map((l) => ({ label: l.label, a: activation(alpha, l.label) }))
      .sort((a, b) => b.a - a.a)
      .slice(0, 5);
    bars.replaceChildren(
      ...top.map(({ label, a }) => {
        const li = document.createElement('li');
        li.innerHTML =
          '<span class="steer__lid"></span><span class="steer__lname"></span><span class="steer__lbar"><span></span></span><span class="steer__lval"></span>';
        li.querySelector('.steer__lid')!.textContent = ids.get(label) ?? '';
        li.querySelector('.steer__lname')!.textContent = label;
        (li.querySelector('.steer__lbar span') as HTMLElement).style.transform = `scaleX(${a.toFixed(3)})`;
        li.querySelector('.steer__lval')!.textContent = a.toFixed(2);
        return li;
      }),
    );
  };

  const renderAlpha = (alpha: number) => {
    const scaled = (alpha * 8).toFixed(1);
    const signed = alpha >= 0 ? `+${scaled}` : scaled;
    alphaOut.textContent = `α = ${signed}`;
    callAlpha.textContent = signed;
    root.style.setProperty('--alpha', alpha.toFixed(3));
  };

  const generate = () => {
    clearTimeout(timer);
    const full = prompts[prompt].out[level];
    qEl.textContent = prompts[prompt].q;
    out.dataset.level = String(level);
    ticks.forEach((t, i) => t.classList.toggle('is-on', i === level));
    range.setAttribute('aria-valuetext', axis[level] ?? '');
    const ckpt = document.querySelector('.hud__pct')?.textContent;

    if (reduced) {
      text.textContent = full;
      count.textContent = String(tokenize(full).length);
      status.textContent = ckpt ? `ckpt ${ckpt}` : '';
      live.textContent = full;
      return;
    }

    const toks = tokenize(full);
    text.replaceChildren();
    out.classList.add('is-generating');
    status.textContent = generating;
    let i = 0;
    const tick = () => {
      // emit 1–3 tokens per tick, like a sampler with uneven latency
      const burst = 1 + ((Math.random() * 3) | 0);
      for (let b = 0; b < burst && i < toks.length; b++, i++) {
        const span = document.createElement('span');
        span.className = 'steer__tok';
        span.textContent = toks[i];
        text.append(span);
      }
      count.textContent = String(i);
      if (i < toks.length) timer = window.setTimeout(tick, 28 + Math.random() * 40);
      else {
        out.classList.remove('is-generating');
        status.textContent = ckpt ? `ckpt ${ckpt}` : '';
        live.textContent = full;
      }
    };
    tick();
  };

  range.addEventListener('input', () => {
    const alpha = Number(range.value);
    renderAlpha(alpha);
    renderBars(alpha);
    const next = levelOf(alpha);
    if (next !== level) {
      level = next;
      generate();
    }
  });

  promptBtns.forEach((btn) =>
    btn.addEventListener('click', () => {
      const next = Number(btn.dataset.prompt) || 0;
      promptBtns.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      if (next === prompt && !out.classList.contains('is-generating')) return;
      prompt = next;
      generate();
    }),
  );

  renderAlpha(0);
  renderBars(0);
  count.textContent = String(tokenize(text.textContent ?? '').length);

  // First time the demo scrolls into view, decode the default answer live.
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      io.disconnect();
      generate();
    },
    { threshold: 0.35 },
  );
  io.observe(out);
}
