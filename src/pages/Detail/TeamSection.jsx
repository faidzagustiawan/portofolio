import { motion } from 'framer-motion'
import { SmartImage } from '@/components/UI/SmartImage'
import { useCopy } from '@/i18n/locale-context'

const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-10%' }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
)

export function TeamSection({ team, step }) {
  const copy = useCopy().detail
  if (!team || team.length === 0) return null

  const [eyebrow, heading] = copy.sections.team

  return (
    <section className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-16 md:py-24 border-t border-neutral-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-4">
          <FadeUp>
            <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-400 mb-4">
              {String(step).padStart(2, '0')}. {eyebrow}
            </h2>
            <p className="text-3xl font-bold text-white">{heading}</p>
          </FadeUp>
        </div>

        <div className="lg:col-span-8">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 list-none p-0 m-0">
            {team.map((member, i) => (
              <li key={member.name || i}>
                <FadeUp delay={i * 0.1}>
                  <div className="group flex items-center gap-4 p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800/50 transition-colors duration-300">
                    <div className="w-16 h-16 shrink-0 rounded-full overflow-hidden bg-neutral-800 ring-2 ring-neutral-800 group-hover:ring-neutral-600 transition-all">
                      {member.avatar ? (
                        <SmartImage src={member.avatar} alt={member.name} className="w-full h-full" />
                      ) : (
                        <div
                          aria-hidden="true"
                          className="w-full h-full flex items-center justify-center text-2xl font-bold text-neutral-500"
                        >
                          {member.name?.charAt(0) || '?'}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white truncate">{member.name}</p>
                      <p className="text-sm text-neutral-400 truncate">{member.role}</p>
                    </div>
                  </div>
                </FadeUp>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
