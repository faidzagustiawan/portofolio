import ScrollFloat from "@/components/Animation/ScrollFloat"
import ScrollRevealBlock from "@/components/Animation/ScrollRevealBlock"
import Magnet from "@/components/Animation/Magnet"
import { Link } from "react-router-dom"

const FinalCTASection = () => {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center bg-neutral-950 px-6 md:px-16 pb-20">
      <div className="flex flex-col items-center gap-16">

        <ScrollFloat
          animationDuration={0.8}
          stagger={0.02}
          containerClassName="text-4xl md:text-6xl xl:text-8xl font-extrabold text-white text-center leading-[1.15] mx-6 md:mx-auto tracking-tighter max-w-5xl"
        >
          Let’s build something meaningful.
        </ScrollFloat>

        <ScrollRevealBlock
          y={30}
          scale={0.95}
          blur={4}
        >
          <Magnet padding={200} magnetStrength={10}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 text-base md:text-lg font-medium
              text-black bg-white border border-white/30 px-8 py-4 rounded-xl
              hover:bg-neutral-200 transition"
            >
              Contact Me →
            </Link>
          </Magnet>
        </ScrollRevealBlock>

      </div>
    </section>
  )
}

export default FinalCTASection
