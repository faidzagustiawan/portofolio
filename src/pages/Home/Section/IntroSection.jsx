import ScrollReveal from "@/components/Animation/ScrollReveal"
import ScrollRevealBlock from "@/components/Animation/ScrollRevealBlock"
import Magnet from "@/components/Animation/Magnet"
import { Link } from "react-router-dom"

const IntroSection = () => {
  return (
    <section className="min-h-[350vh] bg-black flex flex-row items-start pt-50 pb-50 px-6 md:px-16">
      <div className="max-w-5xl mx-auto sticky top-1/4">

        <ScrollReveal
          baseOpacity={0}
          enableBlur
          blurStrength={10}
          wordAnimationEnd="bottom top+=40%"
          textClassName="text-justify"
        >
          I don’t just build interfaces. I design how people feel, think, and move through
          digital products. Every decision here is intentional, shaped by curiosity,
          experimentation, and continuous learning.
        </ScrollReveal>

        <ScrollRevealBlock
          y={40}
          scale={0.9}
          blur={6}
          start="top bottom-=110%"
          end="+=60%"
          scrub={0.4}
          className="mt-14"
        >
          <p className="text-lg md:text-xl text-white/70 max-w-xl">
            This portfolio is a collection of decisions, experiments,
            and curiosity shaped into products.
          </p>
        </ScrollRevealBlock>

        <ScrollRevealBlock
          y={30}
          scale={0.95}
          blur={4}
          start="bottom"
          end="+=1"
          scrub={false}
          className="mt-14"
        >
          <Magnet padding={200} magnetStrength={10}>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 text-base md:text-lg font-medium
              text-white border border-white/30 px-6 py-3 rounded-full
              hover:bg-white hover:text-black transition"
            >
              Discover the story behind the work →
            </Link>
          </Magnet>
        </ScrollRevealBlock>

      </div>
    </section>
  )
}

export default IntroSection
