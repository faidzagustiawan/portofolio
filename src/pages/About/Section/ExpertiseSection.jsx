
import { SiReact, SiNextdotjs, SiJavascript, SiTailwindcss, SiTypescript, SiVuedotjs, SiSvelte, SiFigma, SiGit, SiFramer } from 'react-icons/si'
import { LogoLoop } from '@/components/animation/LogoLoop'

const techLogos = [
  { node: <SiReact />, title: 'React', href: 'https://react.dev' },
  { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
  { node: <SiTypescript />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { node: <SiJavascript />, title: 'JavaScript', href: 'https://developer.mozilla.org' },
  { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiVuedotjs />, title: 'Vue.js', href: 'https://vuejs.org' },
  { node: <SiSvelte />, title: 'Svelte', href: 'https://svelte.dev' },
  { node: <SiFramer />, title: 'Framer Motion', href: 'https://www.framer.com/motion' },
  { node: <SiFigma />, title: 'Figma', href: 'https://figma.com' },
  { node: <SiGit />, title: 'Git', href: 'https://git-scm.com' },
]

export function ExpertiseSection() {
  return (
    <section className="py-10  bg-neutral-950">

      <div className="relative h-[120px] overflow-visible">
        <LogoLoop
          logos={techLogos}
          speed={120}
          direction="left"
          logoHeight={42}
          gap={48}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#0a0a0a"
          ariaLabel="Technology stack"
        />
      </div>
    </section>
  )
}