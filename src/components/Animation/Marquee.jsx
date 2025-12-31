import React from 'react';
import { cn } from '@/lib/utils';

export const Marquee = ({
  children,
  className,
  speed = 30,
  pauseOnHover = true,
  direction = 'left',
}) => {
  return (
    <div
      className={cn(
        'flex overflow-hidden whitespace-nowrap group',
        className
      )}
    >
      <div
        className={cn(
          'flex shrink-0',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {children}
        {children}
      </div>
      <div
        className={cn(
          'flex shrink-0',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
};