import { ArrowDownRight } from 'lucide-react'
import { Link } from 'react-router-dom' // Import Link

export function ProjectListItem({ project, index, isActive, onMouseEnter, onMouseLeave }) {
  return (
    <div
      className="group relative border-t border-neutral-800"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Bungkus konten dengan Link */}
      <Link 
        to={`/work/${project.slug}`} // Ganti sesuai struktur route kamu (misal: project.slug)
        className="block overflow-hidden cursor-pointer"
      >
        {/* Hover background */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 transition-opacity duration-700 ${
            isActive ? 'opacity-10' : ''
          }`}
        />

        <div className="relative py-10 md:py-16">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            {/* Left */}
            <div className="flex items-start lg:items-center gap-6 lg:gap-12">
              <span className="w-12 pt-2 text-sm font-mono uppercase tracking-widest text-neutral-600 group-hover:text-white transition-colors duration-500">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white transition-transform duration-700 group-hover:translate-x-4">
                  {project.name}
                </h2>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-8 lg:gap-16">
              <p className="max-w-xs text-neutral-500 transition-transform duration-500 group-hover:-translate-x-2 group-hover:text-neutral-300">
                {project.tagline}
              </p>

              <div className="flex items-center gap-6">
                <span className="text-sm font-mono uppercase tracking-widest text-neutral-500">
                  {project.category}
                </span>
                <span className="text-sm font-mono uppercase tracking-widest text-neutral-500">
                  {project.year}
                </span>

                <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:border-transparent">
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