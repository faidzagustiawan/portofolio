import { Link } from 'react-router-dom'
import { ProjectMedia } from '@/components/UI/ProjectMedia'
import { playHoverSound, playClickSound } from '@/utils/sound'

export function ProjectGridItem({ project }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      onMouseEnter={playHoverSound}
      onClick={playClickSound}
      className="group block"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900 rounded-lg mb-6 border border-neutral-800">
        <ProjectMedia
          project={project}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-0 transition-opacity duration-500 group-hover:opacity-20 pointer-events-none`}
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{project.name}</h3>

        <p className="text-neutral-400">{project.tagline}</p>

        <div className="flex items-center justify-between pt-2 border-t border-neutral-900">
          <span className="text-sm font-mono uppercase tracking-widest text-neutral-400">
            {project.category}
          </span>
          <span className="text-sm font-mono uppercase tracking-widest text-neutral-400">
            {project.year}
          </span>
        </div>
      </div>
    </Link>
  )
}
