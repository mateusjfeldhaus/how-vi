import { Link } from 'react-router-dom';
import styles from './UCCard.module.css';

function formatarData(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('pt-BR');
}

export default function UCCard({ unidade }) {
  return (
    <Link to={`/unidades/${unidade.id}`} className={styles.card}>
      {unidade.imagem ? (
        <img src={unidade.imagem} alt={unidade.nome} className={styles.image} />
      ) : (
        <div className={styles.imagePlaceholder} aria-hidden="true">🌲</div>
      )}
      <div className={styles.body}>
        <h3 className={styles.title}>{unidade.nome}</h3>
        <p className={styles.meta}>📍 {unidade.municipios || '—'}</p>
        <p className={styles.meta}>📅 Criada em {formatarData(unidade.data_criacao)}</p>
        <span className={styles.cta}>Ver detalhes →</span>
      </div>
    </Link>
  );
}