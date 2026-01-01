
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
              Interaction <br />
              <span className="text-neutral-500">Motion & Performance</span>
            </h2>
          </div>
        </div>

        {/* Right - Content */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-6 text-justify">
            <p className="text-xl md:text-2xl leading-relaxed text-white font-light">
              I started with an interest in motion and interaction, which naturally led me to <span className='text-blue-300 font-bold'>frontend development.</span> 
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-neutral-400">
              Over time, I’ve focused on building web interfaces that balance visual clarity with solid engineering. 
              I enjoy working on interaction details—transitions, feedback, and timing—because they directly affect how intuitive a product feels.
            </p>

            <p className="text-lg leading-relaxed text-neutral-500">
              Beyond coding, I explore animation, architecture, and contemporary design as references to refine how I approach interface problems.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}