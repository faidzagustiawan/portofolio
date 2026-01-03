import { useEffect, useRef, useState } from 'react'

export const useScrollReveal = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    root = null, // 👈 TAMBAHAN PENTING
  } = options

  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // ⛑️ Guard: browser lama / SSR
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)

          if (triggerOnce) {
            setHasAnimated(true)
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
        root, // 👈 ROOT EKSPLISIT
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce, root])

  return {
    ref,
    isVisible: triggerOnce ? hasAnimated || isVisible : isVisible,
  }
}
