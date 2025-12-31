import { useEffect, useRef } from "react"

export function useInViewVideo() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const video = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return ref
}
