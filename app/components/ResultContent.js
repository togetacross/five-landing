import FiltersClient from '../lakasok/FiltersClient.js';
import UnitsLoader from './UnitsLoader.js';
import styles from './ResultContent.module.css';

export default function ResultContent({ stats, filters, orientations, filteredCount }) {
  return (
    <div className={styles.stack}>
      <div className={styles.row}>
        <div>
          <h1 className={styles.title} >Eladó lakások</h1>
          <div className={styles.priceInfo}>
            <p className={styles.muted}>
              A weboldalon feltüntetett kulcsrakész árak a Gold csomag aktuális tartalmán alapulnak,
              így az ajánlat a közzététel időpontjában érvényes csomagösszeállítást tükrözi.
            </p>
          </div>
          <p className={styles.muted}>
            Szűrés - Találatok:{' '}
            <b>{filteredCount}</b>
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        <aside className={styles.filters}>
          <div className={styles.card}>
            <FiltersClient
              initialFilters={filters}
              stats={stats}
              orientations={orientations}
            />
          </div>
        </aside>

        <section className={styles.results}>
          <UnitsLoader initialFilters={filters} />
        </section>
      </div>
    </div>
  );
}
