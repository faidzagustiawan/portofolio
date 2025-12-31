
import { useEffect, useRef, useState } from 'react'

export function useHoverIntent(activeIndex) {
  const [intent, setIntent] = useState(0)
  const lastIndex = useRef(null)
  const hoverTimer = useRef(null)

  useEffect(() => {
    if (activeIndex === null) {
      setIntent(0)
      return
    }

    const distance =
      lastIndex.current === null
        ? 0
        : Math.abs(activeIndex - lastIndex.current)

    const velocity = Math.min(1 + distance * 0.7, 3)
    const delay = distance === 0 ? 300 : 0

    clearTimeout(hoverTimer.current)

    hoverTimer.current = setTimeout(() => {
      setIntent(Math.min(velocity / 3, 1))
      lastIndex.current = activeIndex
    }, delay)

    return () => clearTimeout(hoverTimer.current)
  }, [activeIndex])

  return intent
}
