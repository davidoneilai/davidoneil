/**
 * "You are the model": the visitor's reading is the training loop.
 * Each <main> section is a batch; time spent reading it advances that batch,
 * which "learns" its concepts in the latent field, lowers the loss and
 * sharpens the reconstruction in the HUD. Progress survives reloads and
 * language switches via sessionStorage (a "checkpoint").
 */

type Concept = { label: string; cluster: number; section: string; x?: number; y?: number; n?: string[] };
type ClusterPos = { side: number; y: number } | null;
type Strings = {
  idle: string;
  learning: string;
  restored: string;
  converged: string;
};
type Data = { concepts: Concept[]; clusters: string[]; clusterPos?: ClusterPos[]; strings: Strings };

const dataEl = document.getElementById('train-data');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const CKPT = 'david-oneil.ckpt';

if (dataEl) boot(JSON.parse(dataEl.textContent ?? '{}') as Data);

function boot({ concepts, clusters, clusterPos = [], strings }: Data) {
  const sections = [...document.querySelectorAll<HTMLElement>('main > section[id]')];
  // interactive demos the HUD must not cover
  const demos = ['steer', 'rag'].map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
  const ids = sections.map((s) => s.id);

  // ---------------------------------------------------------------- state
  const progress: Record<string, number> = Object.fromEntries(ids.map((id) => [id, 0]));
  let restored = false;
  try {
    const saved = JSON.parse(sessionStorage.getItem(CKPT) ?? 'null') as Record<string, number> | null;
    if (saved) {
      for (const id of ids) progress[id] = Math.min(1, Math.max(0, Number(saved[id]) || 0));
      restored = ids.some((id) => progress[id] > 0);
    }
  } catch {
    /* storage unavailable: train from scratch */
  }

  const bySection: Record<string, number[]> = Object.fromEntries(ids.map((id) => [id, []]));
  concepts.forEach((c, i) => (bySection[c.section] ??= []).push(i));
  // A section's weight in the "knowledge" metric: how much it teaches (min 1).
  const weight = Object.fromEntries(ids.map((id) => [id, Math.max(2, bySection[id]?.length ?? 0)]));
  const totalWeight = ids.reduce((a, id) => a + weight[id], 0);

  const knowledge = () => ids.reduce((a, id) => a + progress[id] * weight[id], 0) / totalWeight;
  const learnedFlag = (i: number) => {
    const list = bySection[concepts[i].section] ?? [];
    const k = list.indexOf(i);
    return (progress[concepts[i].section] ?? 0) >= (k + 1) / (list.length + 1);
  };
  const converged = () => ids.every((id) => progress[id] >= 1);

  // Reading time a section needs, proportional to its height.
  const need = (el: HTMLElement) => Math.min(11000, Math.max(2400, (el.offsetHeight / innerHeight) * 4200));

  let step = 0;
  let loss = 2.303;
  let history: number[] = [];
  let fitting = false;
  let wasConverged = converged();

  const save = (() => {
    let last = 0;
    return (force = false) => {
      const now = performance.now();
      if (!force && now - last < 800) return;
      last = now;
      try {
        sessionStorage.setItem(CKPT, JSON.stringify(progress));
      } catch {
        /* ignore */
      }
    };
  })();

  // ---------------------------------------------------------------- HUD
  const hud = document.querySelector<HTMLElement>('.hud');
  const $ = <T extends Element>(sel: string) => hud?.querySelector<T>(sel) ?? null;
  const ui = {
    step: $('.hud__step'),
    loss: $('.hud__loss'),
    pct: $('.hud__pct'),
    meter: $<HTMLElement>('.hud__meter span'),
    bar: $<HTMLElement>('.hud__bar span'),
    spark: $('.hud__spark polyline'),
    layer: $('.hud__layer-name'),
    status: $('.hud__status'),
    min: $<HTMLButtonElement>('.hud__min'),
  };
  let statusText = '';
  const setStatus = (text: string) => {
    if (text === statusText || !ui.status) return;
    statusText = text;
    ui.status.textContent = text;
  };
  let restoredUntil = restored ? performance.now() + 2600 : 0;

  try {
    const pref = sessionStorage.getItem(`${CKPT}:min`);
    if (pref === '1' || (pref === null && innerWidth < 700)) hud?.classList.add('is-min');
  } catch {
    /* ignore */
  }
  const syncMin = () => ui.min?.setAttribute('aria-expanded', String(!hud?.classList.contains('is-min')));
  // (is-peek is a visual-only collapse, the panel stays interactive via the toggle)
  syncMin();
  let userToggled = false;
  ui.min?.addEventListener('click', () => {
    userToggled = true;
    hud?.classList.remove('is-peek');
    hud?.classList.toggle('is-min');
    syncMin();
    try {
      sessionStorage.setItem(`${CKPT}:min`, hud?.classList.contains('is-min') ? '1' : '0');
    } catch {
      /* ignore */
    }
  });
  $('.hud__fit')?.addEventListener('click', () => {
    fitting = true;
  });
  $('.hud__retrain')?.addEventListener('click', () => {
    ids.forEach((id) => (progress[id] = 0));
    history = [];
    step = 0;
    fitting = false;
    wasConverged = false;
    field.reset();
    save(true);
    hud?.classList.remove('is-converged');
    scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });

  const renderHud = (k: number) => {
    if (!hud) return;
    if (ui.step) ui.step.textContent = String(step).padStart(4, '0');
    if (ui.loss) ui.loss.textContent = loss.toFixed(3);
    const pct = `${Math.round(k * 100)}%`;
    if (ui.pct) ui.pct.textContent = pct;
    if (ui.meter) ui.meter.style.transform = `scaleX(${k})`;
    if (ui.bar) ui.bar.style.transform = `scaleX(${k})`;
    if (ui.spark && history.length > 1) {
      const top = Math.max(...history, 0.5);
      ui.spark.setAttribute(
        'points',
        history.map((v, i) => `${((i / (history.length - 1)) * 120).toFixed(1)},${(26 - (v / top) * 24).toFixed(1)}`).join(' '),
      );
    }
    const current = document.querySelector('.block-kicker.is-current');
    const name = current?.lastChild?.textContent?.trim();
    if (ui.layer && name && ui.layer.textContent !== name) ui.layer.textContent = name;
  };

  // ---------------------------------------------------------------- reconstruction
  const recon = (() => {
    const canvas = $<HTMLCanvasElement>('.hud__recon canvas');
    const ctx = canvas?.getContext('2d');
    const img = new Image();
    let ready = false;
    img.onload = () => (ready = true);
    if (hud?.dataset.photo) img.src = hud.dataset.photo;
    const small = document.createElement('canvas');
    const sctx = small.getContext('2d');
    let lastBlock = -1;
    let lastNoise = 0;

    return (k: number, now: number) => {
      if (!ctx || !sctx || !canvas || !ready) return;
      const block = Math.max(1, Math.round(16 * Math.pow(1 - k, 1.25)));
      if (block === lastBlock && (k >= 1 || now - lastNoise < 140)) return;
      lastBlock = block;
      lastNoise = now;
      const S = canvas.width;
      const n = Math.max(1, Math.round(S / block));
      small.width = small.height = n;
      // centre-crop the portrait (face sits high in the frame)
      const side = Math.min(img.naturalWidth, img.naturalHeight);
      const sx = (img.naturalWidth - side) / 2;
      const sy = Math.max(0, (img.naturalHeight - side) * 0.18);
      sctx.drawImage(img, sx, sy, side, side, 0, 0, n, n);
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, S, S);
      ctx.drawImage(small, 0, 0, n, n, 0, 0, S, S);
      const noise = (1 - k) * 0.55;
      if (noise > 0.01) {
        const cell = S / n;
        for (let y = 0; y < n; y++)
          for (let x = 0; x < n; x++) {
            const v = Math.random();
            ctx.fillStyle = `rgba(${v > 0.5 ? '110,168,255' : '5,8,13'},${(noise * Math.random()).toFixed(3)})`;
            ctx.fillRect(x * cell, y * cell, cell, cell);
          }
      }
    };
  })();

  // ---------------------------------------------------------------- hero vectors
  const vecCells = [...document.querySelectorAll<HTMLElement>('.tokenizer__vec i')];
  const vecTargets = vecCells.map((c) => Number(c.dataset.v) || 0);
  let lastVec = 0;
  const renderVecs = (k: number, now: number) => {
    if (!vecCells.length || now - lastVec < 160) return;
    lastVec = now;
    const settle = Math.min(1, k * 1.4);
    vecCells.forEach((cell, i) => {
      const v = vecTargets[i] * settle + (Math.random() * 2 - 1) * (1 - settle);
      const a = Math.min(1, Math.abs(v) * 0.9 + 0.08).toFixed(2);
      cell.style.backgroundColor = v >= 0 ? `rgba(110,168,255,${a})` : `rgba(255,138,76,${a})`;
    });
  };

  // ---------------------------------------------------------------- latent field
  const field = makeField(concepts, clusters, clusterPos, learnedFlag);

  // ---------------------------------------------------------------- loop
  let prev = performance.now();
  let stepAcc = 0;
  const flags = concepts.map((_, i) => learnedFlag(i));
  field.sync(flags, true);

  const frame = (now: number) => {
    const dt = Math.min(100, now - prev);
    prev = now;

    const vh = innerHeight;
    const atEnd = scrollY + vh >= document.documentElement.scrollHeight - 8;
    let active = 0;
    sections.forEach((el) => {
      if (progress[el.id] >= 1) return;
      const r = el.getBoundingClientRect();
      const inBand = r.top < vh * 0.7 && r.bottom > vh * 0.3;
      const inView = r.top < vh && r.bottom > 0;
      const rate = fitting ? 1 / 2200 : inBand || (atEnd && inView) ? 1 / need(el) : 0;
      if (!rate) return;
      progress[el.id] = Math.min(1, progress[el.id] + dt * rate);
      active++;
    });
    if (fitting && converged()) fitting = false;

    const k = knowledge();
    if (active) {
      stepAcc += dt;
      while (stepAcc > (fitting ? 30 : 90)) {
        stepAcc -= fitting ? 30 : 90;
        step++;
        const base = 0.035 + 2.268 * Math.pow(1 - k, 1.7);
        loss = Math.max(0.02, base * (1 + (Math.random() - 0.5) * 0.18 * (1 - k * 0.8)));
        history.push(loss);
        if (history.length > 60) history.shift();
      }
      save();
    } else if (!history.length) {
      loss = 0.035 + 2.268 * Math.pow(1 - k, 1.7);
      history.push(loss);
    }

    for (let i = 0; i < concepts.length; i++) {
      const f = learnedFlag(i);
      if (f !== flags[i]) {
        flags[i] = f;
        field.learn(i);
      }
    }

    const done = converged();
    if (done && !wasConverged) {
      save(true);
      document.dispatchEvent(new CustomEvent('train:converged'));
    }
    wasConverged = done;
    hud?.classList.toggle('is-converged', done);
    hud?.classList.toggle('is-training', active > 0 && !done);

    if (done) setStatus(strings.converged);
    else if (now < restoredUntil) setStatus(strings.restored);
    else setStatus(active ? strings.learning : strings.idle);
    if (now >= restoredUntil) restoredUntil = 0;

    // Stay out of the way on the first screen and over the interactive demos.
    if (!userToggled) {
      const overSteer = demos.some((el) => {
        const r = el.getBoundingClientRect();
        return r.top < vh * 0.75 && r.bottom > vh * 0.25;
      });
      hud?.classList.toggle('is-peek', (scrollY < vh * 0.3 && !done) || overSteer);
    }
    renderHud(k);
    recon(k, now);
    renderVecs(k, now);
    field.draw(now, dt);
    raf = requestAnimationFrame(frame);
  };

  let raf = requestAnimationFrame(frame);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else {
      prev = performance.now();
      raf = requestAnimationFrame(frame);
    }
  });
  addEventListener('pagehide', () => save(true));

  denoise();
}

