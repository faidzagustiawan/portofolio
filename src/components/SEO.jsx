import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, image, url, type = 'website' }) {
  const siteTitle = 'Faidz Agustiawan | Frontend Developer';
  const defaultDescription = 'Portfolio of Faidz Agustiawan, a frontend developer focused on motion, interaction, and performance.';
  const defaultImage = 'https://faidzagustiawan.com/FotoFaidz.svg'; // Use absolute URL for OG image
  const defaultUrl = 'https://faidzagustiawan.com';

  const seoTitle = title ? `${title} | Faidz Agustiawan` : siteTitle;
  const seoDescription = description || defaultDescription;
  const seoImage = image ? (image.startsWith('http') ? image : `${defaultUrl}${image}`) : defaultImage;
  const seoUrl = url ? `${defaultUrl}${url}` : defaultUrl;

  // Schema.org JSON-LD
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type === 'article' ? 'Article' : 'WebSite',
        "name": seoTitle,
        "description": seoDescription,
        "url": seoUrl,
        "image": seoImage,
      },
      ...(type === 'website' && seoUrl === defaultUrl ? [{
        "@type": "Person",
        "name": "Faidz Agustiawan",
        "jobTitle": "Frontend Developer",
        "url": defaultUrl,
        "sameAs": [
          "https://www.linkedin.com/in/muhammad-faidz-agustiawan-8692821bb",
          "https://github.com/faidzagustiawan"
        ]
      }] : [])
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="title" content={seoTitle} />
      <meta name="description" content={seoDescription} />
      <link rel="canonical" href={seoUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:site_name" content="Faidz Agustiawan" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seoUrl} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
