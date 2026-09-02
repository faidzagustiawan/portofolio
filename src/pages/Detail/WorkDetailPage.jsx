import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react'
import { useProjects } from '@/context/projects-context'
import { NoLiveUrlModal } from './NoLiveUrlModal'
import { TeamSection } from './TeamSection'
import { SmartImage } from '@/components/UI/SmartImage'
import { ProjectMedia } from '@/components/UI/ProjectMedia'
import SEO from '@/components/SEO'

const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-10%' }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
)

const ScaleIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: '-10%' }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
)

/** Two-column section with a running number that never has to be hand-kept. */
const NumberedSection = ({ step, eyebrow, heading, children, className = '' }) => (
  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 ${className}`}>
    <div className="lg:col-span-4">
      <FadeUp>
        <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-400 mb-4">
          {String(step).padStart(2, '0')}. {eyebrow}
        </h2>
        <p className="text-3xl font-bold text-white">{heading}</p>
      </FadeUp>
    </div>
    <div className="lg:col-span-8">
      <FadeUp delay={0.1}>{children}</FadeUp>
    </div>
  </div>
)

const Prose = ({ children }) => (
  <p className="text-lg md:text-xl text-neutral-400 leading-relaxed">{children}</p>
)

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const { projects, isLoading, error } = useProjects()
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-neutral-400">
        <p role="status">Loading project…</p>
      </div>
    )
  }

  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <main className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-white p-6 text-center">
        <SEO title="Project not found" url={`/work/${slug}`} noIndex />
        <h1 className="text-3xl font-bold mb-4">Project not found</h1>
        <p className="text-neutral-400 mb-8 max-w-md">
          {error
            ? 'The project feed did not load, so this page cannot be shown right now.'
            : 'That project does not exist, or it has been unpublished.'}
        </p>
        <Link
          to="/work"
          className="px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-neutral-200 transition-colors"
        >
          Back to work
        </Link>
      </main>
    )
  }

  const nextProject = projects.find((p) => p.slug === project.nextProjectSlug)

  // Only the sections this project actually filled in get a number.
  const sections = [
    project.overview && { key: 'overview', eyebrow: 'Overview', heading: 'Project context', body: project.overview },
    project.challenge && { key: 'challenge', eyebrow: 'Challenge', heading: 'The problem', body: project.challenge, banded: true },
    project.approach && { key: 'approach', eyebrow: 'Approach', heading: 'My process', body: project.approach },
    project.solution && { key: 'solution', eyebrow: 'Solution', heading: 'The build', body: project.solution },
    project.contribution && { key: 'contribution', eyebrow: 'My contribution', heading: 'What I did', body: project.contribution },
  ].filter(Boolean)

  const teamStep = sections.length + 1
  const outcomeStep = teamStep + (project.team.length > 0 ? 1 : 0)

  const handleMissingLink = (value) => (e) => {
    if (!value) {
      e.preventDefault()
      setIsModalOpen(true)
    }
  }

  return (
    <main
      key={slug}
      className="min-h-screen bg-neutral-950 text-white selection:bg-white selection:text-neutral-950"
    >
      <SEO
        title={project.name}
        description={project.tagline || project.overview}
        image={project.image}
        url={`/work/${project.slug}`}
        type="article"
      />

      <NoLiveUrlModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectName={project.name}
      />

      {/* --- HERO --- */}
      <section className="flex flex-col justify-end relative pt-32 pb-12 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <FadeUp>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            Back to work
          </Link>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-8">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.1]"
              >
                {project.name}
              </motion.h1>
            </div>

            {project.tagline && (
              <FadeUp delay={0.2}>
                <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed max-w-2xl">
                  {project.tagline}
                </p>
              </FadeUp>
            )}
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end">
            <FadeUp delay={0.4}>
              <dl className="grid grid-cols-2 gap-y-8 gap-x-4 border-t border-neutral-800 pt-8 lg:border-none lg:pt-0">
                {[
                  { label: 'Role', value: project.role },
                  { label: 'Year', value: project.year },
                  { label: 'Client', value: project.client },
                  { label: 'Duration', value: project.duration },
                ]
                  .filter((item) => item.value)
                  .map((item) => (
                    <div key={item.label}>
                      <dt className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                        {item.label}
                      </dt>
                      <dd className="font-medium text-base md:text-lg">{item.value}</dd>
                    </div>
                  ))}
              </dl>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* --- TECH MARQUEE --- */}
      {project.technologies.length > 0 && (
        <section className="py-8 border-y border-neutral-900 bg-neutral-900/20 overflow-hidden">
          <h2 className="sr-only">Technologies used</h2>
          {/* The marquee repeats itself, so assistive tech reads the plain list
              above it instead of four duplicated passes. */}
          <ul className="sr-only">
            {project.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>

          <div className="flex whitespace-nowrap" aria-hidden="true">
            <motion.div
              animate={{ x: '-50%' }}
              transition={{ repeat: Infinity, ease: 'linear', duration: 30 }}
              className="flex gap-12 md:gap-24 pl-12 md:pl-24"
            >
              {[...Array(4)].map((_, groupIndex) => (
                <React.Fragment key={groupIndex}>
                  {project.technologies.map((tech, i) => (
                    <span
                      key={`${groupIndex}-${i}`}
                      className="text-lg md:text-xl font-medium text-neutral-500"
                    >
                      {tech}
                    </span>
                  ))}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* --- HERO MEDIA --- */}
      <section className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-16 md:py-24">
        <ScaleIn>
          <div className="aspect-video w-full bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden relative">
            <ProjectMedia project={project} priority className="w-full h-full object-cover" />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-neutral-950/50 to-transparent pointer-events-none"
            />
          </div>
        </ScaleIn>
      </section>

      {/* --- NARRATIVE --- */}
      {sections.map((section, i) =>
        section.banded ? (
          <section
            key={section.key}
            className="py-24 bg-neutral-900/50 border-y border-neutral-900 my-12"
          >
            <div className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
              <NumberedSection step={i + 1} eyebrow={section.eyebrow} heading={section.heading}>
                <Prose>{section.body}</Prose>
              </NumberedSection>
            </div>
          </section>
        ) : (
          <section
            key={section.key}
            className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-16 md:py-24"
          >
            <NumberedSection step={i + 1} eyebrow={section.eyebrow} heading={section.heading}>
              <Prose>{section.body}</Prose>
            </NumberedSection>
          </section>
        )
      )}

      {/* --- VISUAL DETAILS --- */}
      {project.visualDetails.length > 0 && (
        <section className="py-12">
          <div className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto mb-8">
            <FadeUp>
              <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-400 mb-4">
                Visual details
              </h2>
              <p className="text-3xl font-bold text-white">Project highlights</p>
            </FadeUp>
          </div>

          <ul className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 md:px-12 lg:px-16 pb-8 list-none m-0">
            {project.visualDetails.map((src, i) => (
              <li key={src} className="shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] snap-center">
                <FadeUp delay={i * 0.1}>
                  <div className="aspect-[4/3] bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
                    <SmartImage
                      src={src}
                      alt={`${project.name} — detail ${i + 1}`}
                      className="w-full h-full"
                    />
                  </div>
                </FadeUp>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* --- TEAM --- */}
      <TeamSection team={project.team} step={teamStep} />

      {/* --- OUTCOME --- */}
      {(project.outcome || project.liveUrl || project.githubUrl) && (
        <section className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-16 md:py-24">
          <div className="p-8 md:p-12 bg-neutral-900 rounded-2xl border border-neutral-800">
            <NumberedSection step={outcomeStep} eyebrow="Outcome" heading="The result">
              {project.outcome && <Prose>{project.outcome}</Prose>}

              <div className="flex flex-wrap gap-8 mt-8">
                <a
                  href={project.liveUrl || '#'}
                  onClick={handleMissingLink(project.liveUrl)}
                  target={project.liveUrl ? '_blank' : undefined}
                  rel={project.liveUrl ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 text-base font-medium text-white border-b border-white pb-1 hover:text-neutral-400 hover:border-neutral-400 transition-all group"
                >
                  View live project
                  <ExternalLink
                    aria-hidden="true"
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>

                <a
                  href={project.githubUrl || '#'}
                  onClick={handleMissingLink(project.githubUrl)}
                  target={project.githubUrl ? '_blank' : undefined}
                  rel={project.githubUrl ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 text-base font-medium text-white border-b border-white pb-1 hover:text-neutral-400 hover:border-neutral-400 transition-all group"
                >
                  View source
                  <ExternalLink
                    aria-hidden="true"
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </NumberedSection>
          </div>
        </section>
      )}

      {/* --- NEXT PROJECT --- */}
      {nextProject && (
        <section className="border-t border-neutral-800 bg-neutral-950">
          <Link to={`/work/${nextProject.slug}`} className="group block relative overflow-hidden">
            <div
              aria-hidden="true"
              className={`absolute inset-0 bg-linear-to-r ${nextProject.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}
            />

            <div className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-24 md:py-32 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <span className="text-sm font-mono uppercase tracking-widest text-neutral-400 mb-4 block">
                    Next project
                  </span>
                  <p className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight text-white transition-transform duration-700 group-hover:translate-x-4">
                    {nextProject.name}
                  </p>
                </div>

                <div className="flex justify-center items-center">
                  <div
                    aria-hidden="true"
                    className="w-16 h-16 border border-neutral-700 rounded-full flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:border-transparent shrink-0 group-hover:scale-110"
                  >
                    <ArrowUpRight className="w-6 h-6 transition-transform duration-500 group-hover:rotate-45" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}
    </main>
  )
}
