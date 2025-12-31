import { useLayoutEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'power3.out',
  scrollStart = 'top center',
  scrollEnd = '+=160%',
  stagger = 0.04,
}) => {
  const containerRef = useRef(null)

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : ''
    return text.split('').map((char, index) => (
      <span key={index} className="inline-block char">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }, [children])

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return

    const scroller = scrollContainerRef?.current || window
    const chars = el.querySelectorAll('.char')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          yPercent: 140,
          scaleY: 2.6,
          scaleX: 0.7,
          transformOrigin: '50% 0%',
          willChange: 'transform, opacity',
        },
        {
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger,
          ease,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger])

  return (
    <h2 ref={containerRef} className={containerClassName}>
      <span className={`inline-block ${textClassName}`}>
        {splitText}
      </span>
    </h2>
  )
}

export default ScrollFloat
