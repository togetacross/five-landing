'use client';

import { useEffect, useMemo, useState } from 'react';
import UnitsGrid from './UnitGrid.js';
import Spinner from './Spinner.js';
import styles from './UnitsLoader.module.css';

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
  if (filters.onlyAvailable) p.set('elerheto', 'true');
  return p.toString();
}

export default function UnitsLoader({ initialFilters }) {
  const [units, setUnits] = useState(null);
  const [error, setError] = useState(null);

  const qs = useMemo(() => buildQuery(initialFilters || {}), [initialFilters]);

  useEffect(() => {
    let mounted = true;
    setUnits(null);
    setError(null);

    fetch(`/api/units?${qs}`)
      .then((r) => {
        if (!r.ok) throw new Error('Fetch failed');
        return r.json();
      })
      .then((data) => {
        if (!mounted) return;
        setUnits(data || []);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || 'Error');
        setUnits([]);
      });

    return () => {
      mounted = false;
    };
  }, [qs]);


  if (!units) {
    return (
      <div className={styles.unitsGrid}>
        {error && (
          <div>
            <h3>Hiba a lakások betöltésekor!</h3>
            <p>{error}</p>
          </div>
        )}
        {!units && (
          <div className={`${styles.card} ${styles.loadingItem}`}>
            <Spinner />
          </div>
        )}
      </div>
    );
  } else {
    return <UnitsGrid units={units} />;
  }

}
