export type Locale = 'en' | 'pt' | 'zh';

export interface Profile {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github?: string;
  huggingface?: string;
  photo: string;
  /** Illustrative subword split of the name, shown in the hero tokenizer. */
  nameTokens: string[];
}

export interface TrainCopy {
  intro: string;
  title: string;
  knowledge: string;
  layer: string;
  reconstruction: string;
  idle: string;
  learning: string;
  restored: string;
  converged: string;
  fit: string;
  weights: string;
  retrain: string;
  minimize: string;
  infer: string;
  clusters: [string, string, string, string, string, string];
}

export interface TrainCopy {
  intro: string;
  title: string;
  knowledge: string;
  layer: string;
  reconstruction: string;
  idle: string;
  learning: string;
  restored: string;
  converged: string;
  fit: string;
  weights: string;
  retrain: string;
  minimize: string;
  clusters: [string, string, string, string, string, string];
}

type Latent = [label: string, activation: number];

/** ECHO-style demo: a register axis (3 anchors) composed with a choice of prompt. */
export interface SteerCopy {
  label: string;
  title: string;
  lede: string;
  promptLabel: string;
  axisLabel: string;
  axis: [string, string, string];
  featuresLabel: string;
  generating: string;
  tokensLabel: string;
  note: string;
  /** Top SAE latents at each axis anchor. */
  features: [Latent[], Latent[], Latent[]];
  prompts: { q: string; out: [string, string, string] }[];
}

export interface LocaleCopy {
  train: TrainCopy;
  train: TrainCopy;
  role: string;
  headline: string;
  summary: string;
  ctaCv: string;
  ctaWork: string;
  ctaContact: string;
  navExperience: string;
  navCases: string;
  navPapers: string;
  navSkills: string;
  navContact: string;
  casesLabel: string;
  caseContextLabel: string;
  caseDecisionLabel: string;
  caseLeadershipLabel: string;
  caseOutcomeLabel: string;
  caseStackLabel: string;
  skillsLabel: string;
  pubsAcceptedLabel: string;
  pubsReviewLabel: string;
  builderLabel: string;
  experienceLabel: string;
  educationLabel: string;
  contactLabel: string;
  langLabel: string;
  nextTokenLabel: string;
  replayLabel: string;
  tokens: { t: string; p: number; alt: [string, number][] }[];
  stats: { value: string; label: string }[];
  skills: { cluster: string; items: string[] }[];
  cases: {
    id: string;
    index: string;
    org: string;
    title: string;
    role: string;
    subtitle: string;
    context: string;
    decision: string;
    leadership: string;
    outcome: string;
    stack: string[];
    metrics?: { value: string; label: string }[];
  }[];
  experience: {
    title: string;
    org: string;
    period?: string;
    summary: string;
    href?: string;
  }[];
  education: {
    title: string;
    org: string;
    period: string;
    note?: string;
  }[];
  publicationsAccepted: {
    title: string;
    venue: string;
    note?: string;
    url?: string;
  }[];
  publicationsReview: {
    title: string;
    venue: string;
    note?: string;
    url?: string;
  }[];
  ventures: {
    name: string;
    blurb: string;
    href?: string;
  }[];
  openSourceLabel: string;
  openSource: LocaleCopy['ventures'];
}
