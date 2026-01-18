import Home from './components/Home.js';

const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://fiveprojekt.com';
const ogDefault = `${base.replace(/\/$/, '')}/og/og.png`;

export const viewport = {
  themeColor: '#0f0a06',
  width: 'device-width',
  initialScale: 1,
};


export const metadata = {
  metadataBase: new URL(base),

  title: 'FIVE° Projekt',
  description:
    'Új építésű - kulcsrakész eladó lakások, 5 percre Győr belvárosától. Prémium műszaki tartalom, átlátható döntések.',

  alternates: {
    canonical: '/',
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: 'FIVE° Projekt',
    description:
      'Új építésű - kulcsrakész eladó lakások, 5 percre Győr belvárosától. Prémium műszaki tartalom, átlátható döntések.',
    type: 'website',
    url: '/',
    siteName: 'FIVE° Projekt',
    locale: 'hu_HU',
    images: [{ url: ogDefault, width: 1200, height: 630, alt: 'FIVE° Projekt' }],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'FIVE° Projekt',
    description:
      'Új építésű - kulcsrakész eladó lakások, 5 percre Győr belvárosától. Prémium műszaki tartalom, átlátható döntések.',
    images: [ogDefault],
  },

  /*themeColor: '#0f0a06',*/

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png' }],
  },

  manifest: '/site.webmanifest',
};

export default function HomePage() {
  return <Home />;
}
