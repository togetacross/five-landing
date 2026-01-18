import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container + ' row between'}>
        <div>© {new Date().getFullYear()} FIVE° Projekt</div>
        <div>Adatkezelési tájékoztató</div>
      </div>
    </footer>
  );
}
