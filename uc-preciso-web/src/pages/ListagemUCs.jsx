import { useEffect, useState } from 'react';
import { api } from '../api/client.js';
import UCCard from '../components/UCCard.jsx';
import styles from './ListagemUCs.module.css';

export default function ListagemUCs() {
  const [unidades, setUnidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    api.listarUnidades()
      .then(setUnidades)
      .catch((e) => setErro(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h1 className={styles.titulo}>Unidades de Conservação</h1>
      <p className={styles.subtitulo}>
        Conheça as unidades administradas pelo IMA na zona costeira e interior catarinense.
        Clique em uma unidade para ver detalhes e enviar uma comunicação.
      </p>

      {loading && <p className={styles.estado}>Carregando…</p>}
      {erro && <p className={styles.erro}>Erro ao carregar: {erro}</p>}

      {!loading && !erro && (
        <div className={styles.grid}>
          {unidades.map((uc) => <UCCard key={uc.id} unidade={uc} />)}
        </div>
      )}
    </section>
  );
}