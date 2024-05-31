import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  image: string
}

function SEO({ title, description, image }: SEOProps) {
  return (
    <Helmet>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="260" />
      <meta property="og:image:height" content="260" />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="ko_KR" />
      <meta name="description" content={description} />
      <title>{title}</title>
    </Helmet>
  )
}

export default SEO
