import { useCopy } from '@/i18n/locale-context'

export function WorkHero() {
  const copy = useCopy().work

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-32 md:pt-40 mb-16 md:mb-24">
      <div className="max-w-4xl">
        <p className="text-sm font-mono uppercase tracking-widest text-neutral-400 mb-6">
          {copy.eyebrow}
        </p>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none text-white">
          {copy.heading}
        </h1>

        <p className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-neutral-400">
          {copy.intro}
        </p>
      </div>
    </section>
  )
}
