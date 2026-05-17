import StatusBadge from './StatusBadge.jsx';
import styles from './ComunicacaoItem.module.css';

function formatar(dt) {
  if (!dt) return '';
  const d = new Date(dt);
  const data = d.toLocaleDateString('pt-BR');
  const hora = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return `${data} ${hora}`;
}

export default function ComunicacaoItem({ comunicacao }) {
  return (
    <article className={styles.item}>
      <header className={styles.head}>
        <h4 className={styles.titulo}>{comunicacao.titulo}</h4>
        <StatusBadge status={comunicacao.status} />
      </header>
      <p className={styles.meta}>
        {comunicacao.email} · {formatar(comunicacao.data_envio)}
      </p>
      <p className={styles.descricao}>{comunicacao.descricao}</p>
    </article>
  );
}