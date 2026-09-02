import { SiGithub, SiInstagram, SiLinkedin, SiGmail } from 'react-icons/si'
import { useCopy } from '@/i18n/locale-context'

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/faidzagustiawan', Icon: SiGithub },
  { label: 'Instagram', href: 'https://www.instagram.com/faidzagustiawan', Icon: SiInstagram },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/muhammad-faidz-agustiawan-8692821bb',
    Icon: SiLinkedin,
  },
  { label: 'Email', href: 'mailto:faidzagustiawan@gmail.com', Icon: SiGmail },
]

const Footer = () => {
  const copy = useCopy()

  return (
    <footer className="relative z-20 bg-neutral-950 border-t border-neutral-800 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-sm text-neutral-400 order-2 sm:order-1">
          {copy.footer.credit(new Date().getFullYear())}
        </p>

        <nav aria-label={copy.footer.socialAria} className="flex gap-6 order-1 sm:order-2">
          {LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <Icon size={20} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}

export default Footer
