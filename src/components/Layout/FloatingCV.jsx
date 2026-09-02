import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FileDown, X } from 'lucide-react'
import { useCopy } from '@/i18n/locale-context'

const CV_HREF = '/CV-Muhammad-Faidz-Agustiawan.pdf'
const NUDGE_DELAY = 7000
const NUDGE_DURATION = 3000

export default function FloatingCV() {
  const copy = useCopy().cv
  const [expanded, setExpanded] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const nudgeDone = useRef(false)
  const timers = useRef([])

  // One unprompted nudge, then it stays a quiet icon until hovered.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nudgeDone.current = true
      return
    }

    timers.current.push(
      setTimeout(() => {
        setExpanded(true)
        nudgeDone.current = true
        timers.current.push(setTimeout(() => setExpanded(false), NUDGE_DURATION))
      }, NUDGE_DELAY)
    )

    const pending = timers.current
    return () => pending.forEach(clearTimeout)
  }, [])

  if (dismissed) return null

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9998] flex items-center gap-2">
      <AnimatePresence>
        {expanded && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setDismissed(true)}
            aria-label={copy.hide}
            className="h-8 w-8 shrink-0 rounded-full border border-neutral-700 bg-neutral-900 text-neutral-400 flex items-center justify-center hover:text-white hover:border-neutral-500 transition-colors"
          >
            <X size={14} aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href={CV_HREF}
        download
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => nudgeDone.current && setExpanded(false)}
        onFocus={() => setExpanded(true)}
        onBlur={() => nudgeDone.current && setExpanded(false)}
        animate={{ width: expanded ? 212 : 56 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="h-14 flex items-center gap-3 overflow-hidden rounded-full border border-neutral-700 bg-neutral-900 px-4 text-white shadow-xl select-none hover:border-neutral-500 transition-colors"
      >
        <span className="shrink-0">
          <FileDown size={22} aria-hidden="true" />
        </span>

        <AnimatePresence>
          {expanded && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className="whitespace-nowrap text-sm font-medium"
            >
              {copy.download}
            </motion.span>
          )}
        </AnimatePresence>

        <span className="sr-only">{copy.downloadFull}</span>
      </motion.a>
    </div>
  )
}
