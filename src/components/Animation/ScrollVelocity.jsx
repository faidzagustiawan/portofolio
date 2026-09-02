import { useLayoutEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  useReducedMotion,
} from 'framer-motion'

function useElementWidth(ref) {
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (ref.current) setWidth(ref.current.offsetWidth)
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [ref])

  return width
}

const wrap = (min, max, v) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

/**
 * Declared at module scope on purpose: defining it inside ScrollVelocity would
 * make it a new component type on every parent render, tearing down and
 * remounting the marquee each time.
 */
function VelocityText({
  children,
  baseVelocity,
  scrollContainerRef,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
}) {
  const shouldReduceMotion = useReducedMotion()

  const baseX = useMotionValue(0)
  const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {}
  const { scrollY } = useScroll(scrollOptions)
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping, stiffness })
  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping.input,
    velocityMapping.output,
    { clamp: false }
  )

  const copyRef = useRef(null)
  const copyWidth = useElementWidth(copyRef)

  const x = useTransform(baseX, (v) => (copyWidth === 0 ? '0px' : `${wrap(-copyWidth, 0, v)}px`))

  const directionFactor = useRef(1)
  useAnimationFrame((_, delta) => {
    if (shouldReduceMotion) return

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    if (velocityFactor.get() < 0) directionFactor.current = -1
    else if (velocityFactor.get() > 0) directionFactor.current = 1

    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  const copies = Array.from({ length: numCopies }, (_, i) => (
    <span className={`shrink-0 ${className}`} key={i} ref={i === 0 ? copyRef : null}>
      {children}
    </span>
  ))

  return (
    <div className={`${parallaxClassName ?? ''} relative overflow-hidden`} style={parallaxStyle}>
      <motion.div
        className={`${scrollerClassName ?? ''} flex whitespace-nowrap text-center font-sans text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-20`}
        style={{ x, ...scrollerStyle }}
      >
        {copies}
      </motion.div>
    </div>
  )
}

export const ScrollVelocity = ({ texts = [], velocity = 100, ...rest }) => (
  <div>
    {texts.map((text, index) => (
      <VelocityText key={text} baseVelocity={index % 2 !== 0 ? -velocity : velocity} {...rest}>
        {text}&nbsp;
      </VelocityText>
    ))}
  </div>
)

export default ScrollVelocity
