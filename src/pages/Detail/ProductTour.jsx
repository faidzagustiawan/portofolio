import { useId, useState } from 'react'
import { motion } from 'framer-motion'
import { SmartImage } from '@/components/UI/SmartImage'
import { useCopy } from '@/i18n/locale-context'

/**
 * The product, walked through screen by screen.
 *
 * A carousel of unlabelled screenshots asks the reader to guess what they are
 * looking at. Here every step carries the sentence that says what the screen is
 * doing and why it was built that way, which is the part a visitor cannot get
 * from opening the site themselves.
 *
 * Built as a tablist rather than a scroll-linked animation: the reader chooses
 * the pace, it works from the keyboard, and it does not depend on motion being
 * allowed.
 */
export function ProductTour({ steps }) {
  const copy = useCopy().detail.tour
  const [active, setActive] = useState(0)
  const baseId = useId()

  if (steps.length === 0) return null

  const step = steps[active]

  const onKeyDown = (event) => {
    const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key]
    if (!delta) return
    event.preventDefault()
    const next = (active + delta + steps.length) % steps.length
    setActive(next)
    document.getElementById(`${baseId}-tab-${next}`)?.focus()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      <div className="lg:col-span-5 order-2 lg:order-1">
        <div
          role="tablist"
          aria-label={copy.listLabel}
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
          className="flex flex-col gap-2 lg:sticky lg:top-24"
        >
          {steps.map((item, index) => {
            const isActive = index === active
            return (
              <button
                key={item.id}
                id={`${baseId}-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`${baseId}-panel`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(index)}
                className={`text-left rounded-xl border p-4 md:p-5 transition-colors ${
                  isActive
                    ? 'border-neutral-700 bg-neutral-900'
                    : 'border-transparent hover:border-neutral-800 hover:bg-neutral-900/50'
                }`}
              >
                <span className="block text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className={`block font-medium mb-1 ${isActive ? 'text-white' : 'text-neutral-300'}`}
                >
                  {item.title}
                </span>
                {item.body && (
                  <span
                    className={`block text-sm leading-relaxed ${
                      isActive ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {item.body}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className="lg:col-span-7 order-1 lg:order-2">
        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${active}`}
          className="relative aspect-[16/10] rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden lg:sticky lg:top-24"
        >
          {/* Keyed, not wrapped in AnimatePresence: the outgoing step has
              nothing to say once another is chosen, and waiting for it to
              finish leaving is one failure mode between a click and the screen
              it asked for. */}
          <motion.div
            key={step.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            {step.image ? (
              <SmartImage
                src={step.image}
                alt={step.title || copy.stepAlt(active + 1)}
                className="w-full h-full"
                imgClassName="object-contain bg-neutral-950"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center p-8 text-center text-neutral-500">
                {step.title}
              </div>
            )}
          </motion.div>

          <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-neutral-950/80 text-xs font-mono text-neutral-400">
            {active + 1}/{steps.length}
          </span>
        </div>
      </div>
    </div>
  )
}
