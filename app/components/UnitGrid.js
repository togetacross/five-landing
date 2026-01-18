import UnitCard from './UnitCard.js';
import styles from './UnitGrid.module.css';

export default function UnitsGrid({ units }) {
  return (
    <div className={units.length ? styles.unitsGrid : undefined}>
      {units.map((u) => <UnitCard key={u.id} unit={u} />)}

      {!units.length && (
        <div className={styles.card}>
          <h3>Nincs találat</h3>
          <p className={styles.muted}>
            Próbáld lazítani a szűrőket, vagy válassz másik tájolást!
          </p>
        </div>
      )}
    </div>
  );
}
