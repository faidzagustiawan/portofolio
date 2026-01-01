
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react'
import { projects } from '@/data/projects'
import { NoLiveUrlModal } from './NoLiveUrlModal'
import { TeamSection } from './TeamSection'
import { useInViewVideo } from "@/hooks/useInViewVideo"


const FadeUp = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
        {children}
    </motion.div>
)

const ScaleIn = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
        {children}
    </motion.div>
)

export default function ProjectDetailPage() {
    const videoRef = useInViewVideo()
    const { slug } = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const project = projects.find((p) => p.slug === slug)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [slug])

    if (!project) {
        return (
            <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-white p-6 text-center">
                <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
                <p className="text-neutral-500 mb-8">The project you are looking for does not exist.</p>
                <Link
                    to="/work"
                    className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-neutral-200 transition-colors"
                >
                    Back to Work
                </Link>
            </div>
        )
    }

    const nextProject = projects.find((p) => p.slug === project.nextProjectSlug)

    const handleLiveProjectClick = (e) => {
        if (!project.liveUrl) {
            e.preventDefault()
            setIsModalOpen(true)
        }
    }

    return (
        <main
            key={slug}
            className="min-h-screen bg-neutral-950 text-white selection:bg-white selection:text-neutral-950"
        >
            {/* Modal */}
            <NoLiveUrlModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                projectName={project.name}
            />

            {/* --- HERO SECTION --- */}
            <section className="flex flex-col justify-end relative pt-32 pb-12 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
                <FadeUp>
                    <Link
                        to="/work"
                        className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors mb-12 group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Work
                    </Link>
                </FadeUp>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    <div className="lg:col-span-8">
                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.1]"
                            >
                                {project.name}
                            </motion.h1>
                        </div>

                        <FadeUp delay={0.2}>
                            <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed max-w-2xl">
                                {project.tagline}
                            </p>
                        </FadeUp>
                    </div>

                    <div className="lg:col-span-4 flex flex-col justify-end">
                        <FadeUp delay={0.4}>
                            <div className="grid grid-cols-2 gap-y-8 gap-x-4 border-t border-neutral-800 pt-8 lg:border-none lg:pt-0">
                                {[
                                    { label: "Role", value: project.role },
                                    { label: "Year", value: project.year },
                                    { label: "Client", value: project.client },
                                    { label: "Duration", value: project.duration },
                                ].map((item, i) => (
                                    <div key={i}>
                                        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-2">
                                            {item.label}
                                        </span>
                                        <p className="font-medium text-base md:text-lg">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </FadeUp>
                    </div>
                </div>
            </section>

            {/* --- TECH MARQUEE --- */}
            <section className="py-8 border-y border-neutral-900 bg-neutral-900/20 overflow-hidden">
                <div className="flex whitespace-nowrap">
                    <motion.div
                        animate={{ x: "-50%" }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                        className="flex gap-12 md:gap-24 pl-12 md:pl-24"
                    >
                        {[...Array(4)].map((_, groupIndex) => (
                            <React.Fragment key={groupIndex}>
                                {project.technologies.map((tech, i) => (
                                    <span key={`${groupIndex}-${i}`} className="text-lg md:text-xl font-medium text-neutral-600">
                                        {tech}
                                    </span>
                                ))}
                            </React.Fragment>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* --- HERO IMAGE --- */}
            <section className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-16 md:py-24">
                <ScaleIn>
                    <div className="aspect-video w-full bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden relative">
                        {project.image ? (
                            <video
                                ref={videoRef}
                                src={project.image}
                                alt={project.name}
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-700">
                                Hero Image Placeholder
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 to-transparent" />
                    </div>
                </ScaleIn>
            </section>

            {/* --- OVERVIEW --- */}
            <section className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    <div className="lg:col-span-4">
                        <FadeUp>
                            <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-4">01 — Overview</h2>
                            <h3 className="text-3xl font-bold text-white">Project Context</h3>
                        </FadeUp>
                    </div>
                    <div className="lg:col-span-8">
                        <FadeUp delay={0.1}>
                            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed">
                                {project.overview}
                            </p>
                        </FadeUp>
                    </div>
                </div>
            </section>

            {/* --- CHALLENGE --- */}
            <section className="py-24 bg-neutral-900/50 border-y border-neutral-900 my-12">
                <div className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        <div className="lg:col-span-4">
                            <FadeUp>
                                <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-4">02 — Challenge</h2>
                                <h3 className="text-3xl font-bold text-white">The Problem</h3>
                            </FadeUp>
                        </div>
                        <div className="lg:col-span-8">
                            <FadeUp delay={0.1}>
                                <p className="text-lg md:text-xl text-neutral-400 leading-relaxed">
                                    {project.challenge}
                                </p>
                            </FadeUp>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- IMAGE GRID --- */}
            <section className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <FadeUp>
                        <div className="aspect-[4/3] bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center overflow-hidden">
                            <div className="w-full h-full bg-neutral-800/50 flex items-center justify-center text-neutral-600">Visual Detail 1</div>
                        </div>
                    </FadeUp>
                    <FadeUp delay={0.2}>
                        <div className="aspect-[4/3] bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center overflow-hidden">
                            <div className="w-full h-full bg-neutral-800/50 flex items-center justify-center text-neutral-600">Visual Detail 2</div>
                        </div>
                    </FadeUp>
                </div>
            </section>

            {/* --- APPROACH --- */}
            <section className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-24 border-t border-neutral-900">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    <div className="lg:col-span-4">
                        <FadeUp>
                            <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-4">03 — Approach</h2>
                            <h3 className="text-3xl font-bold text-white">My Process</h3>
                        </FadeUp>
                    </div>
                    <div className="lg:col-span-8">
                        <FadeUp delay={0.1}>
                            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed">
                                {project.approach}
                            </p>
                        </FadeUp>
                    </div>
                </div>
            </section>


            {/* --- SOLUTION --- */}
            <section className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-24 pt-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
                    <div className="lg:col-span-4">
                        <FadeUp>
                            <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-4">04 — Solution</h2>
                            <h3 className="text-3xl font-bold text-white">The Build</h3>
                        </FadeUp>
                    </div>
                    <div className="lg:col-span-8">
                        <FadeUp delay={0.1}>
                            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed">
                                {project.solution}
                            </p>
                        </FadeUp>
                    </div>
                </div>



                {/* --- TEAM SECTION --- */}
                <TeamSection team={project.team} />


                {/* --- OUTCOME --- */}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 p-8 md:p-12 bg-neutral-900 rounded-2xl border border-neutral-800">
                    <div className="lg:col-span-4">
                        <FadeUp>
                            <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-4">06 — Outcome</h2>
                            <h3 className="text-3xl font-bold text-white">The Result</h3>
                        </FadeUp>
                    </div>
                    <div className="lg:col-span-8">
                        <FadeUp delay={0.1}>
                            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-8">
                                {project.outcome}
                            </p>
                        </FadeUp>
                        <div className='flex justify-between'>
                            <FadeUp delay={0.2}>
                                <button
                                    onClick={handleLiveProjectClick}
                                    className="inline-flex items-center gap-2 text-base font-medium text-white border-b border-white pb-1 hover:text-neutral-400 hover:border-neutral-400 transition-all group cursor-pointer"
                                >
                                    View Live Project
                                    <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </button>
                            </FadeUp>

                            <FadeUp delay={0.2}>
                                <button
                                    onClick={handleLiveProjectClick}
                                    className="inline-flex items-center gap-2 text-base font-medium text-white border-b border-white pb-1 hover:text-neutral-400 hover:border-neutral-400 transition-all group cursor-pointer"
                                >
                                    View Github
                                    <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </button>
                            </FadeUp>
                        </div>
                    </div>
                </div>
            </section>



            {/* --- NEXT PROJECT FOOTER --- */}
            {nextProject && (
                <section className="border-t border-neutral-800 bg-neutral-950">
                    <Link
                        to={`/project/${nextProject.slug}`}
                        className="group block relative overflow-hidden"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-r ${nextProject.color || 'from-neutral-800 to-neutral-900'} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />

                        <div className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-24 md:py-32 relative z-10">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                <div>
                                    <span className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-4 block group-hover:text-neutral-400 transition-colors">
                                        Next Project
                                    </span>
                                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight text-white transition-transform duration-700 group-hover:translate-x-4">
                                        {nextProject.name}
                                    </h2>
                                </div>

                                <div className='flex justify-center items-center'>
                                    <div className="w-16 h-16 border border-neutral-700 rounded-full flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:border-transparent shrink-0 group-hover:scale-110">
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