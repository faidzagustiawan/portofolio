
export function QuoteSection() {
  return (
    <section className="py-24 md:py-32 lg:py-40 bg-neutral-900 border-y border-neutral-800">
      <blockquote className="text-center max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <span className="text-6xl md:text-8xl text-neutral-700">"</span>
        </div>
        
        <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8 text-white">
          The details are not the details. They make the design.
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-neutral-700" />
          <cite className="text-lg font-medium not-italic text-neutral-500">
            Charles Eames
          </cite>
          <div className="h-px w-12 bg-neutral-700" />
        </div>
      </blockquote>
    </section>
  )
}