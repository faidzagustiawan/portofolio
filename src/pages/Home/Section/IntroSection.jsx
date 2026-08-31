
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
              I'm <span className="text-white font-medium">Faidz Agustiawan</span>, a software developer based in Malang, Indonesia. My work is heavily focused on JavaScript, building full-stack web applications from a blank file all the way to a live deployment.
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-neutral-400">
              I handle the entire lifecycle of a project—designing the database, writing the server logic, and managing the deployment for real users. I enjoy the process of owning a product end-to-end and ensuring the backend can support the features I want to build.
            </p>

            <p className="text-lg leading-relaxed text-neutral-400">
              But even when wrestling with server logic, I never treat the frontend as an afterthought. I work primarily with React and still spend hours tweaking spring physics and micro-interactions. Whether it's a complex system or a simple landing page, I build software that is fast, reliable, and fun to use.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}
