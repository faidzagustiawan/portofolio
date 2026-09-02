import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

const read = () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches

/**
 * Reads the OS motion preference directly rather than through framer-motion,
 * which memoises the answer process-wide. Components that must decide whether
 * to render at all — not merely how to animate — need a value that re-evaluates
 * on mount and follows the setting if it changes mid-session.
 */
export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(read)

  useEffect(() => {
    const query = window.matchMedia(QUERY)
    const sync = () => setPrefersReduced(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  return prefersReduced
}

export { read as prefersReducedMotionNow }
