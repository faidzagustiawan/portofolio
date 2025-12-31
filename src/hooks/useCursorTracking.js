import { useEffect } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

export function useCursorTracking() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const cursorX = useSpring(mouseX, {
    stiffness: 300,
    damping: 35,
    mass: 0.9,
  })

  const cursorY = useSpring(mouseY, {
    stiffness: 300,
    damping: 35,
    mass: 0.9,
  })

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mouseX, mouseY])

  return { mouseX, mouseY, cursorX, cursorY }
}