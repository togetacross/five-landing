import styles from './QuickFilters.module.css';

export default function QuickFilters({ draft, setFloor }) {
  const current = draft?.floor ?? null; // null = Mind

  const isActive = (v) => (current ?? null) === (v ?? null);

  return (
    <div className={styles.field}>
      <label className={styles.label}>Keresés</label>

      <div className={styles.quickRow}>
        <button
          type="button"
          className={`${styles.pill} ${isActive(0) ? styles.active : ''}`}
          onClick={() => setFloor(0)}
        >
          Földszint
        </button>

        <button
          type="button"
          className={`${styles.pill} ${isActive(1) ? styles.active : ''}`}
          onClick={() => setFloor(1)}
        >
          1. emelet
        </button>

        <button
          type="button"
          className={`${styles.pill} ${isActive(2) ? styles.active : ''}`}
          onClick={() => setFloor(2)}
        >
          2. emelet
        </button>

        <button
          type="button"
          className={`${styles.pill} ${isActive(null) ? styles.active : ''}`}
          onClick={() => setFloor(null)}
        >
          Mind
        </button>
      </div>
    </div>
  );
}
