import React from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { cn } from '@/lib/utils'

export function SplitText({
  children,
  className,
  charClassName,
  delay = 0,
  stagger = 30,
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 })
  const chars = children.split('')

  return (
    <span ref={ref} className={cn('inline-block', className)}>
      {chars.map((char, i) => (
        <span
          key={i}
          className={cn(
            'inline-block transition-all duration-500',
            isVisible
              ? 'translate-y-0 opacity-100 rotate-0'
              : 'translate-y-[120%] opacity-0 rotate-12',
            charClassName
          )}
          style={{
            transitionDelay: `${delay + i * stagger}ms`,
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}
