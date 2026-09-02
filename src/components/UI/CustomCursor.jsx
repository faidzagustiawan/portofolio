import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import CursorPortal from '@/components/CursorPortal'

const INTERACTIVE = 'a, button, input, textarea, select, summary, [role="button"], [role="link"], .cursor-pointer'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isHidden, setIsHidden] = useState(true)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 20, stiffness: 400, mass: 0.2 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Only take over the cursor for a real mouse. A touch or stylus device keeps
  // the platform behaviour, and so does anyone who plugs a mouse in later.
  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setEnabled(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  // The class is what actually hides the native cursor, so CSS never blanks the
  // pointer for a visitor this component decided not to serve.
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('has-custom-cursor', enabled)
    return () => root.classList.remove('has-custom-cursor')
  }, [enabled])

  useEffect(() => {
    if (!enabled) return

    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsHidden(false)
    }

    // Delegated: one listener pair on the document rather than a MutationObserver
    // rebinding every interactive node on each DOM change.
    const handleOver = (e) => setIsHovering(Boolean(e.target.closest?.(INTERACTIVE)))
    const handleOut = (e) => {
      if (!e.relatedTarget || !e.relatedTarget.closest?.(INTERACTIVE)) setIsHovering(false)
    }

    const handleLeave = () => setIsHidden(true)

    window.addEventListener('mousemove', moveCursor, { passive: true })
    document.addEventListener('mouseover', handleOver, { passive: true })
    document.addEventListener('mouseout', handleOut, { passive: true })
    document.addEventListener('mouseleave', handleLeave)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
      document.removeEventListener('mouseleave', handleLeave)
    }
  }, [enabled, cursorX, cursorY])

  if (!enabled) return null

  return (
    <CursorPortal>
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="bg-white rounded-full flex items-center justify-center overflow-hidden"
          animate={{
            width: isHovering ? 40 : 16,
            height: isHovering ? 40 : 16,
            opacity: isHidden ? 0 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <motion.div
            className="w-1 h-1 bg-black rounded-full"
            animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0 }}
          />
        </motion.div>
      </motion.div>
    </CursorPortal>
  )
}
