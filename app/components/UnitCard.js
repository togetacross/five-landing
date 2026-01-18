import Link from "next/link";
import { formatMft, floorLabel } from "../../lib/units.js";
import styles from "./UnitCard.module.css";

export default function UnitCard({ unit }) {
  return (
    <article className={`card ${styles.unitCard}`}>
      <div className={styles.unitTop}>
        <div className={styles.unitMeta}>
          <div>
            <div className={styles.unitTitle}>{unit.id}</div>
            <div className={styles.muted}>
              {floorLabel(unit.emelet)}
            </div>
          </div>

          <span
            className={`${styles.badge} ${unit.available ? styles.available : styles.unavailable
              }`}
          >
            {unit.available ? "Elérhető" : "Eladva"}
          </span>
        </div>

        <div className={styles.unitDetails}>
          <div>
            <span>Alapterület</span>
            <div>
              <b>{unit.m2?.toFixed?.(2)?.replace(".", ",") ?? unit.m2}</b>
              {unit.m2 && <small> m²</small>}
            </div>
          </div>

          <div>
            <span>Erkély</span>
            <div>
              <b>
                {unit.hasBalcony
                  ? unit.balconyM2.toFixed(2).replace(".", ",")
                  : "—"}
              </b>
              {unit.hasBalcony && <small> m²</small>}
            </div>
          </div>

          <div>
            <span>Kert</span>
            <div>
              <b>
                {unit.hasGarden
                  ? unit.gardenM2.toFixed(2).replace(".", ",")
                  : "—"}
              </b>
              {unit.hasGarden && <small> m²</small>}
            </div>
          </div>

          <div>
            <span>Összesen</span>
            <div>
            <b>
              {unit.totalM2 != null
                ? `${Number(unit.totalM2).toFixed(2).replace(".", ",")}`
                : "—"}
            </b>
            {unit.totalM2 && <small> m²</small>}
                </div>
          </div>
          <div>
            <span>Szoba</span>
            <b>{unit.roomsLabel || "—"}</b>
          </div>
          <div>
            <span>Tájolás</span>
            <b>{unit.tajolas || "—"}</b>
          </div>

        </div>
      </div>

      <div className={styles.unitImg}>
        <div
          className={styles.heroImg}
          role="img"
          aria-label={`${unit.id} látványkép`}
        >
          <img src="/imgs/latvany1.jpg" alt={`${unit.id} látványkép`} />
          <div className={styles.heroMask} />
          <div className={styles.heroId}>{unit.id}</div>
        </div>
      </div>

      <div className={styles.unitActions}>
        <div>
          <div className={styles.muted} style={{ fontSize: ".9rem" }}>
            Kulcsrakész ár
          </div>
          <div>{formatMft(unit?.priceKkFt)}</div>
        </div>
        <div className={styles.row}>
          <Link className="btn primary" href={`/lakas/${unit.slug}`}>
            Részletek
          </Link>
        </div>
      </div>
    </article>
  );
}
