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

const cvByLocale: Record<Locale, string> = {
  en: 'cv-en.pdf',
  pt: 'cv-pt.pdf',
  zh: 'cv-zh.pdf',
};

export function getCopy(locale: Locale): LocaleCopy {
  return copyByLocale[locale] ?? en;
}

/** Locale-matched CV download. */
export function cvHref(locale: Locale, base: string): string {
  return `${base}${cvByLocale[locale] ?? cvByLocale.en}`;
}
