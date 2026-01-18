'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DoubleRange from '../components/DoubleRange.js';
import QuickFilters from '../components/filters/QuickFilters.js';
import Extras from '../components/filters/Extras.js';
import OrientationSelect from '../components/filters/OrientationSelect.js';
import Actions from '../components/filters/Actions.js';

function parseBool(v) {
  if (v == null) return false;
  return v === true || v === '1' || v === 'true';
}

function parseNumber(v) {
  if (v == null || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function buildQuery(filters) {
  const p = new URLSearchParams();
  if (filters.floor != null) p.set('emelet', String(filters.floor));
  if (filters.minM2 != null) p.set('minM2', String(filters.minM2));
  if (filters.maxM2 != null) p.set('maxM2', String(filters.maxM2));
  if (filters.minPriceMft != null) p.set('minAr', String(filters.minPriceMft));
  if (filters.maxPriceMft != null) p.set('maxAr', String(filters.maxPriceMft));
  if (filters.hasGarden) p.set('kert', '1');
  if (filters.hasBalcony) p.set('erkely', '1');
  if (filters.tajolas) p.set('tajolas', filters.tajolas);

  // only when user wants to show ONLY available
  if (filters.onlyAvailable) p.set('elerheto', 'true');
  else p.delete('elerheto');

  return p.toString();
}

function useInitialFromUrl(stats, initialFilters) {
  const sp = useSearchParams();

  return useMemo(() => {
    const floor = sp.get('emelet');
    const minM2 = sp.get('minM2');
    const maxM2 = sp.get('maxM2');
    const minAr = sp.get('minAr');
    const maxAr = sp.get('maxAr');
    const kert = sp.get('kert');
    const erkely = sp.get('erkely');
    const tajolas = sp.get('tajolas');
    const elerheto = sp.get('elerheto');

    return {
      floor: floor != null && floor !== '' ? Number(floor) : (initialFilters.floor ?? null),

      minM2: parseNumber(minM2) ?? initialFilters.minM2 ?? Math.floor(stats.m2Min),
      maxM2: parseNumber(maxM2) ?? initialFilters.maxM2 ?? Math.ceil(stats.m2Max),

      minPriceMft: parseNumber(minAr) ?? initialFilters.minPriceMft ?? stats.priceMinMft,
      maxPriceMft: parseNumber(maxAr) ?? initialFilters.maxPriceMft ?? stats.priceMaxMft,

      hasGarden: parseBool(kert) || initialFilters.hasGarden || false,
      hasBalcony: parseBool(erkely) || initialFilters.hasBalcony || false,

      tajolas: (tajolas ?? initialFilters.tajolas ?? '').toString(),

      // default: false -> show all units (available + not available)
      onlyAvailable: parseBool(elerheto) || initialFilters.onlyAvailable || false,
    };
  }, [
    sp,
    stats.m2Min,
    stats.m2Max,
    stats.priceMinMft,
    stats.priceMaxMft,
    initialFilters,
  ]);
}

export default function FiltersClient({ initialFilters, stats, orientations }) {
  const router = useRouter();
  const filters0 = useInitialFromUrl(stats, initialFilters);
  const [draft, setDraft] = useState(filters0);

  // keep UI in sync when URL changes (back/forward or shared links)
  useEffect(() => {
    setDraft(filters0);
  }, [
    filters0.floor,
    filters0.hasGarden,
    filters0.hasBalcony,
    filters0.tajolas,
    filters0.minM2,
    filters0.maxM2,
    filters0.minPriceMft,
    filters0.maxPriceMft,
    filters0.onlyAvailable,
  ]);

  const isDirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(filters0),
    [draft, filters0]
  );

  function pushUrl(next) {
    const qs = buildQuery(next);
    router.replace(qs ? `/lakasok?${qs}` : '/lakasok', { scroll: false });
  }

  function setFloor(floor) {
    setDraft({ ...draft, floor });
  }

  function toggle(key) {
    const next = { ...draft, [key]: !draft[key] };
    // kert csak földszinthez értelmezett → ha emelet != 0, kikapcsoljuk
    if (key === 'hasGarden' && next.floor != null && next.floor !== 0) next.hasGarden = false;
    setDraft(next);
  }

  function changeTajolas(v) {
    setDraft({ ...draft, tajolas: v });
  }

  return (
    <div>
      <QuickFilters draft={draft} setFloor={setFloor} />

      <DoubleRange
        min={stats.priceMinMft}
        max={stats.priceMaxMft}
        step={1}
        valueMin={draft.minPriceMft}
        valueMax={draft.maxPriceMft}
        onChange={({ min, max }) => setDraft({ ...draft, minPriceMft: min, maxPriceMft: max })}
        label="Ár (M Ft)"
        format={(v) => `${v} M`}
      />

      <DoubleRange
        min={Math.floor(stats.m2Min)}
        max={Math.ceil(stats.m2Max)}
        step={1}
        valueMin={draft.minM2}
        valueMax={draft.maxM2}
        onChange={({ min, max }) => setDraft({ ...draft, minM2: min, maxM2: max })}
        label="Méret (m²)"
        format={(v) => `${v} m²`}
      />

      <Extras draft={draft} toggle={toggle} setDraft={setDraft} />
      <OrientationSelect draft={draft} changeTajolas={changeTajolas} orientations={orientations} />
      <Actions isDirty={isDirty} pushUrl={pushUrl} draft={draft} />
    </div>
  );
}