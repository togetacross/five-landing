// units.js
import { csvToObjects } from './csv.js';

function pick(raw, keys) {
  for (const k of keys) {
    if (k == null) continue;
    const v = raw[k];
    if (v != null && String(v).trim() !== '') return v;
  }
  return '';
}

function toNumber(value) {
  const v = String(value ?? '')
    .replace(/\s/g, '')
    .replace(/,/g, '.')
    .replace(/[^0-9.\-]/g, '');
  if (v === '' || v === '-' || v === '.') return null;
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

function romanToInt(str) {
  const s = String(str ?? '').trim().toUpperCase();
  if (!s) return null;
  // basic roman numerals up to e.g. XX
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100 };
  if (!/^[IVXLC]+$/.test(s)) return null;
  let total = 0;
  let prev = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    const cur = map[s[i]];
    if (cur < prev) total -= cur;
    else total += cur;
    prev = cur;
  }
  return total || null;
}

function parseFloor(value) {
  const v = String(value ?? '').trim();
  if (!v) return null;
  // numeric (e.g. 0, 1, 2)
  const n = toNumber(v);
  if (n != null) return n;
  // common Hungarian shorthands
  const up = v.toUpperCase();
  if (['F', 'FSZ', 'FÖLDSZINT', 'FOLDSZINT', 'GROUND', 'G'].includes(up)) return 0;
  // roman numerals (e.g. I, II, III)
  const r = romanToInt(up);
  if (r != null) return r;
  return null;
}

/**
 * CSV headers (HU):
 * Lakás, m2, Erkély (m2), Kert (m2), FK (mft), KK (mft), Emelet, Elérhető, Tájolás
 *
 * Új CSV mapping (példa export):
 * Lakás szám -> Lakás
 * ALAPTERÜLET -> m2
 * Terasz/erkély (vagy Terasz / Erkély) -> Erkély (m2)
 * Lakás tájolása -> Tájolás
 * Elérhető -> Elérhető
 * Fűtéskész ár -> FK (mft)
 * Kulcsrakész ár / Kulcsarész ár -> KK (mft)
 * Szint -> Emelet
 *
 * NOTE: FK/KK oszlopok Ft-ban vannak a táblában (pl. 53 660 000),
 * a UI viszont M Ft-ban szűr és megjelenít.
 */
export function normalizeUnit(raw) {
  const id = (
    pick(raw, ['Lakás', 'Lakas', 'Lakás szám', 'Lakas szam', 'Lakás szám ', 'Lakás_szám']) ||
    raw.id ||
    raw.ID ||
    ''
  ).toString().trim();
  const slug = id.toLowerCase();

  const m2 = toNumber(pick(raw, ['m2', 'ALAPTERÜLET', 'Alapterulet', 'ALAP TERÜLET', 'Alap terulet']));
  const balconyM2 =
    toNumber(
      pick(raw, [
        'Erkély (m2)',
        'Erkely (m2)',
        'Erkély',
        'Erkely',
        'Terasz / Erkély',
        'Terasz/Erkély',
        'Terasz/erkély',
        'Terasz/erkely',
        // a feltöltött fájlban ez a fejléc szerepel (elgépeléssel)
        'Terasz/erkéy',
      ])
    ) ?? 0;
  const gardenM2 = toNumber(pick(raw, ['Kert (m2)', 'Kert', 'Kertkapcsolat (m2)'])) ?? 0;

  const priceFkFt =
    toNumber(pick(raw, ['FK (mft)', 'FK', 'Fűtéskész', 'Fűtéskész ár', 'Futeskesz', 'Futeskesz ar'])) ?? null;
  const priceKkFt =
    toNumber(
      pick(raw, [
        'KK (mft)',
        'KK',
        'Kulcsrakész ár',
        'Kulcsrakesz ar',
        // néhány exportban elgépelve:
        'Kulcsarész ár',
        'Kulcsaresz ar',
      ])
    ) ?? null;

  const emelet =
    parseFloor(pick(raw, ['Emelet', 'Szint', 'Szint ', 'Szint (emelet)'])) ??
    null; // 0 = földszint
  const available = normalizeBoolHU(pick(raw, ['Elérhető', 'Elerheto', 'Elérhetö']));

  const tajolas = pick(raw, ['Tájolás', 'Tajolas', 'Lakás tájolása', 'Lakas tajolasa']).toString().trim();

  // Új oszlopok (add hozzá a végleges objektumhoz) — kivéve Bo kód
  const groupLabel = pick(raw, ['__col0']).toString().trim();
  const roomsLabel = pick(raw, ['Szoba szám', 'Szobaszám', 'Szobaszam']).toString().trim();
  const totalM2 = toNumber(pick(raw, ['Összesen', 'Osszesen', 'Összesen (m2)'])) ?? null;
  const pricePerM2Ft = toNumber(pick(raw, ['m2 Ár', 'm2 Ar', 'm² Ár', 'm² Ar'])) ?? null;
  const priceKulcsreszFt = toNumber(pick(raw, ['Kulcsarész ár', 'Kulcsaresz ar', 'Kulcsrész ár'])) ?? null;
  const kertkapcsolat = normalizeBoolHU(pick(raw, ['Kertkapcsolat', 'Kert kapcsolat']));

  const hasBalcony = (balconyM2 ?? 0) > 0;
  const hasGarden = ((gardenM2 ?? 0) > 0 || kertkapcsolat === true) && emelet === 0;

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

    // Új mezők (Bo kód kivételével)
    groupLabel,
    roomsLabel,
    totalM2,
    pricePerM2Ft,
    priceKulcsreszFt,
    kertkapcsolat,
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
/*
export async function getAllUnits() {
  const url = process.env.UNITS_CSV_URL || (process.env.NEXT_PUBLIC_UNITS_CSV_URL ?? '');
  const finalUrl = url || (process.env.SITE_URL ? `${process.env.SITE_URL}/units.csv` : 'http://localhost:3000/units.csv');
  return await getUnitsFromCsvUrl(finalUrl);
}*/

export async function getAllUnits() {
  const url = process.env.UNITS_CSV_URL || process.env.NEXT_PUBLIC_UNITS_CSV_URL;

  if (!url) {
    throw new Error('Link nem elérhető!');
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    throw new Error('Link nem elérhető!');
  }

  const finalUrl = url.startsWith('/')
    ? new URL(url, siteUrl).toString()
    : url;

  return await getUnitsFromCsvUrl(finalUrl);
}


