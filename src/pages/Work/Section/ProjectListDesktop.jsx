import { ProjectListItem } from './ProjectListItem'
import { useCopy } from '@/i18n/locale-context'

export function ProjectListDesktop({ projects, activeIndex, setActiveIndex, mouseX, mouseY }) {
  const copy = useCopy().work

  return (
    <section
      aria-label={copy.projectsAria}
      className="hidden lg:block max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-24 md:pb-40"
    >
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
          onMouseLeave={() => setActiveIndex(null)}
        />
      ))}
      <div className="border-t border-neutral-800" />
    </section>
  )
}
