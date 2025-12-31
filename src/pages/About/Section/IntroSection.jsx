
import { ArrowUpRight } from 'lucide-react'

export function IntroSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40 border-t border-neutral-800 bg-neutral-950 rounded-t-3xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* Left - Title */}
        <div className="lg:col-span-5">
          <div className="sticky top-32">
            <span className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-6 block">
              Introduction
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Hello, I'm a <br />
              <span className="text-neutral-500">creative developer</span>
            </h2>
          </div>
        </div>

        {/* Right - Content */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-6">
            <p className="text-xl md:text-2xl leading-relaxed text-white font-light">
              I'm a frontend developer with a passion for creating immersive digital experiences.
              I specialize in building high-performance web applications that combine beautiful
              design with seamless interactions.
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-neutral-400">
              My journey began with a fascination for motion and interaction.
              Today, I work at the intersection of design and engineering, crafting experiences
              that are both beautiful and functional.
            </p>

            <p className="text-lg leading-relaxed text-neutral-500">
              Outside of coding, I explore animation systems, architecture, and contemporary art.
              I believe that great design comes from understanding multiple disciplines and
              bringing those perspectives together.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}