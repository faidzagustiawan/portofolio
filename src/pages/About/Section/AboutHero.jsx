import { SplitText } from '@/components/Animation/SplitText'
import Lanyard from '@/components/Animation/Lanyard'

export function AboutHero() {
  return (
    <div
      className="fixed inset-0 z-10 bg-neutral-950 overflow-hidden flex items-center"
    >
      
      <div
        className="relative w-full max-w-8xl mx-auto justify-center lg:justify-start lg:pl-40 flex items-center"
      >
        {/* ================= TEXT ================= */}
        <div className="relative z-10 max-w-4xl text-center lg:text-left">
          <p className="mb-6 text-sm font-mono uppercase tracking-widest text-neutral-500">
            About Me
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight leading-none">
            <SplitText delay={200} stagger={40}>
              A frontend
            </SplitText>
            <br />
            <span className="text-neutral-500">
              <SplitText delay={400} stagger={40}>
                developer who
              </SplitText>
            </span>
            <br />
            <SplitText delay={600} stagger={40}>
              loves motion
            </SplitText>
          </h1>
        </div>

        {/* ================= LANYARD (DESKTOP ONLY) ================= */}
        <div
          className="
            hidden lg:block
            absolute -right-220 top-1/3
            -translate-y-1/2
            w-[420px] xl:w-700
            pointer-events-auto
          "
        >
          <div className="h-[360px] xl:h-300 flex items-center justify-center">
            {/* 
            */}
            <Lanyard cameraDistance={1} />
          </div>
        </div>
      </div>
    </div>
  )
}
