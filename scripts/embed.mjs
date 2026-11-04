/**
 * Offline latent-space build: `npm run embed`
 *
 * 1. Embeds every concept (field) and passage (retrieval corpus) with
 *    multilingual-e5-small — the same model the browser loads for queries.
 * 2. Projects both sets to 2D with UMAP (seeded, deterministic).
 * 3. Writes:
 *    - src/data/latent.json        positions + neighbours (inlined in the page, small)
 *    - public/latent/<locale>.json int8-quantised passage vectors (fetched only for dense search)
 *
 * Re-run whenever the résumé content changes. The site falls back gracefully if it's stale.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from '@huggingface/transformers';
import { UMAP } from 'umap-js';
import { pt } from '../src/content/pt.ts';
import { en } from '../src/content/en.ts';
import { zh } from '../src/content/zh.ts';
import { buildConcepts } from '../src/content/concepts.ts';
import { buildPassages } from '../src/content/passages.ts';

export const MODEL = 'Xenova/multilingual-e5-small';
export const DTYPE = 'q8';

const copies = { pt, en, zh };
const root = path.resolve(import.meta.dirname, '..');

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};
const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
const range = (xs) => [Math.min(...xs), Math.max(...xs)];
const lerp = (v, [a, b], [c, d]) => (b === a ? (c + d) / 2 : c + ((v - a) / (b - a)) * (d - c));

function project(vectors, nNeighbors, minDist) {
  const umap = new UMAP({ nComponents: 2, nNeighbors, minDist, random: seeded(42) });
  return umap.fit(vectors);
}

function quantise(vectors) {
  const dim = vectors[0].length;
  const bytes = new Int8Array(vectors.length * dim);
  const scales = vectors.map((v, i) => {
    const s = Math.max(...v.map(Math.abs)) / 127 || 1;
    v.forEach((x, j) => (bytes[i * dim + j] = Math.round(x / s)));
    return Number(s.toPrecision(6));
  });
  return { dim, scales, vectors: Buffer.from(bytes.buffer).toString('base64') };
}

console.log(`loading ${MODEL} (${DTYPE})…`);
const extractor = await pipeline('feature-extraction', MODEL, { dtype: DTYPE });
const embed = async (texts) => (await extractor(texts, { pooling: 'mean', normalize: true })).tolist();

const latent = { model: MODEL, dtype: DTYPE, locales: {} };
fs.mkdirSync(path.join(root, 'public/latent'), { recursive: true });
fs.mkdirSync(path.join(root, 'src/data'), { recursive: true });

for (const [loc, copy] of Object.entries(copies)) {
  // ---------------------------------------------------------------- concepts → side gutters
  const concepts = buildConcepts(copy);
  // label + the résumé text it appears in: a contextual embedding, not a bare token
  const cv = await embed(concepts.map((c) => `query: ${c.label} — ${c.context}`));
  const c2 = project(cv, 10, 0.35);

  // Fold the 2D map into the two page gutters: split at the median x and map each
  // half into its own vertical band, so neighbourhoods survive and text stays clear.
  const order = c2.map((p, i) => [p[0], i]).sort((a, b) => a[0] - b[0]);
  const side = new Array(concepts.length);
  order.forEach(([, i], k) => (side[i] = k < concepts.length / 2 ? -1 : 1));
  const bands = { '-1': [-0.98, -0.8], 1: [0.8, 0.98] };
  const pos = new Array(concepts.length);
  for (const s of [-1, 1]) {
    const idx = concepts.map((_, i) => i).filter((i) => side[i] === s);
    const rx = range(idx.map((i) => c2[i][0]));
    const ry = range(idx.map((i) => c2[i][1]));
    for (const i of idx) pos[i] = [lerp(c2[i][0], rx, bands[s]), lerp(c2[i][1], ry, [-0.86, 0.86])];
  }

  const conceptOut = {};
  concepts.forEach((c, i) => {
    const nbrs = cv
      .map((v, j) => [j === i ? -Infinity : dot(cv[i], v), j])
      .sort((a, b) => b[0] - a[0])
      .slice(0, 2)
      .map(([, j]) => concepts[j].label);
    conceptOut[c.label] = { x: +pos[i][0].toFixed(4), y: +pos[i][1].toFixed(4), n: nbrs };
  });

  // Where each human category landed: majority side, mean of members there.
  const clusterPos = copy.train.clusters.map((_, k) => {
    const members = concepts.map((c, i) => [c, i]).filter(([c]) => c.cluster === k).map(([, i]) => i);
    if (!members.length) return null;
    const s = members.filter((i) => side[i] < 0).length >= members.length / 2 ? -1 : 1;
    const here = members.filter((i) => side[i] === s);
    const y = here.reduce((a, i) => a + pos[i][1], 0) / here.length;
    return { side: s, y: +y.toFixed(4) };
  });

  // ---------------------------------------------------------------- passages → retrieval map
  const passages = buildPassages(copy);
  const pv = await embed(passages.map((p) => `passage: ${p.title}. ${p.text}`));
  const p2 = project(pv, 8, 0.25);
  const [x0, x1] = range(p2.map((p) => p[0]));
  const [y0, y1] = range(p2.map((p) => p[1]));
  const span = Math.max(x1 - x0, y1 - y0) / 2;
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const passageOut = {};
  passages.forEach((p, i) => {
    passageOut[p.id] = { x: +((p2[i][0] - cx) / span).toFixed(4), y: +((p2[i][1] - cy) / span).toFixed(4) };
  });

  latent.locales[loc] = { concepts: conceptOut, clusterPos, passages: passageOut };
  fs.writeFileSync(
    path.join(root, `public/latent/${loc}.json`),
    JSON.stringify({ model: MODEL, dtype: DTYPE, ids: passages.map((p) => p.id), ...quantise(pv) }),
  );
  console.log(`${loc}: ${concepts.length} concepts · ${passages.length} passages`);
}

fs.writeFileSync(path.join(root, 'src/data/latent.json'), JSON.stringify(latent, null, 1) + '\n');
console.log('wrote src/data/latent.json and public/latent/*.json');
