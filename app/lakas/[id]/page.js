import Link from 'next/link';
import { getAllUnits, formatMft, floorLabel } from '../../../lib/units.js';
import UnitShell from '../../components/UnitShell.js';

export const revalidate = 600;

function getBaseUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
}

export async function generateStaticParams() {
  const units = await getAllUnits();
  return units.map((u) => ({ id: u.slug }));
}

export async function generateMetadata({ params }) {
  const units = await getAllUnits();
  const { id } = await params; // params nem Promise
  const unit = units.find((u) => u.slug === id);
  const base = getBaseUrl();
  const canonicalUrl = `${base}/lakas/${id}`;
  const ogDefault = `${base}/og/og.png`;

  if (!unit) {
    return {
      metadataBase: new URL(base),
      title: 'Lakás nem található | FIVE° Projekt',
      description: 'A keresett lakás nem található. Nézd meg az összes elérhető lakást.',
      robots: { index: false, follow: false },
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: 'Lakás nem található | FIVE° Projekt',
        description: 'A keresett lakás nem található. Nézd meg az összes elérhető lakást.',
        url: canonicalUrl,
        images: [{ url: ogDefault, width: 1200, height: 630, alt: 'FIVE° Projekt' }],
        locale: 'hu_HU',
        siteName: 'FIVE° Projekt',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Lakás nem található | FIVE° Projekt',
        description: 'A keresett lakás nem található. Nézd meg az összes elérhető lakást.',
        images: [ogDefault],
      },
    };
  }

  const priceFt = unit.priceKkFt;

  const area =
    unit.m2?.toFixed ? unit.m2.toFixed(2).replace('.', ',') : String(unit.m2 ?? '');

  const title = `${unit.id} – ${floorLabel(unit.emelet)} – ${area} m² | FIVE° Projekt`;
  const description = `Új építésű, kulcsrakész lakás: ${unit.id}, ${floorLabel(unit.emelet)}, ${unit.m2} m², tájolás: ${
    unit.tajolas || '—'
  }, kulcsrakész ár: ${formatMft(priceFt)}.`;

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
      images: [
        { url: ogDefault, width: 1200, height: 630, alt: 'FIVE° Projekt' },
      ],
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

export default async function UnitPage({ params }) {
  const units = await getAllUnits();
  const { id } = await params; // params nem Promise
  const unit = units.find((u) => u.slug === id);

  if (!unit) {
    return (
      <div className="card">
        <h1>Lakás nem található</h1>
        <p className="muted">Ellenőrizd a linket, vagy nézd meg az összes lakást.</p>
        <Link className="btn primary" href="/lakasok">
          Vissza a listához
        </Link>
      </div>
    );
  }

  return (
    <UnitShell unit={unit} formatMft={formatMft} floorLabel={floorLabel} />
  );
}
