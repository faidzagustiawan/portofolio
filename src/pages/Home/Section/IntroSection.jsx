export function IntroSection() {
  return (
    <section className="relative max-w-8xl mx-auto px-6 md:px-12 lg:px-30 py-24 md:py-32 lg:py-40 border-t border-neutral-800 bg-neutral-950 rounded-t-3xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        {/* Left — title */}
        <div className="lg:col-span-5">
          <p className="text-sm font-mono uppercase tracking-widest text-neutral-400 mb-6">
            Introduction
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Interaction <br />
            <span className="text-neutral-400">Motion &amp; Performance</span>
          </h2>
        </div>

        {/* Right — copy */}
        <div className="lg:col-span-7 space-y-6">
          <p className="text-xl md:text-2xl leading-relaxed text-white font-light">
            I'm <span className="font-medium">Faidz Agustiawan</span>, a full-stack developer based
            in Malang, Indonesia, currently finishing an Information Systems degree. My work is
            mostly JavaScript, taking web applications from a blank file to a live deployment.
          </p>

          <p className="text-lg md:text-xl leading-relaxed text-neutral-400">
            I handle the whole lifecycle — designing the database, writing the server logic, and
            managing the deployment for real users. Owning a product end to end is the part I
            enjoy: it means the backend can actually support the features I want to build.
          </p>

          <p className="text-lg leading-relaxed text-neutral-400">
            Even deep in server logic, I never treat the frontend as an afterthought. I work
            primarily with React and still spend hours tweaking spring physics and
            micro-interactions. Complex system or simple landing page, I build software that is
            fast, reliable, and enjoyable to use.
          </p>
        </div>
      </div>
    </section>
  )
}
