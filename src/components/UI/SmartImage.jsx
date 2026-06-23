import { useState } from 'react'

export function SmartImage({ src, alt, className, imgClassName = '', ...props }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton / Blur Placeholder */}
      <div 
        className={`absolute inset-0 bg-neutral-800 animate-pulse transition-opacity duration-500 z-0 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} 
      />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`relative z-10 w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  )
}
