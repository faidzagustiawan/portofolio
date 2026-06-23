import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import CursorPortal from '@/components/CursorPortal'

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isHidden, setIsHidden] = useState(true)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (isHidden) setIsHidden(false)
    }

    const handleMouseLeave = () => setIsHidden(true)
    const handleMouseEnter = () => setIsHidden(false)

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Setup hover states for interactables
    const handleElementsHover = () => setIsHovering(true)
    const handleElementsLeave = () => setIsHovering(false)

    const attachHoverListeners = () => {
      const interactables = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .cursor-pointer')
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementsHover)
        el.removeEventListener('mouseleave', handleElementsLeave)
        el.addEventListener('mouseenter', handleElementsHover)
        el.addEventListener('mouseleave', handleElementsLeave)
      })
    }

    attachHoverListeners()
    
    // Mutation observer to handle dynamically added elements
    const observer = new MutationObserver(() => {
      attachHoverListeners()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      observer.disconnect()
      const interactables = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .cursor-pointer')
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementsHover)
        el.removeEventListener('mouseleave', handleElementsLeave)
      })
    }
  }, [cursorX, cursorY, isHidden])

  return (
    <CursorPortal>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div
          className="bg-white rounded-full flex items-center justify-center overflow-hidden"
          animate={{
            width: isHovering ? 40 : 16,
            height: isHovering ? 40 : 16,
            opacity: isHidden ? 0 : 1
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* Inner dot that appears on hover */}
          <motion.div 
            className="w-1 h-1 bg-black rounded-full"
            animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0 }}
          />
        </motion.div>
      </motion.div>
    </CursorPortal>
  )
}
