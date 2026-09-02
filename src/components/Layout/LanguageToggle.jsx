import { useLocation } from 'react-router-dom'
import { useLocale } from '@/i18n/locale-context'
import { DEFAULT_LOCALE, PREFIX, pathForLocale } from '@/i18n/locale'

/**
 * Switches locale by navigating to the other language's page.
 *
 * A real anchor, not a button: each locale is its own prerendered document, so
 * this has to be a full page load anyway — and as a link it works without
 * JavaScript, can be opened in a new tab, and gives crawlers the path between
 * the two versions.
 */
export default function LanguageToggle({ className = '' }) {
  const { locale, copy } = useLocale()
  const { pathname } = useLocation()

  const other = locale === DEFAULT_LOCALE ? 'id' : DEFAULT_LOCALE
  // useLocation gives the path with the basename already stripped, so the
  // prefix has to go back on before asking for the counterpart.
  const href = pathForLocale(`${PREFIX[locale]}${pathname}`, other)

  return (
    <a
      href={href}
      hreflang={other}
      title={copy.language.switchTo}
      aria-label={copy.language.switchTo}
      className={`group inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-2.5 py-1.5 font-mono text-xs tracking-widest text-white/60 transition-colors hover:border-white/40 hover:text-white ${className}`}
    >
      <span className="font-semibold text-white">{copy.language.short}</span>
      <span aria-hidden="true" className="text-white/30">/</span>
      <span>{copy.language.other}</span>
    </a>
  )
}
