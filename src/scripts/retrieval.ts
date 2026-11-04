/**
 * "Ask my résumé": hybrid retrieval in the browser.
 * - BM25 over the résumé passages (instant, no download).
 * - Optional dense retrieval: multilingual-e5-small (same model/dtype used at build
 *   time for the passage vectors) runs locally via transformers.js / WASM.
 * - Reciprocal Rank Fusion merges both rankings.
 * The map is the build-time UMAP of the passage embeddings.
 */

type Kind = 'profile' | 'experience' | 'case' | 'paper' | 'oss' | 'venture' | 'education' | 'skills';
type Passage = { id: string; kind: Kind; title: string; text: string; href: string; pos: { x: number; y: number } | null };
type Strings = {
  modeLexical: string;
  modeHybrid: string;
  loading: string;
  denseError: string;
  noResults: string;
  queryLabel: string;
};
type Data = { passages: Passage[]; kinds: Record<Kind, string>; vectorsHref: string; model: string; strings: Strings };
type Hit = { i: number; bm25?: number; cos?: number; rrf?: number };

const KIND_COLOR: Record<Kind, string> = {
  profile: '#e8eef6',
  experience: '#9fd0ff',
  case: '#6ea8ff',
  paper: '#ff8a4c',
  oss: '#5be3a7',
  venture: '#f2c14e',
  education: '#c49bff',
  skills: '#7d8ba0',
};
const DENSE_KEY = 'rag:dense';


// ==================================================================== BM25
// lowercase + strip diacritics; for NFC input this keeps string length, so offsets line up
const fold = (s: string) => s.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
function terms(s: string): string[] {
  const out: string[] = [];
  for (const w of fold(s).match(/\p{Script=Han}+|[\p{L}\p{N}]+/gu) ?? []) {
    if (/\p{Script=Han}/u.test(w)) {
      // Chinese: unigrams + bigrams
      const cs = [...w];
      cs.forEach((c, i) => {
        out.push(c);
        if (i + 1 < cs.length) out.push(c + cs[i + 1]);
      });
    } else if (w.length > 1) out.push(w.length > 4 ? w.replace(/(s|es)$/, '') : w); // tiny plural stemmer
  }
  return out;
}

function bm25Index(docs: string[]) {
  const toks = docs.map(terms);
  const avg = toks.reduce((a, t) => a + t.length, 0) / toks.length;
  const df = new Map<string, number>();
  for (const t of toks) for (const w of new Set(t)) df.set(w, (df.get(w) ?? 0) + 1);
  const tf = toks.map((t) => {
    const m = new Map<string, number>();
    t.forEach((w) => m.set(w, (m.get(w) ?? 0) + 1));
    return m;
  });
  const N = docs.length;
  const k1 = 1.2;
  const b = 0.75;
  return (query: string) => {
    const q = [...new Set(terms(query))];
    return toks
      .map((t, i) => {
        let s = 0;
        for (const w of q) {
          const f = tf[i].get(w);
          if (!f) continue;
          const n = df.get(w) ?? 0;
          const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
          s += (idf * f * (k1 + 1)) / (f + k1 * (1 - b + (b * t.length) / avg));
        }
        return { i, s };
      })
      .filter((h) => h.s > 0)
      .sort((a, b) => b.s - a.s);
  };
}

