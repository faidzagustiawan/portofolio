import { useState } from 'react'

/**
 * Image with a skeleton that fades out on load. Falls back to a flat surface
 * if the file 404s, so a missing upload never leaves a broken-image glyph.
 */
export function SmartImage({ src, alt = '', className = '', imgClassName = '', ...props }) {
  const [state, setState] = useState('loading')

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-neutral-800 transition-opacity duration-500 ${
          state === 'loading' ? 'opacity-100 animate-pulse' : 'opacity-0'
        }`}
      />

      {state !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
          className={`relative w-full h-full object-cover transition-opacity duration-700 ${
            state === 'loaded' ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
          {...props}
        />
      )}
    </div>
  )
}
