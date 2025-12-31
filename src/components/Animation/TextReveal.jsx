import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

export const TextReveal = ({
  text,
  className,
  as: Component = 'p',
  delay = 0,
  stagger = 50,
  animationType = 'words',
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  const items = animationType === 'chars' 
    ? text.split('') 
    : animationType === 'words'
    ? text.split(' ')
    : [text];

  return (
    <Component ref={ref} className={cn('overflow-hidden', className)}>
      {items.map((item, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
        >
          <span
            className={cn(
              'inline-block transition-all duration-700',
              isVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-full opacity-0'
            )}
            style={{
              transitionDelay: `${delay + i * stagger}ms`,
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {item}
            {/* Menambahkan spasi jika mode 'words' agar kalimat tidak menyatu */}
            {animationType === 'words' && i < items.length - 1 && '\u00A0'}
          </span>
        </span>
      ))}
    </Component>
  );
};