// ==================================================================== mount
function mount(root: HTMLElement, { passages, kinds, vectorsHref, model, strings }: Data) {
  const form = root.querySelector<HTMLFormElement>('.rag__form')!;
  const input = root.querySelector<HTMLInputElement>('.rag__input')!;
  const results = root.querySelector<HTMLOListElement>('.rag__results')!;
  const modeLabel = root.querySelector<HTMLElement>('.rag__mode-label')!;
  const denseBtn = root.querySelector<HTMLButtonElement>('.rag__dense')!;
  const progress = root.querySelector<HTMLElement>('.rag__progress')!;
  const progressBar = progress.querySelector<HTMLElement>('span')!;
  const legend = root.querySelector<HTMLElement>('.rag__legend')!;
  const canvas = root.querySelector<HTMLCanvasElement>('.rag__map canvas')!;
  const ctx = canvas.getContext('2d');

  const bm25 = bm25Index(passages.map((p) => `${p.title} ${p.title} ${p.text}`));
  let embedQuery: ((q: string) => Promise<Float32Array>) | null = null;
  let matrix: { dim: number; rows: Int8Array; scales: number[]; rowOf: Map<string, number> } | null = null;
  let hits: Hit[] = [];
  let lastQuery = '';

  // ---------------------------------------------------------------- dense (opt-in)
  async function enableDense() {
    if (embedQuery) return;
    denseBtn.disabled = true;
    progress.hidden = false;
    const setP = (p: number) => {
      progressBar.style.transform = `scaleX(${p / 100})`;
      denseBtn.textContent = strings.loading.replace('{p}', String(Math.round(p)));
    };
    setP(0);
    try {
      const [tf, vec] = await Promise.all([
        import('@huggingface/transformers'),
        fetch(vectorsHref).then((r) => {
          if (!r.ok) throw new Error(`vectors ${r.status}`);
          return r.json() as Promise<{ dim: number; ids: string[]; scales: number[]; vectors: string }>;
        }),
      ]);
      tf.env.allowLocalModels = false;
      const files = new Map<string, [number, number]>();
      const extractor = await tf.pipeline('feature-extraction', model, {
        dtype: 'q8',
        progress_callback: (e: { status: string; file?: string; loaded?: number; total?: number }) => {
          if (e.status !== 'progress' || !e.file || !e.total) return;
          files.set(e.file, [e.loaded ?? 0, e.total]);
          let l = 0;
          let t = 0;
          files.forEach(([a, b]) => ((l += a), (t += b)));
          setP((l / t) * 100);
        },
      });
      const bin = atob(vec.vectors);
      const rows = new Int8Array(bin.length);
      for (let i = 0; i < bin.length; i++) rows[i] = (bin.charCodeAt(i) << 24) >> 24;
      matrix = { dim: vec.dim, rows, scales: vec.scales, rowOf: new Map(vec.ids.map((id, i) => [id, i])) };
      embedQuery = async (q) => {
        const out = await extractor(`query: ${q}`, { pooling: 'mean', normalize: true });
        return out.data as Float32Array;
      };
      try {
        localStorage.setItem(DENSE_KEY, '1');
      } catch {
        /* ignore */
      }
      modeLabel.textContent = strings.modeHybrid;
      root.classList.add('is-dense');
      denseBtn.hidden = true;
      progress.hidden = true;
      if (lastQuery) search(lastQuery);
    } catch (err) {
      console.warn('[rag] dense search unavailable', err);
      denseBtn.textContent = strings.denseError;
      progress.hidden = true;
    }
  }

  const cosine = (q: Float32Array, id: string) => {
    if (!matrix) return 0;
    const r = matrix.rowOf.get(id);
    if (r === undefined) return 0;
    const off = r * matrix.dim;
    let s = 0;
    for (let j = 0; j < matrix.dim; j++) s += q[j] * matrix.rows[off + j];
    return s * matrix.scales[r];
  };

  // ---------------------------------------------------------------- search + RRF
  let seq = 0;
  async function search(query: string) {
    const q = query.trim();
    lastQuery = q;
    if (!q) {
      hits = [];
      renderResults();
      return;
    }
    const my = ++seq;
    const lex = bm25(q);
    let merged: Hit[];
    if (embedQuery) {
      const qv = await embedQuery(q);
      if (my !== seq) return;
      const dense = passages.map((p, i) => ({ i, s: cosine(qv, p.id) })).sort((a, b) => b.s - a.s);
      const K = 60;
      const acc = new Map<number, Hit>();
      const add = (list: { i: number; s: number }[], key: 'bm25' | 'cos') =>
        list.slice(0, 20).forEach((h, rank) => {
          const hit = acc.get(h.i) ?? { i: h.i, rrf: 0 };
          hit[key] = h.s;
          hit.rrf = (hit.rrf ?? 0) + 1 / (K + rank + 1);
          acc.set(h.i, hit);
        });
      add(lex, 'bm25');
      add(dense, 'cos');
      // show cosine for every fused hit, even if it only came from BM25
      merged = [...acc.values()]
        .map((h) => ({ ...h, cos: h.cos ?? dense.find((d) => d.i === h.i)?.s }))
        .sort((a, b) => (b.rrf ?? 0) - (a.rrf ?? 0));
    } else {
      merged = lex.map((h) => ({ i: h.i, bm25: h.s }));
    }
    hits = merged.slice(0, 5);
    renderResults(q);
  }

  // ---------------------------------------------------------------- results list
  function snippet(text: string, query: string) {
    const qs = terms(query).filter((t) => t.length > 1);
    const f = fold(text);
    let at = -1;
    for (const t of qs) {
      const k = f.indexOf(t);
      if (k >= 0 && (at < 0 || k < at)) at = k;
    }
    const start = Math.max(0, at < 0 ? 0 : at - 60);
    const end = Math.min(text.length, start + 220);
    const piece = (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
    // highlight matched terms (fold-insensitive; same-length folding keeps offsets aligned)
    const frag = document.createDocumentFragment();
    const fp = fold(piece);
    const marks: [number, number][] = [];
    for (const t of qs) {
      let k = fp.indexOf(t);
      while (k >= 0) {
        marks.push([k, k + t.length]);
        k = fp.indexOf(t, k + t.length);
      }
    }
    marks.sort((a, b) => a[0] - b[0]);
    let pos = 0;
    for (const [a, b] of marks) {
      if (a < pos) continue;
      frag.append(piece.slice(pos, a));
      const m = document.createElement('mark');
      m.textContent = piece.slice(a, b);
      frag.append(m);
      pos = b;
    }
    frag.append(piece.slice(pos));
    return frag;
  }

  function renderResults(query = '') {
    if (!query) {
      results.replaceChildren();
      return;
    }
    if (!hits.length) {
      const li = document.createElement('li');
      li.className = 'rag__empty';
      li.textContent = strings.noResults;
      results.replaceChildren(li);
      return;
    }
    results.replaceChildren(
      ...hits.map((h, rank) => {
        const p = passages[h.i];
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = p.href;
        if (/^https?:/.test(p.href)) {
          a.target = '_blank';
          a.rel = 'noreferrer';
        }
        a.addEventListener('mouseenter', () => (hover = h.i));
        a.addEventListener('mouseleave', () => (hover = -1));
        const head = document.createElement('span');
        head.className = 'rag__rhead';
        const rk = document.createElement('span');
        rk.className = 'rag__rank';
        rk.textContent = String(rank + 1);
        const kind = document.createElement('span');
        kind.className = 'rag__kind';
        kind.style.setProperty('--k', KIND_COLOR[p.kind]);
        kind.textContent = kinds[p.kind];
        const title = document.createElement('strong');
        title.textContent = p.title;
        head.append(rk, kind, title);
        const body = document.createElement('span');
        body.className = 'rag__snip';
        body.append(snippet(p.text, query));
        const scores = document.createElement('span');
        scores.className = 'rag__scores';
        scores.textContent = [
          h.bm25 !== undefined ? `bm25 ${h.bm25.toFixed(2)}` : 'bm25 —',
          h.cos !== undefined ? `cos ${h.cos.toFixed(3)}` : null,
          h.rrf !== undefined ? `rrf ${h.rrf.toFixed(4)}` : null,
        ]
          .filter(Boolean)
          .join(' · ');
        a.append(head, body, scores);
        li.append(a);
        return li;
      }),
    );
  }

  // ---------------------------------------------------------------- map
  legend.replaceChildren(
    ...(Object.keys(kinds) as Kind[])
      .filter((k) => passages.some((p) => p.kind === k))
      .map((k) => {
        const s = document.createElement('span');
        s.style.setProperty('--k', KIND_COLOR[k]);
        s.textContent = kinds[k];
        return s;
      }),
  );

  const placed = passages.map((p, i) => ({ i, p, x: 0, y: 0, ok: !!p.pos }));
  let W = 0;
  let H = 0;
  let hover = -1;
  let qx = 0;
  let qy = 0;
  let qa = 0; // query marker opacity
  const resize = () => {
    if (!ctx) return;
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(2, devicePixelRatio || 1);
    W = r.width;
    H = r.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const pad = 28;
    const s = Math.min(W, H) / 2 - pad;
    for (const d of placed) {
      if (!d.p.pos) continue;
      d.x = W / 2 + d.p.pos.x * s;
      d.y = H / 2 + d.p.pos.y * s;
    }
  };
  new ResizeObserver(resize).observe(canvas);

  canvas.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;
    let best = -1;
    let bd = 16;
    for (const d of placed) {
      if (!d.ok) continue;
      const dd = Math.hypot(d.x - mx, d.y - my);
      if (dd < bd) {
        bd = dd;
        best = d.i;
      }
    }
    hover = best;
    canvas.style.cursor = best >= 0 ? 'pointer' : 'default';
  });
  canvas.addEventListener('pointerleave', () => (hover = -1));
  canvas.addEventListener('click', () => {
    if (hover < 0) return;
    const href = passages[hover].href;
    if (/^https?:/.test(href)) window.open(href, '_blank', 'noreferrer');
    else location.hash = href.slice(1);
  });

  const font = getComputedStyle(document.documentElement).getPropertyValue('--font-mono').trim() || 'monospace';
  const draw = () => {
    if (!ctx || !W) return;
    ctx.clearRect(0, 0, W, H);
    const hitSet = new Map(hits.map((h, r) => [h.i, r]));

    // query marker eases toward the weighted mean of the top hits
    const top = hits.filter((h) => placed[h.i].ok).slice(0, 3);
    if (top.length) {
      const w = top.map((_, r) => 1 / (r + 1));
      const sw = w.reduce((a, b) => a + b, 0);
      const tx = top.reduce((a, h, r) => a + placed[h.i].x * w[r], 0) / sw;
      const ty = top.reduce((a, h, r) => a + placed[h.i].y * w[r], 0) / sw;
      if (qa < 0.02) {
        qx = tx;
        qy = ty;
      }
      qx += (tx - qx) * 0.12;
      qy += (ty - qy) * 0.12;
      qa += (1 - qa) * 0.12;
    } else qa += (0 - qa) * 0.12;

    // lines query → hits
    if (qa > 0.02) {
      hits.forEach((h, r) => {
        const d = placed[h.i];
        if (!d.ok) return;
        ctx.strokeStyle = `rgba(255,138,76,${(qa * (0.7 - r * 0.11)).toFixed(3)})`;
        ctx.lineWidth = r === 0 ? 1.6 : 1;
        ctx.beginPath();
        ctx.moveTo(qx, qy);
        ctx.lineTo(d.x, d.y);
        ctx.stroke();
      });
    }

    for (const d of placed) {
      if (!d.ok) continue;
      const r = hitSet.get(d.i);
      const on = r !== undefined || d.i === hover;
      ctx.globalAlpha = hits.length && !on ? 0.35 : 0.95;
      ctx.fillStyle = KIND_COLOR[d.p.kind];
      ctx.beginPath();
      ctx.arc(d.x, d.y, on ? 5 : 3.2, 0, Math.PI * 2);
      ctx.fill();
      if (r !== undefined) {
        ctx.globalAlpha = 1;
        ctx.strokeStyle = KIND_COLOR[d.p.kind];
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 9, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = '#05080d';
        ctx.font = `600 9px ${font}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(r + 1), d.x, d.y + 0.5);
      }
    }
    ctx.globalAlpha = 1;

    if (qa > 0.02) {
      ctx.fillStyle = `rgba(255,138,76,${qa.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(qx, qy, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = `10px ${font}`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(strings.queryLabel, qx + 10, qy);
    }

    if (hover >= 0 && placed[hover].ok) {
      const d = placed[hover];
      const label = d.p.title.length > 46 ? `${d.p.title.slice(0, 45)}…` : d.p.title;
      ctx.font = `11px ${font}`;
      const tw = ctx.measureText(label).width;
      const bx = Math.min(W - tw - 16, Math.max(4, d.x + 10));
      const by = Math.max(4, d.y - 26);
      ctx.fillStyle = 'rgba(8,13,21,0.92)';
      ctx.strokeStyle = 'rgba(140,170,210,0.3)';
      ctx.beginPath();
      ctx.roundRect(bx, by, tw + 12, 20, 4);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#e8eef6';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, bx + 6, by + 10.5);
    }
  };

  let raf = 0;
  let visible = false;
  const loop = () => {
    draw();
    raf = visible ? requestAnimationFrame(loop) : 0;
  };
  new IntersectionObserver(([e]) => {
    visible = !!e?.isIntersecting;
    if (visible && !raf) raf = requestAnimationFrame(loop);
    // returning visitors who enabled dense search get it back automatically (cached model)
    if (visible && !embedQuery) {
      try {
        if (localStorage.getItem(DENSE_KEY) === '1') enableDense();
      } catch {
        /* ignore */
      }
    }
  }).observe(canvas);

  // ---------------------------------------------------------------- wiring
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    search(input.value);
  });
  let debounce = 0;
  input.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = window.setTimeout(() => search(input.value), embedQuery ? 260 : 120);
  });
  root.querySelectorAll<HTMLButtonElement>('.rag__chip').forEach((chip) =>
    chip.addEventListener('click', () => {
      input.value = chip.textContent ?? '';
      search(input.value);
    }),
  );
  denseBtn.addEventListener('click', enableDense);
}

// Boot last: module-level helpers above must be initialised before mount() runs.
const root = document.querySelector<HTMLElement>('.rag');
const dataEl = document.getElementById('rag-data');
if (root && dataEl) mount(root, JSON.parse(dataEl.textContent ?? '{}') as Data);
