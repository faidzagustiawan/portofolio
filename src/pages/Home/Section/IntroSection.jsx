import { useCopy } from '@/i18n/locale-context'

export function IntroSection() {
  const copy = useCopy().home
  const [first, ...rest] = copy.introBody

  return (
    <section className="relative max-w-8xl mx-auto px-6 md:px-12 lg:px-30 py-24 md:py-32 lg:py-40 border-t border-neutral-800 bg-neutral-950 rounded-t-3xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-5">
          <p className="text-sm font-mono uppercase tracking-widest text-neutral-400 mb-6">
            {copy.introEyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            {copy.introTitle} <br />
            <span className="text-neutral-400">{copy.introTitleAccent}</span>
          </h2>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <p className="text-xl md:text-2xl leading-relaxed text-white font-light">
            {first.split(copy.introName).map((part, i, all) => (
              <span key={i}>
                {part}
                {i < all.length - 1 && <span className="font-medium">{copy.introName}</span>}
              </span>
            ))}
          </p>

          {rest.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-lg md:text-xl leading-relaxed text-neutral-400">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
