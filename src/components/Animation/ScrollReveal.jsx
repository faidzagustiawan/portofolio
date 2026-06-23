import { useMemo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ScrollReveal = ({
  children,
  enableBlur = true,
  baseOpacity = 0,
  blurStrength = 10,
  containerClassName = '',
  textClassName = '',
}) => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" })

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : ''
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word
      return (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            hidden: {
              opacity: baseOpacity,
              filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
              y: 20
            },
            visible: {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0
            }
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
        </motion.span>
      )
    })
  }, [children, baseOpacity, enableBlur, blurStrength])

  return (
    <h2
      ref={containerRef}
      className={`my-5 ${containerClassName}`}
    >
      <motion.p
        className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold ${textClassName}`}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ staggerChildren: 0.05 }}
      >
        {splitText}
      </motion.p>
    </h2>
  )
}

export default ScrollReveal
