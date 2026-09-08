import { useEffect, useId, useRef } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, RotateCcw, X } from 'lucide-react'
import { useCopy } from '@/i18n/locale-context'

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/**
 * The frame a preview runs in: a dialog over the case study rather than a panel
 * inside it.
 *
 * An application inline in a 16:9 slot is a postcard of an application — too
 * small to click around in, and it drags the page's own layout around with it.
 * Given the whole viewport it is close enough to the real thing to judge, and
 * closing it puts the reader back exactly where they were.
 *
 * Mounted only while open, so nothing of the previewed site or demo exists
 * until it is asked for, and closing genuinely tears it down.
 *
 * There is no exit animation, and that is the point: an exit has to finish
 * before React removes the node, and a fade that never completes leaves a live
 * iframe covering the page. Opening animates; closing is immediate.
 */
export function PreviewModal({ isOpen, onClose, title, subtitle, externalUrl, onReset, children }) {
  const copy = useCopy().detail.preview
  const panelRef = useRef(null)
  const restoreFocusRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    if (!isOpen) return

    restoreFocusRef.current = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const panel = panelRef.current
    panel?.querySelector(FOCUSABLE)?.focus()

    // Keep Tab inside the dialog: a modal that leaks focus to the page behind
    // it is unusable with a keyboard or a screen reader.
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel) return

      const focusable = [...panel.querySelectorAll(FOCUSABLE)]
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      restoreFocusRef.current?.focus?.()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[10000]"
      />

      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 md:p-6 pointer-events-none">
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[1600px] h-full max-h-[92vh] flex flex-col bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl pointer-events-auto"
        >
          <div className="flex items-center gap-3 md:gap-4 px-4 py-3 border-b border-neutral-800 shrink-0">
            <span
              id={titleId}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-300 whitespace-nowrap"
            >
              {title}
            </span>

            {subtitle && (
              <span className="hidden md:block flex-1 truncate text-xs font-mono text-neutral-500">
                {subtitle}
              </span>
            )}

            <div className="ml-auto flex items-center gap-1">
              {onReset && (
                <button
                  type="button"
                  onClick={onReset}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  {copy.reset}
                </button>
              )}

              {externalUrl && (
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">{copy.newTab}</span>
                </a>
              )}

              <button
                type="button"
                onClick={onClose}
                aria-label={copy.close}
                className="inline-flex items-center justify-center w-8 h-8 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-auto bg-neutral-950">{children}</div>
        </motion.div>
      </div>
    </>
  )
}
