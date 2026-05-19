import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

const schemaPath = path.resolve(__dirname, '..', '..', 'db', 'schema.sql');
const seedPath   = path.resolve(__dirname, '..', '..', 'db', 'seed.sql');

async function run() {
  console.log('Conectando em', `${process.env.DB_HOST}:${process.env.DB_PORT}`, 'como', process.env.DB_USER);
  console.log('schema.sql ->', schemaPath, 'existe?', fs.existsSync(schemaPath));
  console.log('seed.sql   ->', seedPath,   'existe?', fs.existsSync(seedPath));

  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
    charset: 'utf8mb4',
  });
  console.log('Conexão OK.');

  console.log('Rodando schema.sql ...');
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');
  await conn.query(schemaSql);
  console.log('  OK: banco e tabelas criados.');

  console.log('Rodando seed.sql ...');
  const seedSql = fs.readFileSync(seedPath, 'utf8');
  await conn.query(seedSql);
  console.log('  OK: dados de exemplo inseridos.');

  await conn.query('USE uc_preciso');
  const [[{ total: ucs }]]    = await conn.query('SELECT COUNT(*) AS total FROM unidade_conservacao');
  const [[{ total: instit }]] = await conn.query('SELECT COUNT(*) AS total FROM instituicao');
  const [[{ total: mun }]]    = await conn.query('SELECT COUNT(*) AS total FROM municipio');
  const [[{ total: com }]]    = await conn.query('SELECT COUNT(*) AS total FROM comunicacao');

  console.log('--- Resumo ---');
  console.log(`  instituicoes:          ${instit}`);
  console.log(`  municipios:            ${mun}`);
  console.log(`  unidades_conservacao:  ${ucs}`);
  console.log(`  comunicacoes:          ${com}`);

  await conn.end();
  console.log('Pronto. Banco uc_preciso criado e populado.');
}

run().catch((err) => {
  console.error('=== ERRO DETALHADO ===');
  console.error('name:    ', err && err.name);
  console.error('message: ', err && err.message);
  console.error('code:    ', err && err.code);
  console.error('errno:   ', err && err.errno);
  console.error('sqlState:', err && err.sqlState);
  console.error('sqlMessage:', err && err.sqlMessage);
  console.error('stack:');
  console.error(err && err.stack);
  console.error('object completo:');
  console.error(err);
  process.exit(1);
});
