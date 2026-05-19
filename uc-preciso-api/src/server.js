import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import unidadesRoutes from './routes/unidades.js';
import comunicacoesRoutes from './routes/comunicacoes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Carrega .env do diretório atual e, em fallback, da raiz do projeto (../../.env)
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ ok: true, service: 'uc-preciso-api' });
});

app.use('/api/unidades', unidadesRoutes);
app.use('/api/comunicacoes', comunicacoesRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'erro interno' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
