import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <span className={styles.logo} aria-hidden="true">🌳</span>
          <span>UC é Preciso</span>
        </Link>
        <nav className={styles.nav}>
          <Link to="/">Unidades</Link>
        </nav>
      </div>
    </header>
  );
}