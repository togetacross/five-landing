import Head from "next/head";

const DEFAULT_OG_IMAGE = "/og/og.png";

export default function SeoHead({ title, description, path = "/" }) {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
  const canonical = `${siteUrl}${path}`;

  return (
    <Head>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
      />
      <link rel="canonical" href={canonical} />

      {/* Viewport & theme */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0f0a06" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="FIVE° Projekt" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${siteUrl}${DEFAULT_OG_IMAGE}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${DEFAULT_OG_IMAGE}`} />

      {/* Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" sizes="16x16" href="/icons/favicon-16x16.png" />
      <link rel="icon" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
}
