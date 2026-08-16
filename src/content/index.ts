import type { Locale, LocaleCopy } from './types';
import { en } from './en';
import { pt } from './pt';
import { zh } from './zh';

export const locales: Locale[] = ['en', 'pt', 'zh'];

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  pt: 'PT',
  zh: '中文',
};

const copyByLocale: Record<Locale, LocaleCopy> = { en, pt, zh };

export function getCopy(locale: Locale): LocaleCopy {
  return copyByLocale[locale] ?? en;
}

/** Prefer a locale-matched CV when available; fall back to PT. */
export function cvHref(locale: Locale, base: string): string {
  const preferred =
    locale === 'pt' ? 'cv-pt.pdf' : locale === 'zh' ? 'cv-zh.pdf' : 'cv-en.pdf';
  const available = new Set(['cv-pt.pdf']);
  const file = available.has(preferred) ? preferred : 'cv-pt.pdf';
  return `${base}${file}`;
}
