import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/client.js';
import styles from './NovaComunicacao.module.css';

export default function NovaComunicacao() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [unidade, setUnidade] = useState(null);
  const [form, setForm] = useState({ titulo: '', email: '', descricao: '' });
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    api.obterUnidade(id).then(setUnidade).catch((e) => setErro(e.message));
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setEnviando(true);
    setErro(null);
    try {
      await api.criarComunicacao({ ...form, unidade_id: Number(id) });
      navigate(`/unidades/${id}`);
    } catch (e) {
      setErro(e.message);
      setEnviando(false);
    }
  }

  return (
    <section>
      <Link to={`/unidades/${id}`} className={styles.voltar}>
        ← Voltar para {unidade?.nome || 'a unidade'}
      </Link>

      <form onSubmit={handleSubmit} className={styles.card}>
        <h1 className={styles.titulo}>Nova comunicação</h1>
        <p className={styles.subtitulo}>
          Sua mensagem será encaminhada aos administradores responsáveis
          {unidade ? ` pelo ${unidade.nome}` : ''}.
        </p>

        <label className={styles.label}>
          Unidade de conservação
          <input
            type="text"
            value={unidade?.nome || 'Carregando…'}
            disabled
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Título da comunicação *
          <input
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            required
            maxLength={200}
            placeholder="Ex.: Trilha bloqueada por queda de árvore"
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Seu e-mail *
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="seu.email@exemplo.com"
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Descrição detalhada *
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            required
            rows={6}
            placeholder="Descreva com detalhes a ocorrência, sugestão ou denúncia…"
            className={styles.textarea}
          />
        </label>

        <div className={styles.aviso}>
          ℹ A data e hora do envio serão registradas automaticamente. O status inicial será “em análise”.
        </div>

        {erro && <p className={styles.erro}>Erro ao enviar: {erro}</p>}

        <div className={styles.acoes}>
          <Link to={`/unidades/${id}`} className={styles.btnSecundario}>Cancelar</Link>
          <button type="submit" disabled={enviando} className={styles.btnPrimario}>
            {enviando ? 'Enviando…' : '✈ Enviar comunicação'}
          </button>
        </div>
      </form>
    </section>
  );
}