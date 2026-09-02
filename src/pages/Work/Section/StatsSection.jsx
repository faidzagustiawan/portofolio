import { useMemo } from 'react'
import { useProjects } from '@/context/projects-context'

const CAREER_START = 2024

export function StatsSection() {
  const { projects } = useProjects()

  const stats = useMemo(() => {
    const technologies = new Set(projects.flatMap((p) => p.technologies))
    const years = Math.max(1, new Date().getFullYear() - CAREER_START)

    return [
      { value: projects.length, label: projects.length === 1 ? 'Project' : 'Projects' },
      { value: technologies.size, label: 'Technologies' },
      { value: `${years}+`, label: 'Years building' },
    ]
  }, [projects])

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dd className="block text-4xl md:text-6xl font-bold tracking-tight text-white">
                {stat.value}
              </dd>
              <dt className="mt-2 text-sm md:text-base text-neutral-400">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
