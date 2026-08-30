
import { ArrowUpRight } from 'lucide-react'

export function IntroSection() {
  return (
    <section className="relative max-w-8xl px-6 md:px-12 lg:px-30 lg:mx-30 py-24 md:py-32 lg:py-40 border-t border-neutral-700 bg-neutral-950 rounded-t-3xl">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

        {/* Left - Title */}
        <div className="lg:col-span-5">
          <div className="relative">
            <span className="text-sm font-mono uppercase tracking-widest text-neutral-400 mb-6 block">
              Introduction
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Interaction <br />
              <span className="text-neutral-400">Motion & Performance</span>
            </h2>
          </div>
        </div>

        {/* Right - Content */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-6 text-justify">
            <p className="text-xl md:text-2xl leading-relaxed text-white font-light">
              I'm <span className="text-white font-medium">Faidz Agustiawan</span>, a passionate <span className='text-blue-300 font-bold'>frontend developer</span> based in Malang, Indonesia. My journey into web development started with a deep fascination for motion and interaction.
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-neutral-400">
              Over the years, I have honed my skills in modern web technologies, particularly React and its ecosystem. I focus on building interfaces that perfectly balance stunning visual aesthetics with solid, scalable engineering. I sweat the small stuff, like transitions, micro-interactions, and timing, because those details are what elevate a good product into an exceptional one.
            </p>

            <p className="text-lg leading-relaxed text-neutral-400">
              Beyond writing code, I constantly explore contemporary design, 3D web environments, and UI/UX patterns. Whether I'm building a complex web application or a slick landing page, my goal is always the same: to deliver an immersive digital experience that leaves a lasting impression.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}
