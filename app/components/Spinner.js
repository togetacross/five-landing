'use client';
import style from './Spinner.module.css';

export default function Spinner({ label = 'Betöltés ...' }) {
  return (
    <div className={style.spinnerWrap} aria-busy="true" aria-live="polite">
      <div className={style.spinner} />
      <div className={style.spinnerLabel}>{label}</div>
    </div>
  );
}
