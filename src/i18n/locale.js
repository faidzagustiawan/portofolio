export const LOCALES = ['en', 'id']
export const DEFAULT_LOCALE = 'en'

/** Non-default locales live under a path prefix; the default sits at the root. */
export const PREFIX = { en: '', id: '/id' }

export const isLocale = (value) => LOCALES.includes(value)

/** Reads the locale out of a full pathname. The URL is the only source of
 *  truth here — anything stored client-side would differ from the prerendered
 *  markup and break hydration. */
export function localeFromPath(pathname = '/') {
  return pathname === '/id' || pathname.startsWith('/id/') ? 'id' : DEFAULT_LOCALE
}

/** Strips the locale prefix, leaving the route the app's Router sees. */
export function stripLocale(pathname = '/') {
  const locale = localeFromPath(pathname)
  if (locale === DEFAULT_LOCALE) return pathname || '/'
  const rest = pathname.slice(PREFIX[locale].length)
  return rest === '' ? '/' : rest
}

/** The same page in another locale, for the toggle and for hreflang. */
export function pathForLocale(pathname, locale) {
  const route = stripLocale(pathname)
  const prefix = PREFIX[locale] ?? ''
  if (route === '/') return prefix || '/'
  return `${prefix}${route}`
}

/** Which CMS field holds this locale's copy. English uses the base field. */
export const localeField = (field, locale) => (locale === DEFAULT_LOCALE ? field : `${field}_${locale}`)

export const HTML_LANG = { en: 'en', id: 'id' }
export const OG_LOCALE = { en: 'en_US', id: 'id_ID' }
