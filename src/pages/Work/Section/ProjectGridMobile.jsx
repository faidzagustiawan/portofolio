import { ProjectGridItem } from './ProjectGridItem'
import { FolderOpen } from 'lucide-react'

export function ProjectGridMobile({ projects }) {
  // 1. Kondisi jika hasil pencarian kosong
  if (projects.length === 0) {
    return (
      <section className="lg:hidden flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mb-6 border border-neutral-800">
          <FolderOpen className="w-6 h-6 text-neutral-600" />
        </div>
        <h3 className="text-xl font-medium text-white mb-2">No projects found</h3>
        <p className="text-neutral-400 text-sm">
          Try adjusting your search or filters to see more results.
        </p>
      </section>
    )
  }

  // 2. Render normal jika ada data
  return (
    <section className="lg:hidden max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-40">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {projects.map((project) => (
          <ProjectGridItem key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
