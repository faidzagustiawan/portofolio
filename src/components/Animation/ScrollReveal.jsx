import { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ScrollReveal = ({
  children,
  scrollContainerRef,
  containerRefExternal,
  enableBlur = true,
  baseOpacity = 0,
  blurStrength = 10,
  containerClassName = '',
  textClassName = '',
  wordAnimationEnd = 'bottom top+=40%',
}) => {
  const internalRef = useRef(null)
  const containerRef = containerRefExternal || internalRef

  // SPLIT TEXT → WORD
  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : ''
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word
      return (
        <span key={index} className="inline-block word">
          {word}
        </span>
      )
    })
  }, [children])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const scroller =
      scrollContainerRef?.current || window

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll('.word')

      gsap.fromTo(
        words,
        {
          opacity: baseOpacity,
          filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.18,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top ',
            end: '+=160%',
            scrub: true,
          },
        }
      )

    }, el)

    return () => ctx.revert()
  }, [
    scrollContainerRef,
    enableBlur,
    baseOpacity,
    blurStrength,
    wordAnimationEnd,
    containerRef,
  ])

  return (
    <h2
      ref={containerRef}
      className={`my-5 ${containerClassName}`}
    >
      <p
        className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold ${textClassName}`}
      >
        {splitText}
      </p>
    </h2>
  )
}

export default ScrollReveal
