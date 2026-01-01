import { useEffect, useRef } from "react"
import { usePageTransition } from "@/context/PageTransitionContext"
import { preloaderWords } from "@/data/preLoaderWords"

import HeroSection from "./Section/HeroSection"
import IntroSection from "./Section/IntroSection"
import WorkShowcaseSection from "./Section/WorkShowcaseSection"
import FinalCTASection from "./Section/FinalCTASection"

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
    <main className="bg-black text-white">
      <HeroSection />
      <IntroSection />
      <WorkShowcaseSection />
      <FinalCTASection />
    </main>
  )
}

export default HomePage
