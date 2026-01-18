import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.headerInner}`}>
        <Link className={styles.logo} href="/">
          {/*
          <span className={styles.logoMark} aria-hidden="true" />
          */}
          <span>FIVE° Projekt</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/lakasok">Lakások</Link>
        </nav>
      </div>
    </header>
  );
}
