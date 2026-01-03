import { ProjectListItem } from './ProjectListItem'
import { FolderOpen } from 'lucide-react'

export function ProjectListDesktop({ projects, activeIndex, setActiveIndex, mouseX, mouseY }) {
  // 1. Kondisi jika hasil pencarian kosong
  if (projects.length === 0) {
    return (
      <section className="hidden lg:flex flex-col items-center justify-center min-h-[400px] border-t border-neutral-800 text-center">
        <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center mb-6 border border-neutral-800">
          <FolderOpen className="w-8 h-8 text-neutral-600" />
        </div>
        <h3 className="text-2xl font-medium text-white mb-2">No projects found</h3>
        <p className="text-neutral-500 max-w-sm">
          We couldn't find any projects matching your current filters. Try adjusting your search criteria.
        </p>
      </section>
    )
  }

  // 2. Render normal jika ada data
  return (
    <section className="hidden lg:block  max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-24 md:pb-40">
      {projects.map((project, i) => (
        <ProjectListItem
          key={project.id}
          project={project}
          index={i}
          isActive={activeIndex === i}
          onMouseEnter={(e) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
            setActiveIndex(i)
          }}
          onMouseLeave={() => {
            setActiveIndex(null)
          }}
        />
      ))}
      <div className="border-t border-neutral-800" />
    </section>
  )
}