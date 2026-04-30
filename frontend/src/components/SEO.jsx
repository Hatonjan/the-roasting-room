import { Helmet } from 'react-helmet-async'

export default function SEO({ 
  title = 'Roasting Room - Premium Coffee',
  description = 'Discover premium specialty coffee. Fresh roasted beans, brewing equipment, and coffee tasting experiences.',
  image = 'https://roasting-room.netlify.app/assets/og-img.png',
  url = 'https://roasting-room.netlify.app',
  type = 'website',
  twitterHandle = '@roastingroomco' // Add your Twitter handle
}) {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={url} />

      {/* Open Graph Tags (Facebook, LinkedIn, etc) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Roasting Room" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content={twitterHandle} />

      {/* Keywords */}
      <meta name="keywords" content="coffee, specialty coffee, coffee beans, coffee roaster, coffee shop" />

      {/* Additional SEO */}
      <meta name="author" content="Roasting Room" />
      <meta name="robots" content="index, follow" />
    </Helmet>
  )
}
