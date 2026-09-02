import { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePageTransition } from '@/context/page-transition-context'

// Slightly longer than the 0.8s cover animation in PageTransition.
const COVER_DURATION = 900

export function useTransitionNavigate() {
  const navigate = useNavigate()
  const { show } = usePageTransition()
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  return useCallback(
    (to, title) => {
      const skipAnimation = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (skipAnimation) {
        navigate(to)
        return
      }

      show([title])
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => navigate(to), COVER_DURATION)
    },
    [navigate, show]
  )
}
