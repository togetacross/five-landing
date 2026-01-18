import style from './Actions.module.css';

export default function Actions({ isDirty, pushUrl, draft }) {
  return (
    <div className={style.container}>
      {isDirty && (
        <div className={style.muted} style={{ fontSize: '.9rem', marginBottom: '0.5rem' }}>
          A szűrők módosultak. Kattints a <b>Keresés</b>-re.
        </div>
      )}

      <div className={style.row}>
        <button className={`${style.btn} ${style.btnPrimary}`} onClick={() => pushUrl(draft)}>
          Keresés
        </button>
      </div>
    </div>
  );
}
