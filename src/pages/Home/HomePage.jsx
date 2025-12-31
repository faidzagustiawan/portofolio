import { useEffect, useRef } from "react"
import { usePageTransition } from "@/context/PageTransitionContext"
import { preloaderWords } from "@/data/preLoaderWords"

import HeroSection from "./section/HeroSection"
import IntroSection from "./section/IntroSection"
import WorkShowcaseSection from "./section/WorkShowcaseSection"
import FinalCTASection from "./section/FinalCTASection"

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
