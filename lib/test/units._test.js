import { csvToObjects } from './csv.js';

function toNumber(value) {
  const v = String(value ?? '')
    .replace(/\s/g, '')
    .replace(/,/g, '.')
    .replace(/[^0-9.\-]/g, '');
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function normalizeBoolHU(value) {
  const v = String(value ?? '').trim().toLowerCase();
  if (!v) return false;
  if (['igen', 'i', 'true', '1', 'yes', 'y'].includes(v)) return true;
  if (['nem', 'n', 'false', '0', 'no'].includes(v)) return false;
  return false;
}

/**
 * CSV headers (HU):
 * Lakás, m2, Erkély (m2), Kert (m2), FK (mft), KK (mft), Emelet, Elérhető, Tájolás
 *
 * NOTE: FK/KK oszlopok Ft-ban vannak a táblában (pl. 53 660 000),
 * a UI viszont M Ft-ban szűr és megjelenít.
 */
export function normalizeUnit(raw) {
  const id = (raw['Lakás'] || raw['Lakas'] || raw.id || raw.ID || '').toString().trim();
  const slug = id.toLowerCase();

  const m2 = toNumber(raw['m2']);
  const balconyM2 = toNumber(raw['Erkély (m2)'] ?? raw['Erkely (m2)'] ?? raw['Erkély'] ?? raw['Erkely']) ?? 0;
  const gardenM2 = toNumber(raw['Kert (m2)'] ?? raw['Kert']) ?? 0;

  const priceFkFt = toNumber(raw['FK (mft)'] ?? raw['FK']) ?? null;
  const priceKkFt = toNumber(raw['KK (mft)'] ?? raw['KK']) ?? null;

  const emelet = toNumber(raw['Emelet']) ?? null; // 0 = földszint
  const available = normalizeBoolHU(raw['Elérhető'] ?? raw['Elerheto']);

  const tajolas = (raw['Tájolás'] ?? raw['Tajolas'] ?? '').toString().trim();

  const hasBalcony = (balconyM2 ?? 0) > 0;
  const hasGarden = (gardenM2 ?? 0) > 0 && (emelet === 0 || emelet === '0');

  return {
    id,
    slug,
    m2,
    balconyM2: balconyM2 ?? 0,
    gardenM2: hasGarden ? (gardenM2 ?? 0) : 0,
    priceFkFt,
    priceKkFt,
    emelet,
    available,
    tajolas,
    hasBalcony,
    hasGarden,
  };
}

export function formatMft(ft) {
  if (ft == null) return '—';
  const mft = ft / 1_000_000;
  // 1 tizedes, de ha egész, akkor 0 tizedes
  const rounded = Math.round(mft * 10) / 10;
  const str = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1).replace('.', ',');
  return `${str} M Ft`;
}

export function floorLabel(emelet) {
  if (emelet === 0) return 'Földszint';
  if (emelet == null) return '';
  return `${emelet}. emelet`;
}

export async function getUnitsFromCsvUrl(url) {
  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) throw new Error(`CSV fetch failed: ${res.status}`);
  const csvText = await res.text();
  const objs = csvToObjects(csvText);
  return objs.map(normalizeUnit).filter(u => u.id);
}

export function getUnitsStats(units) {
  const available = units.filter(u => u.available === true);
  const m2s = available.map(u => u.m2).filter(n => typeof n === 'number');
  const prices = available.map(u => u.priceKkFt ?? u.priceFkFt).filter(n => typeof n === 'number');
  return {
    total: units.length,
    available: available.length,
    m2Min: m2s.length ? Math.min(...m2s) : 0,
    m2Max: m2s.length ? Math.max(...m2s) : 0,
    priceMinMft: prices.length ? Math.floor(Math.min(...prices) / 1_000_000) : 0,
    priceMaxMft: prices.length ? Math.ceil(Math.max(...prices) / 1_000_000) : 0,
  };
}

export function applyFilters(units, filters) {
  const minM2 = filters.minM2 ?? null;
  const maxM2 = filters.maxM2 ?? null;
  const minPriceMft = filters.minPriceMft ?? null;
  const maxPriceMft = filters.maxPriceMft ?? null;

  return units.filter((u) => {

    if (filters.onlyAvailable === true && u.available === false) return false;

    if (filters.floor != null) {
      if (u.emelet !== filters.floor) return false;
    }

    if (filters.hasGarden && !u.hasGarden) return false;
    if (filters.hasBalcony && !u.hasBalcony) return false;

    if (filters.tajolas && u.tajolas) {
      if (u.tajolas.toLowerCase() !== String(filters.tajolas).toLowerCase()) return false;
    } else if (filters.tajolas) {
      return false;
    }

    if (minM2 != null && u.m2 != null && u.m2 < minM2) return false;
    if (maxM2 != null && u.m2 != null && u.m2 > maxM2) return false;

    const priceFt = u.priceKkFt ?? u.priceFkFt;
    if (priceFt != null) {
      const priceMft = priceFt / 1_000_000;
      if (minPriceMft != null && priceMft < minPriceMft) return false;
      if (maxPriceMft != null && priceMft > maxPriceMft) return false;
    } else {
      // if user filters by price but unit has no price, hide it
      if (minPriceMft != null || maxPriceMft != null) return false;
    }

    return true;
  });
}


export async function getAllUnits() {
  const url = process.env.UNITS_CSV_URL || (process.env.NEXT_PUBLIC_UNITS_CSV_URL ?? '');
  const finalUrl = url || (process.env.SITE_URL ? `${process.env.SITE_URL}/units.csv` : 'http://localhost:3000/units.csv');
  // In production, SITE_URL should be set; fallback still works locally.
  return await getUnitsFromCsvUrl(finalUrl);
}
