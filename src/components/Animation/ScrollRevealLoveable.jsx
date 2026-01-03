import React from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { cn } from '@/lib/utils'

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 800,
  animation = 'fade-up',
  threshold = 0.1,
}) {


  const { ref, isVisible } = useScrollReveal({
    threshold,
    root: typeof window !== 'undefined' ? document.documentElement : null,
  })

  const hidden = {
    'fade-up': 'opacity-0 translate-y-16',
    'fade-in': 'opacity-0',
    'slide-up': 'translate-y-full opacity-0',
    'slide-right': '-translate-x-full opacity-0',
    'slide-left': 'translate-x-full opacity-0',
    'scale': 'scale-90 opacity-0',
    'clip': 'opacity-0',
  }

  const visible = {
    'fade-up': 'opacity-100 translate-y-0',
    'fade-in': 'opacity-100',
    'slide-up': 'translate-y-0 opacity-100',
    'slide-right': 'translate-x-0 opacity-100',
    'slide-left': 'translate-x-0 opacity-100',
    'scale': 'scale-100 opacity-100',
    'clip': 'opacity-100',
  }

  const animationClass =
    isVisible && visible[animation]
      ? visible[animation]
      : hidden[animation]

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all will-change-transform',
        animationClass,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  )
}
