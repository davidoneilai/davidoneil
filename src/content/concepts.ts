import type { LocaleCopy } from './types';

/**
 * Concepts the visitor's "model" learns, keyed by the section that teaches them.
 * `cluster` is a human category (used only to name regions of the latent field):
 * 0 post-training · 1 interpretability · 2 retrieval/prod · 3 compute/infra · 4 papers/OSS · 5 trajectory
 * `context` is the résumé text the concept appears in; it is embedded alongside the label.
 * Positions and neighbours come from those real embeddings (see scripts/embed.mjs).
 */
export type Concept = { label: string; cluster: number; section: string; context: string };

const skillCluster = [3, 0, 1, 2, 3];
const caseCluster: Record<string, number> = { cemig: 0, 'digital-humans': 1, courts: 2 };
const short = (s: string) => s.split(' · ')[0].trim();

type Raw = [label: string, cluster: number, section: string, context: string];

export function buildConcepts(t: LocaleCopy): Concept[] {
  const raw: Raw[] = [
    ...t.experience.map((e): Raw => [short(e.org), 5, 'experience', `${e.org}. ${e.title}`]),
    ...t.cases.flatMap((c) => c.stack.map((x): Raw => [x, caseCluster[c.id] ?? 2, 'cases', `${c.title}. ${c.subtitle}`])),
    ...t.publicationsAccepted.map((p): Raw => [p.venue.split(' ')[0], 4, 'publications', `${p.venue}. ${p.title}`]),
    ...t.publicationsReview.map((p): Raw => [p.venue.split(' · ')[1] ?? 'ARR', 4, 'publications', `${p.venue}. ${p.title}`]),
    ...t.skills.flatMap((c, i) => c.items.map((x): Raw => [x, skillCluster[i] ?? 3, 'skills', c.cluster])),
    ...t.openSource.map((v): Raw => [v.name, 4, 'open-source', v.blurb]),
    ...t.ventures.map((v): Raw => [v.name, 5, 'ventures', v.blurb]),
    ...t.education.map((e): Raw => [short(e.org).replace(/\s*\(.*\)/, ''), 5, 'education', `${e.org}. ${e.title}`]),
  ];
  const seen = new Set<string>();
  return raw
    .filter(([label]) => {
      const key = label.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map(([label, cluster, section, context]) => ({ label, cluster, section, context }));
}
