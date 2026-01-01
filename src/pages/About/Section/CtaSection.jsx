
import { Link } from 'react-router-dom'
import Magnet from '@/components/Animation/Magnet'
import React from 'react';

export function CTASection() {
    return (
        <section className="pt-60 pb-40  lg:pb-60 lg:pt-80 bg-neutral-950">
            <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-8">
                    Want to see <br />
                    <span className="text-neutral-500">my work?</span>
                </h2>

                <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">
                    Explore my portfolio of projects that showcase my approach to design,
                    development, and creative problem-solving.
                </p>

                <Magnet padding={2000} magnetStrength={10}>
                    <Link
                        to="/work"
                        className="inline-flex items-center gap-3 text-base md:text-lg font-medium
              text-white border border-white/30 px-6 py-3 rounded-full
              hover:bg-white hover:text-black transition"
                    >
                        Check Here →
                    </Link>
                </Magnet>

            </div>

        </section>
    )
}