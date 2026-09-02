import { useCallback, useSyncExternalStore } from 'react'

const ATTRIBUTE = 'preloader'
const listeners = new Set()

const subscribe = (onChange) => {
  listeners.add(onChange)
  return () => listeners.delete(onChange)
}

const getSnapshot = () => document.documentElement.dataset[ATTRIBUTE] === 'on'

// The prerendered markup never shows the intro, so the server snapshot is
// always false and hydration starts from a matching tree.
const getServerSnapshot = () => false

/**
 * Whether the intro should play, as decided by the inline script in
 * index.html before first paint.
 *
 * It lives on the document rather than in React state because only a
 * synchronous script can read localStorage early enough to cover the
 * prerendered page without a flash. useSyncExternalStore is how React reads
 * that kind of outside-the-tree value without a hydration mismatch.
 */
export function useIntroGate() {
  const isOpen = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const close = useCallback(() => {
    delete document.documentElement.dataset[ATTRIBUTE]
    listeners.forEach((onChange) => onChange())
  }, [])

  return [isOpen, close]
}
