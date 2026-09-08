import { ProjectMedia } from '@/components/UI/ProjectMedia'

const DOT = {
  live: 'bg-emerald-400',
  demo: 'bg-neutral-500',
  sandbox: 'bg-neutral-500',
}

/**
 * What sits in the case study before anything is running: the project's own
 * still, the label saying what opening it would give you, and the button that
 * opens it. The preview itself lives in a dialog, so this stays a poster.
 */
export function PreviewPoster({ project, tone, label, subtitle, children }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden">
      <div className="flex items-center gap-4 px-4 py-3 border-b border-neutral-800">
        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
          <span aria-hidden="true" className={`w-2 h-2 rounded-full ${DOT[tone]}`} />
          {label}
        </span>

        {subtitle && (
          <span className="hidden sm:block flex-1 truncate text-xs font-mono text-neutral-500">
            {subtitle}
          </span>
        )}
      </div>

      <div className="relative aspect-video w-full bg-neutral-950">
        <ProjectMedia project={project} priority className="w-full h-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-neutral-950/65 pointer-events-none" />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          {children}
        </div>
      </div>
    </div>
  )
}
