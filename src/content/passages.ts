import type { LocaleCopy } from './types';

/**
 * Retrieval corpus: the résumé chunked the way I'd chunk a legal corpus —
 * one passage per semantically complete unit (a case block, a paper, a job).
 */
export type PassageKind = 'profile' | 'experience' | 'case' | 'paper' | 'oss' | 'venture' | 'education' | 'skills';
export type Passage = { id: string; kind: PassageKind; title: string; text: string; href: string };

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export function buildPassages(t: LocaleCopy): Passage[] {
  const out: Passage[] = [{ id: 'profile', kind: 'profile', title: t.role, text: `${t.headline} ${t.summary}`, href: '#top' }];

  t.experience.forEach((e, i) =>
    out.push({ id: `exp-${i}`, kind: 'experience', title: `${e.title} · ${e.org}`, text: e.summary, href: e.href ?? '#experience' }),
  );

  for (const c of t.cases) {
    const blocks: [string, string, string][] = [
      ['context', t.caseContextLabel, c.context],
      ['decision', t.caseDecisionLabel, c.decision],
      ['leadership', t.caseLeadershipLabel, c.leadership],
      ['outcome', t.caseOutcomeLabel, c.outcome],
    ];
    for (const [key, label, text] of blocks)
      out.push({ id: `case-${c.id}-${key}`, kind: 'case', title: `${c.title} · ${label}`, text, href: `#case-${c.id}` });
  }

  [...t.publicationsAccepted, ...t.publicationsReview].forEach((p, i) =>
    out.push({
      id: `pub-${i}`,
      kind: 'paper',
      title: p.title,
      text: `${p.venue}. ${p.note ?? ''}`.trim(),
      href: p.url ?? '#publications',
    }),
  );

  for (const v of t.openSource)
    out.push({ id: `oss-${slug(v.name)}`, kind: 'oss', title: v.name, text: v.blurb, href: v.href ?? '#open-source' });
  for (const v of t.ventures)
    out.push({ id: `venture-${slug(v.name)}`, kind: 'venture', title: v.name, text: v.blurb, href: v.href ?? '#ventures' });
  t.education.forEach((e, i) =>
    out.push({ id: `edu-${i}`, kind: 'education', title: e.title, text: `${e.org} · ${e.period}. ${e.note ?? ''}`.trim(), href: '#education' }),
  );
  t.skills.forEach((s, i) =>
    out.push({ id: `skills-${i}`, kind: 'skills', title: s.cluster, text: s.items.join(', '), href: '#skills' }),
  );
  return out;
}
