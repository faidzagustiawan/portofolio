
import { X, ArrowRight, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

export function NoLiveUrlModal({ isOpen, onClose, projectName }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 md:p-12 max-w-lg w-full relative shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Icon */}
              <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🔒</span>
              </div>

              {/* Content */}
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Project Under NDA
              </h3>
              
              <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
                Unfortunately, <span className="text-white font-medium">{projectName}</span> is currently under a non-disclosure agreement 
                and the live version is not publicly accessible.
              </p>

              <div className="space-y-3">
                {/* Contact CTA */}
                <Link
                  to="/contact"
                  onClick={onClose}
                  className="group w-full flex items-center justify-between px-6 py-4 bg-white text-neutral-950 rounded-lg hover:bg-neutral-200 transition-all duration-300"
                >
                  <span className="flex items-center gap-3 font-medium">
                    <Mail className="w-5 h-5" />
                    Get in Touch for Details
                  </span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Continue Browsing */}
                <button
                  onClick={onClose}
                  className="w-full px-6 py-4 border border-neutral-700 text-white rounded-lg hover:bg-neutral-800 transition-all duration-300 font-medium"
                >
                  Continue Browsing Projects
                </button>
              </div>

              <p className="mt-6 text-sm text-neutral-400 text-center">
                I'd be happy to discuss this project in detail over a call or meeting.
              </p>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
