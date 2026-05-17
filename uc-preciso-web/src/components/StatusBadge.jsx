import styles from './StatusBadge.module.css';

export default function StatusBadge({ status }) {
  const analisada = status === 1;
  return (
    <span className={`${styles.badge} ${analisada ? styles.success : styles.warning}`}>
      {analisada ? 'analisada' : 'em análise'}
    </span>
  );
}