import styles from './OrientationSelect.module.css';

export default function OrientationSelect({ draft, changeTajolas, orientations }) {
  return (
    <div className={styles.field}>
      <label>Tájolás</label>
      <select
        value={draft.tajolas}
        onChange={(e) => changeTajolas(e.target.value)}
      >
        <option value="">Mind</option>
        {orientations.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
