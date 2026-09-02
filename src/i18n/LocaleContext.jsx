import { useMemo } from 'react'
import { LocaleContext, copyFor } from './locale-context'
import { DEFAULT_LOCALE } from './locale'

/**
 * The locale is decided once per document, from the URL, and never changes
 * within a session — switching language is a real navigation to the other
 * locale's prerendered page. That keeps the server and client trees identical.
 */
export function LocaleProvider({ locale = DEFAULT_LOCALE, children }) {
  const value = useMemo(() => ({ locale, copy: copyFor(locale) }), [locale])
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
