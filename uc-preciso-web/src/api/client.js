const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  listarUnidades:    ()       => request('/unidades'),
  obterUnidade:      (id)     => request(`/unidades/${id}`),
  listarComunicacoes:(ucId)   => request(`/unidades/${ucId}/comunicacoes`),
  criarComunicacao:  (data)   => request('/comunicacoes', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};