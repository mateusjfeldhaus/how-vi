import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api/client.js';
import ComunicacaoItem from '../components/ComunicacaoItem.jsx';
import styles from './DetalheUC.module.css';

function formatar(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('pt-BR');
}

export default function DetalheUC() {
  const { id } = useParams();
  const [unidade, setUnidade] = useState(null);
  const [comunicacoes, setComunicacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.obterUnidade(id),
      api.listarComunicacoes(id),
    ])
      .then(([uc, coms]) => { setUnidade(uc); setComunicacoes(coms); })
      .catch((e) => setErro(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Carregando…</p>;
  if (erro)    return <p className={styles.erro}>Erro: {erro}</p>;
  if (!unidade) return null;

  return (
    <section>
      <Link to="/" className={styles.voltar}>← Voltar para Unidades de Conservação</Link>

      <article className={styles.card}>
        {unidade.imagem
          ? <img src={unidade.imagem} alt={unidade.nome} className={styles.imagem} />
          : <div className={styles.imagemPh} aria-hidden="true">🌲</div>}

        <div className={styles.corpo}>
          <h1 className={styles.titulo}>{unidade.nome}</h1>
          <p className={styles.meta}>
            📍 {unidade.municipios || '—'} &nbsp;·&nbsp;
            📅 {formatar(unidade.data_criacao)} &nbsp;·&nbsp;
            🏛 {unidade.instituicao}
          </p>
          <p className={styles.descricao}>{unidade.descricao}</p>
        </div>
      </article>

      <header className={styles.secaoHead}>
        <h2 className={styles.secaoTitulo}>Comunicações enviadas</h2>
        <Link to={`/unidades/${id}/nova-comunicacao`} className={styles.btn}>
          + Nova comunicação
        </Link>
      </header>

      {comunicacoes.length === 0 && (
        <p className={styles.vazio}>Nenhuma comunicação registrada para esta unidade.</p>
      )}

      <div className={styles.lista}>
        {comunicacoes.map((c) => (
          <ComunicacaoItem key={c.id} comunicacao={c} />
        ))}
      </div>
    </section>
  );
}