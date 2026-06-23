
import { motion } from 'framer-motion'
import { SmartImage } from '@/components/UI/SmartImage'

const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
)

export function TeamSection({ team }) {
  if (!team || team.length === 0) return null

  return (
    <section className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-24 border-t border-neutral-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Title */}
        <div className="lg:col-span-4">
          <FadeUp>
            <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-4">
              05 — Team
            </h2>
            <h3 className="text-3xl font-bold text-white">
              The People Behind
            </h3>
            <p className="text-neutral-500 mt-4 leading-relaxed">
              Great projects are built by great teams.
            </p>
          </FadeUp>
        </div>

        {/* Team Members Grid */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {team.map((member, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="group flex items-center gap-4 p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800/50 transition-all duration-300">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-neutral-800 flex-shrink-0 ring-2 ring-neutral-800 group-hover:ring-neutral-600 transition-all">
                      {member.avatar ? (
                        <SmartImage 
                          src={member.avatar} 
                          alt={member.name}
                          className="w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-neutral-600">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white group-hover:text-neutral-200 transition-colors truncate">
                      {member.name}
                    </h4>
                    <p className="text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors truncate">
                      {member.role}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
