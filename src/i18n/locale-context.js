import { createContext, useContext } from 'react'
import { DEFAULT_LOCALE } from './locale'
import { dictionary } from './dictionary'

/**
 * Kept apart from the provider component so this module exports no components,
 * which is what lets Fast Refresh keep working for the provider file.
 */
export const LocaleContext = createContext(null)

export function useLocale() {
  const value = useContext(LocaleContext)
  if (!value) throw new Error('useLocale must be used inside <LocaleProvider>')
  return value
}

/** Shorthand for the common case: just the strings. */
export function useCopy() {
  return useLocale().copy
}

export function copyFor(locale) {
  return dictionary[locale] || dictionary[DEFAULT_LOCALE]
}
