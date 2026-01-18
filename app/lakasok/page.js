import { getAllUnits, getUnitsStats, applyFilters } from '../../lib/units.js';
import SeoHead from '../components/SeoHead.js';
import ResultContent from '../components/ResultContent.js';

export const revalidate = 600;

function spNumber(v) {
  if (v == null || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export async function generateMetadata({ searchParams }) {
  /*
   const sp = await searchParams;
 
   const floor = sp?.emelet != null && sp.emelet !== '' ? Number(sp.emelet) : null;
   const hasGarden = sp?.kert === '1' || sp?.kert === 'true';
   const hasBalcony = sp?.erkely === '1' || sp?.erkely === 'true';
   const tajolas = sp?.tajolas || '';
   const minPriceMft = spNumber(sp?.minAr);
   const maxPriceMft = spNumber(sp?.maxAr);
   const onlyAvailable = sp?.elerheto === 'true';
 
   const parts = ['Lakások'];
   if (floor != null) parts.push(floor === 0 ? 'Földszint' : `${floor}. emelet`);
   if (hasGarden) parts.push('kert');
   if (hasBalcony) parts.push('erkély');
   if (tajolas) parts.push(`${tajolas} tájolás`);
   if (minPriceMft != null || maxPriceMft != null) parts.push('ár szűrés');
   if (onlyAvailable) parts.push('csak elérhető');
 
   const title = parts.join(' – ') + ' | Prémium Residence';
   const description = 'Prémium újépítésű lakások a Five ban, különböző méretben, árfekvésben és elrendezéssel. Találd meg álmaid otthonát a Prémium Residence kínálatában!';
 */
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
    // URL: ?elerheto=true -> only available
    onlyAvailable: sp?.elerheto === 'true',
  };

  // note: units list is lazy-loaded client-side to keep the rest of the page static
  const orientations = Array.from(new Set(units.map((u) => u.tajolas).filter(Boolean)));
  const filteredCount = applyFilters(units, filters).length;

  return (
    <>
      <SeoHead
        title="FIVE° Projekt"
        description="Új építésű - kulcsrakész eladó lakások, 5 percre Győr belvárosától. Prémium műszaki tartalom, átlátható döntések."
        path="/lakasok"
      />

      <ResultContent
        stats={stats}
        filters={filters}
        orientations={orientations}
        filteredCount={filteredCount}
      />
    </>
  );
}
