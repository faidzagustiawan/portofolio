import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '@/i18n/locale-context'
import { DEFAULT_LOCALE, HTML_LANG, LOCALES, OG_LOCALE, PREFIX } from '@/i18n/locale'

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://faidzagustiawan.id').replace(/\/+$/, '')
const SITE_NAME = 'Faidz Agustiawan'
const ROLE = 'Full-Stack Developer'

const DEFAULT_IMAGE = `${SITE_URL}/og-cover.jpg`

const DEFAULTS = {
  en: {
    title: `${SITE_NAME} | ${ROLE}`,
    description:
      'Faidz Agustiawan is a full-stack developer in Malang, Indonesia, building web and mobile products end to end with a frontend obsession for motion, interaction, and performance.',
  },
  id: {
    title: `${SITE_NAME} | ${ROLE}`,
    description:
      'Faidz Agustiawan adalah full-stack developer di Malang, Indonesia, yang membangun produk web dan mobile dari hulu ke hilir, dengan perhatian khusus pada gerak, interaksi, dan performa.',
  },
}

const PROFILES = [
  'https://www.linkedin.com/in/muhammad-faidz-agustiawan-8692821bb',
  'https://github.com/faidzagustiawan',
  'https://www.instagram.com/faidzagustiawan',
]

/** Absolute URL for a route, in a given locale. */
const absoluteFor = (route, locale) => `${SITE_URL}${PREFIX[locale] || ''}${route === '/' ? '' : route}` || SITE_URL

export default function SEO({
  title,
  description,
  image,
  imageAlt,
  url = '/',
  type = 'website',
  noIndex = false,
}) {
  const { locale } = useLocale()

  // index.html carries a site-level copy of these tags so link unfurlers, which
  // do not run JS, still get something. Once Helmet is live it owns them, so the
  // static pair is dropped to avoid two of every tag in the rendered document.
  useEffect(() => {
    document.querySelectorAll('meta[data-static-seo]').forEach((el) => el.remove())
  }, [])

  const fallback = DEFAULTS[locale] || DEFAULTS[DEFAULT_LOCALE]
  const seoTitle = title ? `${title} | ${SITE_NAME}` : fallback.title
  const seoDescription = description || fallback.description
  const seoUrl = absoluteFor(url, locale) || SITE_URL
  const seoImage = image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : DEFAULT_IMAGE

  const person = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: SITE_NAME,
    jobTitle: ROLE,
    url: SITE_URL,
    image: `${SITE_URL}/hero/portrait-1200.webp`,
    address: { '@type': 'PostalAddress', addressLocality: 'Malang', addressCountry: 'ID' },
    sameAs: PROFILES,
  }

  const graph = [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: fallback.title,
      url: SITE_URL,
      inLanguage: HTML_LANG[locale],
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    person,
    type === 'article'
      ? {
          '@type': 'CreativeWork',
          name: title,
          headline: title,
          description: seoDescription,
          url: seoUrl,
          image: seoImage,
          inLanguage: HTML_LANG[locale],
          author: { '@id': `${SITE_URL}/#person` },
        }
      : {
          '@type': 'WebPage',
          '@id': seoUrl,
          name: seoTitle,
          description: seoDescription,
          url: seoUrl,
          inLanguage: HTML_LANG[locale],
          isPartOf: { '@id': `${SITE_URL}/#website` },
        },
  ]

  return (
    <Helmet prioritizeSeoTags htmlAttributes={{ lang: HTML_LANG[locale] }}>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <link rel="canonical" href={seoUrl} />
      {noIndex && <meta name="robots" content="noindex, follow" />}

      {/* Each page declares every language it exists in, plus the default one
          search engines should fall back to for an unmatched locale. */}
      {LOCALES.map((alt) => (
        <link key={alt} rel="alternate" hreflang={HTML_LANG[alt]} href={absoluteFor(url, alt) || SITE_URL} />
      ))}
      <link rel="alternate" hreflang="x-default" href={absoluteFor(url, DEFAULT_LOCALE) || SITE_URL} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt || seoTitle} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={OG_LOCALE[locale]} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seoUrl} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />

      <script type="application/ld+json">
        {JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}
      </script>
    </Helmet>
  )
}
