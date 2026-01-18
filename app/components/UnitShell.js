import styles from './UnitShell.module.css';
import Link from 'next/link';

export default function UnitShell({ unit, formatMft, floorLabel }) {
  if (!unit) {
    return (
      <div className={'card'}>
        <h1>Lakás nem található</h1>
        <p className={'muted'}>Ellenőrizd a linket, vagy nézd meg az összes lakást.</p>
        <Link className={'btn btnPrimary'} href="/lakasok">Vissza a listához</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>{unit.id}</h1>
          <p className={styles.muted}>{floorLabel(unit.emelet)}</p>
        </div>

        <span
          className={`${styles.badge} ${unit.available ? styles.available : styles.unavailable
            }`}
        >
          {unit.available ? "Elérhető" : "Eladva"}
        </span>
      </section>

      <section className={styles.grid}>
        <div className={styles.card}>
          <span>Alapterület</span>
          <b>{unit.m2?.toFixed(2).replace(".", ",") ?? "—"} m²</b>
        </div>

        <div className={styles.card}>
          <span>Erkély</span>
          <b>
            {unit.hasBalcony
              ? `${unit.balconyM2?.toFixed(2).replace(".", ",")} m²`
              : "—"}
          </b>
        </div>

        <div className={styles.card}>
          <span>Kert</span>
          <b>
            {unit.hasGarden
              ? `${unit.gardenM2?.toFixed(2).replace(".", ",")} m²`
              : "—"}
          </b>
        </div>

        <div className={styles.card}>
          <span>Összesen</span>
          <b>
            {unit.totalM2 != null
              ? `${Number(unit.totalM2).toFixed(2).replace(".", ",")} m²`
              : "—"}
          </b>
        </div>

        <div className={styles.card}>
          <span>Szobák</span>
          <b>{unit.roomsLabel ?? "—"}</b>
        </div>

        <div className={styles.card}>
          <span>Tájolás</span>
          <b>{unit.tajolas ?? "—"}</b>
        </div>
      </section>

      <section className={styles.priceBox}>
        <span className={styles.priceLabel}>Kulcsrakész ár</span>
        <b className={styles.priceValue}>
          {unit.priceKkFt ? `${unit.priceKkFt.toLocaleString("hu-HU")} M Ft` : "—"}
        </b>
        <p className={styles.priceHint}>
          Az ár tájékoztató jellegű. Pontos információért kérj ajánlatot.
        </p>
      </section>

      <div className={styles.footerRow}>
        <Link className={styles.backBtn} href="/lakasok">
          Összes lakás
        </Link>
      </div>
    </div>

  );
}
