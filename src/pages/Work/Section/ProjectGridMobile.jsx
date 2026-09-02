import { ProjectGridItem } from './ProjectGridItem'
import { useCopy } from '@/i18n/locale-context'

export function ProjectGridMobile({ projects }) {
  const copy = useCopy().work

  return (
    <section
      aria-label={copy.projectsAria}
      className="lg:hidden max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-40"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {projects.map((project) => (
          <ProjectGridItem key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
