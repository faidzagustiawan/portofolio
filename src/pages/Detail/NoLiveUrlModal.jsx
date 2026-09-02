import { useEffect, useId, useRef } from 'react'
import { X, ArrowRight, Mail, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCopy } from '@/i18n/locale-context'

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export function NoLiveUrlModal({ isOpen, onClose, projectName }) {
  const copy = useCopy().detail.modal
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 md:p-12 max-w-lg w-full relative shadow-2xl pointer-events-auto"
            >
              <button
                type="button"
                onClick={onClose}
                className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors"
                aria-label={copy.close}
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>

              <div
                aria-hidden="true"
                className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mb-6"
              >
                <Lock className="w-7 h-7 text-neutral-300" />
              </div>

              <h2 id={titleId} className="text-2xl md:text-3xl font-bold mb-4 text-white">
                {copy.title}
              </h2>

              <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
                {copy.body(projectName)}
              </p>

              <div className="space-y-3">
                <Link
                  to="/contact"
                  onClick={onClose}
                  className="group w-full flex items-center justify-between px-6 py-4 bg-white text-neutral-950 rounded-xl hover:bg-neutral-200 transition-colors duration-300"
                >
                  <span className="flex items-center gap-3 font-medium">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                    {copy.cta}
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  />
                </Link>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full px-6 py-4 border border-neutral-700 text-white rounded-xl hover:bg-neutral-800 transition-colors duration-300 font-medium"
                >
                  {copy.dismiss}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
