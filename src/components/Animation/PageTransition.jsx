import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useProjects } from '@/context/projects-context'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const COVER_CLASS =
  'fixed top-0 left-[-20vw] w-[140vw] h-[110vh] bg-neutral-900 flex items-center justify-center z-[9999] pointer-events-none shadow-2xl'

// Module scope, so it survives the remount that every route change causes.
let hasMountedOnce = false

const PageTransition = ({ children }) => {
  const shouldReduceMotion = usePrefersReducedMotion()
  const location = useLocation()
  const { projects } = useProjects()

  // The prerendered HTML already shows the page, so the reveal cover would only
  // flash over content the visitor can see. It is skipped on the first mount
  // and used for every navigation after it. Read during render and identical on
  // the server, which keeps hydration in step.
  const [isFirstMount] = useState(() => !hasMountedOnce)

  useEffect(() => {
    hasMountedOnce = true
    // Runs while the cover is over the screen, so the jump is not visible.
    window.scrollTo(0, 0)
  }, [])

  const getTransitionText = () => {
    const path = location.pathname
    if (path === '/') return 'Home'

    const segments = path.split('/').filter(Boolean)
    const lastSegment = segments.pop() || ''

    if (path.startsWith('/work/') && lastSegment) {
      const project = projects.find((p) => p.slug === lastSegment)
      if (project) return project.name
    }

    return lastSegment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
  }

  // MotionConfig suppresses the transform that would slide these covers away,
  // so with reduced motion they must not be rendered at all — otherwise the
  // page stays behind a panel that never leaves.
  if (shouldReduceMotion) return children

  const text = getTransitionText()

  return (
    <>
      {children}

      {/* EXIT: slides up from the bottom to cover the outgoing page. */}
      <motion.div
        aria-hidden="true"
        className={COVER_CLASS}
        initial={{ y: '100%', borderTopLeftRadius: '200%', borderTopRightRadius: '200%' }}
        animate={{ y: '100%', transition: { duration: 0 } }}
        exit={{
          y: '0%',
          borderTopLeftRadius: '0%',
          borderTopRightRadius: '0%',
          transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
        }}
      >
        <motion.span
          className="text-4xl md:text-6xl font-bold text-white opacity-0"
          exit={{ opacity: 1, transition: { duration: 0.4, delay: 0.3 } }}
        >
          {text}
        </motion.span>
      </motion.div>

      {/* ENTER: slides off the top to reveal the incoming page. */}
      {!isFirstMount && (
        <motion.div
          aria-hidden="true"
          className={COVER_CLASS}
          initial={{ y: '0%', borderBottomLeftRadius: '0%', borderBottomRightRadius: '0%' }}
          animate={{
            y: '-110%',
            borderBottomLeftRadius: '200%',
            borderBottomRightRadius: '200%',
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
          }}
          exit={{ y: '-110%', transition: { duration: 0 } }}
        >
          <motion.span
            className="text-4xl md:text-6xl font-bold text-white"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            {text}
          </motion.span>
        </motion.div>
      )}
    </>
  )
}

export default PageTransition
