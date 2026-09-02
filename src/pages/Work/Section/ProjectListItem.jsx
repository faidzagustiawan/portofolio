import { ArrowDownRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { playHoverSound, playClickSound } from '@/utils/sound'
import { useCopy } from '@/i18n/locale-context'

export function ProjectListItem({ project, index, isActive, onMouseEnter, onMouseLeave }) {
  const categoryNames = useCopy().categories

  return (
    <div
      className="group relative border-t border-neutral-800"
      onMouseEnter={(e) => {
        playHoverSound()
        onMouseEnter(e)
      }}
      onMouseLeave={onMouseLeave}
    >
      <Link
        to={`/work/${project.slug}`}
        onClick={playClickSound}
        className="block overflow-hidden"
        aria-label={`${project.name} — ${project.tagline}`}
      >
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-linear-to-r ${project.color} opacity-0 transition-opacity duration-700 ${
            isActive ? 'opacity-10' : ''
          }`}
        />

        <div className="relative py-10 md:py-16">
          <div className="flex justify-between gap-8">
            <div className="flex w-1/2 items-center gap-6 lg:gap-12">
              <span
                aria-hidden="true"
                className="w-12 shrink-0 text-sm font-mono uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors duration-500"
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white transition-transform duration-700 group-hover:translate-x-4">
                {project.name}
              </h2>
            </div>

            <div className="flex w-1/2 items-center justify-between gap-8 lg:gap-16">
              <p className="w-1/2 text-neutral-400 transition-transform duration-500 group-hover:-translate-x-2 group-hover:text-neutral-300">
                {project.tagline}
              </p>

              <div className="flex w-1/2 items-center justify-end gap-6">
                <span className="text-sm font-mono uppercase tracking-widest text-neutral-400">
                  {categoryNames[project.category] || project.category}
                </span>
                <span className="text-sm font-mono uppercase tracking-widest text-neutral-400">
                  {project.year}
                </span>
                <div
                  aria-hidden="true"
                  className="w-10 h-10 shrink-0 border border-white/20 rounded-full flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:border-transparent"
                >
                  <ArrowDownRight className="w-5 h-5 transition-transform duration-500 group-hover:rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
