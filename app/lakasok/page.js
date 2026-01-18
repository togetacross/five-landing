import { getAllUnits, getUnitsStats, applyFilters } from '../../lib/units.js';
import ResultContent from '../components/ResultContent.js';

export const revalidate = 600;

function spNumber(v) {
  if (v == null || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export const viewport = {
  themeColor: '#0f0a06',
  width: 'device-width',
  initialScale: 1,
};


export async function generateMetadata({ searchParams }) {
  const sp = await searchParams;

  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://fiveprojekt.com';
  const canonicalUrl = `${base.replace(/\/$/, '')}/lakasok`;
  const ogDefault = `${base.replace(/\/$/, '')}/og/og.png`;

  // SEO: listaoldalnál NE legyen query-függő canonical
  const title = 'Eladó lakások | FIVE° Projekt';
  const description =
    'Új építésű társasház, kulcsrakész eladó lakások 5 percre Győr belvárosától.';

  return {
    metadataBase: new URL(base),
    title,
    description,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [{ url: ogDefault, width: 1200, height: 630, alt: 'FIVE° Projekt' }],
      locale: 'hu_HU',
      siteName: 'FIVE° Projekt',
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogDefault],
    },
  };
}

export default async function LakasokPage({ searchParams }) {
  const units = await getAllUnits();
  const stats = getUnitsStats(units);

  const sp = await searchParams;

  const filters = {
    floor: sp?.emelet != null && sp.emelet !== '' ? Number(sp.emelet) : null,
    minM2: spNumber(sp?.minM2),
    maxM2: spNumber(sp?.maxM2),
    minPriceMft: spNumber(sp?.minAr),
    maxPriceMft: spNumber(sp?.maxAr),
    hasGarden: sp?.kert === '1' || sp?.kert === 'true',
    hasBalcony: sp?.erkely === '1' || sp?.erkely === 'true',
    tajolas: sp?.tajolas || '',
    onlyAvailable: sp?.elerheto === 'true',
  };

  const orientations = Array.from(new Set(units.map((u) => u.tajolas).filter(Boolean)));
  const filteredCount = applyFilters(units, filters).length;

  return (
    <ResultContent
      stats={stats}
      filters={filters}
      orientations={orientations}
      filteredCount={filteredCount}
    />
  );
}
