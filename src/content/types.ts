export type Locale = 'en' | 'pt' | 'zh';

export interface Profile {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github?: string;
  photo: string;
}

export interface LocaleCopy {
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
  }[];
  publicationsReview: {
    title: string;
    venue: string;
    note?: string;
  }[];
  ventures: {
    name: string;
    blurb: string;
  }[];
}
