import { useMemo } from 'react'
import { projects } from '@/data/projects'

export function StatsSection({}) {
  const yearsExperience = useMemo(() => {
    const startYear = 2023
    const currentYear = new Date().getFullYear()
    return Math.max(1, currentYear - startYear)
  }, [])

  const stats = [
    { value: projects.length, label: 'Production Apps' },
    { value: '100', label: 'Lighthouse Score' },
    { value: `${yearsExperience}+`, label: 'Years Experience' },
    { value: '100%', label: 'End-to-End Ownership' },
  ]

  return (
    // Background sedikit berbeda dari neutral-950 utama agar section terlihat
    <section className="py-24 md:py-32 lg:py-40 bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <span className="block text-4xl md:text-6xl font-bold tracking-tight text-white">
                {stat.value}
              </span>
              <p className="mt-2 text-sm md:text-base text-neutral-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
