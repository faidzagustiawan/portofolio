import { useInViewVideo } from '@/hooks/useInViewVideo'
import { SmartImage } from '@/components/UI/SmartImage'
import { useCopy } from '@/i18n/locale-context'

/**
 * Renders whatever media a project actually has: a looping video, a still, or —
 * when PocketBase has neither yet — a composed placeholder built from the
 * project's own accent gradient and initials.
 *
 * The fallback exists so an unfinished record reads as deliberate rather than
 * as a broken <img>.
 */
export function ProjectMedia({ project, className = '', priority = false }) {
  const videoRef = useInViewVideo()
  const copy = useCopy().detail

  if (project.video) {
    return (
      <video
        ref={videoRef}
        src={project.video}
        poster={project.image || undefined}
        aria-label={copy.previewAlt(project.name)}
        muted
        loop
        playsInline
        preload={priority ? 'auto' : 'metadata'}
        className={className}
      />
    )
  }

  if (project.image) {
    return (
      <SmartImage src={project.image} alt={copy.previewAlt(project.name)} className={className} />
    )
  }

  return <ProjectPlaceholder project={project} className={className} />
}

export function ProjectPlaceholder({ project, className = '' }) {
  const copy = useCopy()

  const initials = project.name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()

  return (
    <div
      role="img"
      aria-label={copy.detail.noPreviewAlt(project.name)}
      className={`relative flex items-center justify-center overflow-hidden bg-neutral-900 ${className}`}
    >
      <div className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-25`} />
      <div className="absolute inset-0 bg-linear-to-t from-neutral-950/70 to-transparent" />
      <div className="relative text-center px-4">
        <span className="block text-4xl md:text-5xl font-bold tracking-tight text-white/90">
          {initials}
        </span>
        <span className="mt-2 block text-[0.65rem] font-mono uppercase tracking-widest text-white/50">
          {copy.categories[project.category] || project.category}
        </span>
      </div>
    </div>
  )
}
