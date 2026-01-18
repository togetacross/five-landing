// DoubleRange.js
import { useState } from 'react';
import styles from './DoubleRange.module.css';

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

export default function DoubleRange({
  min,
  max,
  step = 1,
  valueMin,
  valueMax,
  onChange,
  label,
  format = (v) => v,
}) {
  const [active, setActive] = useState(null); // 'min' | 'max' | null

  const minVal = clamp(valueMin ?? min, min, max);
  const maxVal = clamp(valueMax ?? max, min, max);

  const leftPct = ((minVal - min) / (max - min)) * 100;
  const rightPct = ((maxVal - min) / (max - min)) * 100;

  function setMin(v) {
    const clamped = clamp(v, min, max);
    const nextMin = Math.min(clamped, maxVal - step);
    onChange({ min: nextMin, max: maxVal });
  }

  function setMax(v) {
    const clamped = clamp(v, min, max);
    const nextMax = Math.max(clamped, minVal + step);
    onChange({ min: minVal, max: nextMax });
  }

  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>

      <div className={styles.rangeWrap}>
        <div className={styles.rangeValues}>
          <span>{format(minVal)}</span>
          <span>{format(maxVal)}</span>
        </div>

        <div className={styles.rangeTrack}>
          <div
            className={styles.fill}
            style={{ left: `${leftPct}%`, width: `${rightPct - leftPct}%` }}
          />

          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={minVal}
            className={styles.rangeInput}
            style={{ zIndex: active === 'min' ? 2 : 1 }}
            onPointerDown={() => setActive('min')}
            onPointerUp={() => setActive(null)}
            onPointerCancel={() => setActive(null)}
            onChange={(e) => setMin(Number(e.target.value))}
            aria-label={`${label} minimum`}
          />

          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={maxVal}
            className={styles.rangeInput}
            style={{ zIndex: active === 'max' ? 2 : 1 }}
            onPointerDown={() => setActive('max')}
            onPointerUp={() => setActive(null)}
            onPointerCancel={() => setActive(null)}
            onChange={(e) => setMax(Number(e.target.value))}
            aria-label={`${label} maximum`}
          />
        </div>
      </div>
    </div>
  );
}