// ==================================================================== field
function makeField(
  concepts: Concept[],
  clusterNames: string[],
  clusterPos: ClusterPos[],
  learnedFlag: (i: number) => boolean,
) {
  const canvas = document.querySelector<HTMLCanvasElement>('canvas.field');
  const ctx = canvas?.getContext('2d') ?? null;

  // Cluster centroids live in the side gutters (left: 0, 2, 4 · right: 1, 3, 5)
  // and clusters are tall and narrow, so the reading column stays clean.
  const centroids: [number, number][] = [
    [-0.85, -0.5],
    [0.85, -0.5],
    [-0.85, 0.08],
    [0.85, 0.08],
    [-0.85, 0.64],
    [0.85, 0.64],
  ];

  let seed = 1337;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const pts = concepts.map((c) => {
    // fallback layout (only if the latent build is stale): scatter around a category centroid
    const [cx, cy] = centroids[c.cluster] ?? [0, 0];
    const a = rnd() * Math.PI * 2;
    const r = Math.sqrt(rnd()) * 0.16;
    const real = c.x !== undefined && c.y !== undefined;
    return {
      c: c.cluster,
      label: c.label,
      ax: rnd() * 2 - 1,
      ay: rnd() * 2 - 1,
      // trained position = UMAP of the real embedding, folded into the gutters
      tx: real ? c.x! : cx + Math.cos(a) * r * 0.55,
      ty: real ? c.y! : cy + Math.sin(a) * r * 1.5,
      ph: rnd() * Math.PI * 2,
      fq: 0.25 + rnd() * 0.5,
      w: 0,
      on: false,
      at: -1e9,
      x: 0,
      y: 0,
    };
  });
  // edges: each concept's 2 nearest neighbours by cosine similarity in embedding space
  // (fallback: nearest same-category points in the layout)
  const byLabel = new Map(concepts.map((c, i) => [c.label, i]));
  const nbrs = pts.map((p, i) =>
    concepts[i].n
      ? concepts[i].n!.map((l) => byLabel.get(l)).filter((j): j is number => j !== undefined)
      : pts
          .map((q, j) => ({ j, d: q.c === p.c && j !== i ? Math.hypot(q.tx - p.tx, q.ty - p.ty) : Infinity }))
          .sort((a, b) => a.d - b.d)
          .slice(0, 2)
          .filter((n) => Number.isFinite(n.d))
          .map((n) => n.j),
  );

  // category labels: where the embedding actually put each category (majority side),
  // nudged apart vertically so two labels never collide
  const labelAt: ({ left: boolean; y: number } | null)[] = clusterNames.map((_, c) => {
    const at = clusterPos[c];
    if (at) return { left: at.side < 0, y: at.y - 0.06 };
    const [cx, cy] = centroids[c] ?? [0, 0];
    return { left: cx < 0, y: cy - 0.24 };
  });
  for (const left of [true, false]) {
    const list = labelAt.filter((l): l is { left: boolean; y: number } => !!l && l.left === left).sort((a, b) => a.y - b.y);
    for (let k = 1; k < list.length; k++) list[k].y = Math.max(list[k].y, list[k - 1].y + 0.09);
  }

  let W = 0;
  let H = 0;
  let dpr = 1;
  // horizontal extent of the reading column; labels never draw over it
  let colL = 0;
  let colR = 0;
  const resize = () => {
    const col = document.querySelector('main .wrap')?.getBoundingClientRect();
    colL = col?.left ?? 0;
    colR = col?.right ?? 0;
    if (!canvas || !ctx) return;
    dpr = Math.min(2, devicePixelRatio || 1);
    W = innerWidth;
    H = innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  addEventListener('resize', resize);

  let mx = -1e4;
  let my = -1e4;
  addEventListener('pointermove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });
  document.addEventListener('pointerleave', () => (mx = my = -1e4));

  const ease = (t: number) => t * t * (3 - 2 * t);
  const toX = (v: number) => W / 2 + v * W * 0.5;
  const toY = (v: number) => H / 2 + v * H * 0.48;
  const font = getComputedStyle(document.documentElement).getPropertyValue('--font-mono').trim() || 'monospace';

  return {
    sync(flags: boolean[], instant: boolean) {
      flags.forEach((f, i) => {
        pts[i].on = f;
        if (instant) pts[i].w = f ? 1 : 0;
      });
    },
    learn(i: number) {
      pts[i].on = learnedFlag(i);
      if (pts[i].on) pts[i].at = performance.now();
    },
    reset() {
      pts.forEach((p) => {
        p.on = false;
      });
    },
    draw(now: number, dt: number) {
      if (!ctx) return;
      const t = now / 1000;
      ctx.clearRect(0, 0, W, H);
      const lerp = reduced ? 1 : Math.min(1, dt / 900);

      // positions
      const clusterW = new Array(clusterNames.length).fill(0);
      const clusterN = new Array(clusterNames.length).fill(0);
      for (const p of pts) {
        p.w += ((p.on ? 1 : 0) - p.w) * lerp;
        const e = ease(Math.min(1, Math.max(0, p.w)));
        const jitter = reduced ? 0 : (1 - e) * 0.05 + 0.004;
        const nx = p.ax + Math.sin(t * p.fq + p.ph) * jitter * 1.6;
        const ny = p.ay + Math.cos(t * p.fq * 1.3 + p.ph) * jitter * 1.6;
        const lx = p.tx + Math.sin(t * 0.6 + p.ph) * jitter;
        const ly = p.ty + Math.cos(t * 0.5 + p.ph) * jitter;
        p.x = toX(nx + (lx - nx) * e);
        p.y = toY(ny + (ly - ny) * e);
        clusterW[p.c] += p.w;
        clusterN[p.c] += 1;
      }

      // attention edges between learned neighbours. The map is folded into two gutters,
      // so neighbours that landed on opposite sides are not drawn (the edge would cross the text).
      ctx.lineWidth = 1;
      pts.forEach((p, i) => {
        for (const j of nbrs[i]) {
          const q = pts[j];
          if (Math.sign(p.tx) !== Math.sign(q.tx)) continue;
          const a = Math.min(p.w, q.w) * 0.16;
          if (a < 0.01) continue;
          ctx.strokeStyle = `rgba(110,168,255,${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      });

      // cursor attention: only out in the gutters (never while reading text),
      // and only to concepts the model has actually learned
      const focus: typeof pts = [];
      const inGutter = mx < colL - 8 || mx > colR + 8;
      for (const p of pts) {
        if (!inGutter || p.w < 0.5) continue;
        const d = Math.hypot(p.x - mx, p.y - my);
        if (d < 150) {
          focus.push(p);
          const a = (1 - d / 150) * 0.35;
          ctx.strokeStyle = `rgba(255,138,76,${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(mx, my);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      }

      // points + learn pulses
      for (const p of pts) {
        const e = p.w;
        const r = 1.1 + e * 1.4;
        ctx.fillStyle = e > 0.5 ? `rgba(159,208,255,${(0.35 + e * 0.5).toFixed(3)})` : `rgba(125,139,160,${(0.28 + e * 0.3).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        const age = now - p.at;
        if (age < 1100 && !reduced) {
          const k = age / 1100;
          ctx.strokeStyle = `rgba(255,138,76,${(0.6 * (1 - k)).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3 + k * 22, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // labels: the few most recently learned (gutters only) + whatever the cursor attends to
      ctx.font = `10px ${font}`;
      ctx.textBaseline = 'middle';
      const roomy = colL >= 110;
      const recent = new Set(
        roomy
          ? pts
              .filter((p) => now - p.at < 4200)
              .sort((a, b) => b.at - a.at)
              .slice(0, 8)
          : [],
      );
      for (const p of pts) {
        const attended = focus.includes(p);
        if (!attended && !recent.has(p)) continue;
        // place the label on whichever side of the point keeps it inside its gutter
        const tw = ctx.measureText(p.label).width;
        const fits = (x0: number) => x0 >= 4 && x0 + tw <= W - 4 && (x0 + tw <= colL - 4 || x0 >= colR + 4);
        const right = p.x + 6;
        const leftX = p.x - 6 - tw;
        const x0 = fits(right) ? right : fits(leftX) ? leftX : null;
        if (x0 === null) continue;
        const fresh = 1 - (now - p.at) / 4200;
        const a = attended ? 0.85 : fresh * 0.75 * p.w;
        if (a < 0.03) continue;
        ctx.fillStyle = `rgba(232,238,246,${a.toFixed(3)})`;
        ctx.textAlign = 'left';
        ctx.fillText(p.label, x0, p.y);
      }

      // cluster names emerge as the cluster organises
      ctx.font = `600 10px ${font}`;
      clusterNames.forEach((name, c) => {
        const frac = clusterN[c] ? clusterW[c] / clusterN[c] : 0;
        if (frac < 0.25 || !roomy) return;
        const at = labelAt[c];
        if (!at) return;
        const label = name.toUpperCase();
        if (ctx.measureText(label).width > colL - 20) return; // only if it fits the gutter
        ctx.fillStyle = `rgba(110,168,255,${((frac - 0.25) * 0.75).toFixed(3)})`;
        ctx.textAlign = at.left ? 'left' : 'right';
        ctx.fillText(label, at.left ? 12 : W - 12, toY(at.y));
      });
      ctx.textAlign = 'start';
    },
  };
}

// ==================================================================== denoise
/** Headings arrive as noise and resolve left-to-right, like a sample being denoised. */
function denoise() {
  if (reduced) return;
  const glyphs = '░▒▓∇∑∂αβγλσ01';
  const els = [...document.querySelectorAll<HTMLElement>('[data-denoise]')];
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        run(entry.target as HTMLElement);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );

  function run(el: HTMLElement) {
    if (el.children.length) return; // only plain-text headings
    const text = el.textContent ?? '';
    if (!text.trim()) return;
    el.setAttribute('aria-label', text);
    const chars = [...text];
    const dur = Math.min(900, 280 + chars.length * 18);
    const start = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / dur);
      const cut = Math.floor(k * chars.length);
      el.textContent = chars
        .map((ch, i) => (i < cut || ch === ' ' ? ch : glyphs[(Math.random() * glyphs.length) | 0]))
        .join('');
      if (k < 1) requestAnimationFrame(tick);
      else {
        el.textContent = text;
        el.removeAttribute('aria-label');
      }
    };
    requestAnimationFrame(tick);
  }

  els.forEach((el) => io.observe(el));
}
