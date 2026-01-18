import { NextResponse } from 'next/server';
import { getAllUnits, applyFilters } from '../../../lib/units.js';

function spNumber(v) {
  if (v == null || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const sp = url.searchParams;

    const filters = {
      floor: sp.has('emelet') && sp.get('emelet') !== '' ? Number(sp.get('emelet')) : null,
      minM2: spNumber(sp.get('minM2')),
      maxM2: spNumber(sp.get('maxM2')),
      minPriceMft: spNumber(sp.get('minAr')),
      maxPriceMft: spNumber(sp.get('maxAr')),
      hasGarden: sp.get('kert') === '1' || sp.get('kert') === 'true',
      hasBalcony: sp.get('erkely') === '1' || sp.get('erkely') === 'true',
      tajolas: sp.get('tajolas') || '',
      onlyAvailable: sp.get('elerheto') === 'true',
    };

    const units = await getAllUnits();
    const filtered = applyFilters(units, filters);

    return NextResponse.json(filtered, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
