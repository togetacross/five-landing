import styles from './Extras.module.css';

export default function Extras({ draft, toggle, setDraft }) {
  const gardenDisabled = draft.floor != null && draft.floor !== 0;

  return (
    <div className={styles.field}>
      <div className={styles.wrap}>
        <label className={styles.option} htmlFor="chkOnlyAvailable">
          <input
            id="chkOnlyAvailable"
            type="checkbox"
            checked={!!draft.onlyAvailable}
            onChange={() =>
              setDraft({ ...draft, onlyAvailable: !draft.onlyAvailable })
            }
          />
          <span className={styles.box} />
          <span className={styles.text}>Elérhető</span>
        </label>

        <label
          className={`${styles.option} ${
            gardenDisabled ? styles.optionDisabled : ''
          }`}
          htmlFor="chkGarden"
        >
          <input
            id="chkGarden"
            type="checkbox"
            checked={!!draft.hasGarden}
            onChange={() => toggle('hasGarden')}
            disabled={gardenDisabled}
          />
          <span className={styles.box} />
          <span className={styles.text}>Kert</span>
        </label>

        <label className={styles.option} htmlFor="chkBalcony">
          <input
            id="chkBalcony"
            type="checkbox"
            checked={!!draft.hasBalcony}
            onChange={() => toggle('hasBalcony')}
          />
          <span className={styles.box} />
          <span className={styles.text}>Erkély</span>
        </label>
      </div>

      {gardenDisabled && (
        <div className={styles.note}>
          Kert csak földszinti lakásoknál elérhető.
        </div>
      )}
    </div>
  );
}
