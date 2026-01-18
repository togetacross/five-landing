import styles from './Footer.module.css';

export default function Footer() {
  return (
    /* ====== FOOTER JSX (3 sor) – ezt másold be ====== */

    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* 1. sor: Kapcsolat */}
        <div className={styles.contactWrap}>
          <div className={styles.contactTitle}>Kapcsolat</div>

          <div className={styles.contact}>
            <a
              className={`${styles.contactItem} ${styles.phoneCard}`}
              href="tel:+36703720113"
              aria-label="Telefon"
            >
              <span className={styles.contactIcon} aria-hidden="true">
                <img
                  src="/icons/whatsapp.png"
                  alt=""
                  className={styles.contactIconImg}
                />
              </span>
              <span className={styles.contactText}>+36 70 372 0113</span>
            </a>

            <a
              className={`${styles.contactItem} ${styles.mailCard}`}
              href="mailto:szidonia.molnar@oh.hu"
              aria-label="Email"
            >
              <span className={styles.contactIcon} aria-hidden="true">
                 <span className={styles.contactIcon} aria-hidden="true">
                <img
                  src="/icons/email.png"
                  alt=""
                  className={styles.contactIconImg}
                />
              </span>
              </span>
              <span className={styles.contactText}>szidonia.molnar@oh.hu</span>
            </a>
          </div>
        </div>

        {/* 2. sor: Linkek */}
        <div className={styles.footerLinks}>
          <a
            className={styles.footerLink}
            href="/files/Adatkezelesi_es_suti_tajekoztato.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Adatkezelési és süti tájékoztató
          </a>
        </div>

        {/* 3. sor: Copyright */}
        <div className={styles.footerCopy}>
          © {new Date().getFullYear()} FIVE° Projekt
        </div>
      </div>
    </footer>


  );
}
