import { useEffect, useRef, useState } from 'react'

/**
 * Returns 0..1 describing how deliberately the pointer moved to `activeIndex`.
 * A long jump down the list reads as intent; dwelling on one row does not.
 *
 * The idle value is derived rather than stored, so nothing has to reset state
 * synchronously inside an effect.
 */
export function useHoverIntent(activeIndex) {
  const [settledIntent, setSettledIntent] = useState(0)
  const lastIndex = useRef(null)
  const hoverTimer = useRef(null)

  useEffect(() => {
    if (activeIndex === null) {
      clearTimeout(hoverTimer.current)
      lastIndex.current = null
      return
    }

    const distance = lastIndex.current === null ? 0 : Math.abs(activeIndex - lastIndex.current)
    const velocity = Math.min(1 + distance * 0.7, 3)
    const delay = distance === 0 ? 300 : 0

    clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => {
      setSettledIntent(Math.min(velocity / 3, 1))
      lastIndex.current = activeIndex
    }, delay)

    return () => clearTimeout(hoverTimer.current)
  }, [activeIndex])

  return activeIndex === null ? 0 : settledIntent
}
