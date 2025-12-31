import ScrollFloat from "@/components/Animation/ScrollFloat"
import ScrollRevealBlock from "@/components/Animation/ScrollRevealBlock"
import Magnet from "@/components/Animation/Magnet"
import { Link } from "react-router-dom"

const FinalCTASection = () => {
  return (
    <section className="min-h-[220vh] xl:min-h-[300vh] bg-black px-6 md:px-16">
      <div className="sticky top-1/3 flex flex-col items-center pb-20 gap-20">

        <ScrollFloat
          animationDuration={0.1}
          ease="back.inOut(2)"
          scrollStart="top center"
          scrollEnd="+=160%"
          stagger={0.01}
          containerClassName="text-3xl md:text-6xl xl:text-8xl font-extrabold text-white text-center leading-[1.15] mx-6  md:mx-7 xl:mx-100 tracking-tighter"
        >
          Let’s build something meaningful.
        </ScrollFloat>

        <ScrollRevealBlock
          start="top bottom-=120%"
          end="+=160%"
          y={30}
          scale={0.95}
          blur={4}
          scrub={false}
        >
          <Magnet padding={2000} magnetStrength={10}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 text-base md:text-lg font-medium
              text-white border border-white/30 px-6 py-3 rounded-full
              hover:bg-white hover:text-black transition"
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
