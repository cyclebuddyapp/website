import en from './en';
import es from './es';
import fr from './fr';

export const languages = {
  en: { label: 'English', short: 'EN', hreflang: 'en', ogLocale: 'en_CA' },
  es: { label: 'Español', short: 'ES', hreflang: 'es-419', ogLocale: 'es_LA' },
  fr: { label: 'Français', short: 'FR', hreflang: 'fr', ogLocale: 'fr_CA' },
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';
export const langs = Object.keys(languages) as Lang[];

const dicts = { en, es, fr };

/** All strings for one language. */
export function t(lang: Lang) {
  return dicts[lang];
}

/** Language from a URL: /es/... -> es, /fr/... -> fr, anything else -> en. */
export function getLang(url: URL): Lang {
  const first = url.pathname.split('/')[1];
  return (langs as string[]).includes(first) ? (first as Lang) : defaultLang;
}

/** The path with its language prefix removed, e.g. /es/blog/ -> /blog/ */
export function stripLang(pathname: string): string {
  const parts = pathname.split('/');
  if ((langs as string[]).includes(parts[1])) parts.splice(1, 1);
  const p = parts.join('/') || '/';
  return p.startsWith('/') ? p : '/' + p;
}

/** Build a link for a language: localize('es', '/blog/') -> /es/blog/ */
export function localize(lang: Lang, path = '/'): string {
  const clean = path.startsWith('/') ? path : '/' + path;
  return lang === defaultLang ? clean : `/${lang}${clean === '/' ? '/' : clean}`;
}
