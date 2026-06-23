import { useEffect, useRef } from "react"
import { usePageTransition } from "@/context/PageTransitionContext"
import { preloaderWords } from "@/data/preLoaderWords"

import HeroSection from "./Section/HeroSection"
import { IntroSection } from "./Section/IntroSection"
import { ExpertiseSection } from "./Section/ExpertiseSection"
import WorkShowcaseSection from "./Section/WorkShowcaseSection"
import FinalCTASection from "./Section/FinalCTASection"

import SEO from "@/components/SEO"

const HomePage = () => {
  const { show } = usePageTransition()
  const booted = useRef(false)

  useEffect(() => {
    if (!booted.current) {
      show(preloaderWords)
      booted.current = true
    }
  }, [])

  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-white selection:text-neutral-950">
      <SEO url="/" title="Home" description="Frontend Developer based in Indonesia, specializing in motion, interaction, and modern web engineering." />
      {/* Fixed Hero Background */}
      <HeroSection />
      
      {/* Scrolling Content over Hero */}
      <div className="relative z-10 mt-[100vh] bg-neutral-950 shadow-[0_-10px_50px_rgba(0,0,0,0.5)]">
        <IntroSection />
        <ExpertiseSection />
        <WorkShowcaseSection />
        <FinalCTASection />
      </div>
    </main>
  )
}

export default HomePage
