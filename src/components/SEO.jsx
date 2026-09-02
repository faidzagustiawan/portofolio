import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://faidzagustiawan.id').replace(/\/+$/, '')
const SITE_NAME = 'Faidz Agustiawan'
const ROLE = 'Full-Stack Developer'

const DEFAULT_TITLE = `${SITE_NAME} | ${ROLE}`
const DEFAULT_DESCRIPTION =
  'Faidz Agustiawan is a full-stack developer in Malang, Indonesia, building web and mobile products end to end with a frontend obsession for motion, interaction, and performance.'
const DEFAULT_IMAGE = `${SITE_URL}/og-cover.jpg`

const PROFILES = [
  'https://www.linkedin.com/in/muhammad-faidz-agustiawan-8692821bb',
  'https://github.com/faidzagustiawan',
  'https://www.instagram.com/faidzagustiawan',
]

const absolute = (value, fallback) => {
  if (!value) return fallback
  return value.startsWith('http') ? value : `${SITE_URL}${value}`
}

export default function SEO({
  title,
  description,
  image,
  imageAlt,
  url,
  type = 'website',
  noIndex = false,
}) {
  // index.html carries a site-level copy of these tags so link unfurlers, which
  // do not run JS, still get something. Once Helmet is live it owns them, so the
  // static pair is dropped to avoid two of every tag in the rendered document.
  useEffect(() => {
    document.querySelectorAll('meta[data-static-seo]').forEach((el) => el.remove())
  }, [])

  const seoTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE
  const seoDescription = description || DEFAULT_DESCRIPTION
  const seoImage = absolute(image, DEFAULT_IMAGE)
  const seoUrl = url ? `${SITE_URL}${url}` : SITE_URL

  const person = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: SITE_NAME,
    jobTitle: ROLE,
    url: SITE_URL,
    image: `${SITE_URL}/hero/portrait-1200.webp`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Malang',
      addressCountry: 'ID',
    },
    sameAs: PROFILES,
  }

  const graph = [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: DEFAULT_TITLE,
      url: SITE_URL,
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
          author: { '@id': `${SITE_URL}/#person` },
        }
      : {
          '@type': 'WebPage',
          '@id': seoUrl,
          name: seoTitle,
          description: seoDescription,
          url: seoUrl,
          isPartOf: { '@id': `${SITE_URL}/#website` },
        },
  ]

  return (
    <Helmet prioritizeSeoTags>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <link rel="canonical" href={seoUrl} />
      {noIndex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content={type} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt || seoTitle} />
      <meta property="og:site_name" content={SITE_NAME} />

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
