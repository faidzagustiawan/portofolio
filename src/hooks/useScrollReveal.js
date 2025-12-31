import { useEffect, useRef, useState } from 'react'

export const useScrollReveal = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
  } = options

  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

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
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return {
    ref,
    isVisible: triggerOnce ? hasAnimated || isVisible : isVisible,
  }
}
