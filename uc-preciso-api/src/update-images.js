import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

const novasImagens = [
  { id: 1, url: 'https://www.cidadeecultura.com/wp-content/uploads/2016/08/Itatiaia-Meio-Ambiente-Parque-Nacional-pico-Ricardo-Martins-bx-1024x682-1.jpg' },
  { id: 2, url: 'https://cdn-clubecandeias.s3.sa-east-1.amazonaws.com/uploads/images/canion-fortaleza-parque-nacional-aparados-da-serra-parques-nacionais-cambara-do-sul-rs-clube-candeias.jpeg' },
  { id: 3, url: 'https://blog.biofaces.com/wp-content/uploads/2020/09/WhatsApp-Image-2020-09-10-at-10.28.10-1123x635.jpeg' },
  { id: 4, url: 'https://acdmin.com.br/wp-content/uploads/2024/03/IMG_BLOG_-_GTU_23-1024x576.webp' },
];

async function run() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'uc_preciso',
    charset: 'utf8mb4',
  });

  for (const { id, url } of novasImagens) {
    await conn.query('UPDATE unidade_conservacao SET imagem = ? WHERE id = ?', [url, id]);
    console.log(`UC #${id} atualizada -> ${url.slice(0, 80)}...`);
  }

  const [rows] = await conn.query('SELECT id, nome, imagem FROM unidade_conservacao ORDER BY id');
  console.log('\n--- estado atual ---');
  for (const r of rows) console.log(`#${r.id} ${r.nome}\n   ${r.imagem}`);

  await conn.end();
  console.log('\nPronto.');
}

run().catch((err) => {
  console.error('Falhou:', err);
  process.exit(1);
});
