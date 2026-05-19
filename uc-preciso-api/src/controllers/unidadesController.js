import { pool } from '../db.js';

export async function listarUnidades(_req, res, next) {
  try {
    const [rows] = await pool.query(`
      SELECT uc.id, uc.nome, uc.data_criacao, uc.descricao, uc.imagem,
             i.nome AS instituicao,
             GROUP_CONCAT(m.nome ORDER BY m.nome SEPARATOR ' · ') AS municipios
      FROM unidade_conservacao uc
      JOIN instituicao i ON i.id = uc.instituicao_id
      LEFT JOIN unidade_municipio um ON um.unidade_id = uc.id
      LEFT JOIN municipio m         ON m.id = um.municipio_id
      GROUP BY uc.id
      ORDER BY uc.nome;
    `);
    res.json(rows);
  } catch (err) { next(err); }
}

export async function obterUnidade(req, res, next) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(`
      SELECT uc.id, uc.nome, uc.data_criacao, uc.descricao, uc.imagem,
             i.nome AS instituicao,
             GROUP_CONCAT(m.nome ORDER BY m.nome SEPARATOR ' · ') AS municipios
      FROM unidade_conservacao uc
      JOIN instituicao i ON i.id = uc.instituicao_id
      LEFT JOIN unidade_municipio um ON um.unidade_id = uc.id
      LEFT JOIN municipio m         ON m.id = um.municipio_id
      WHERE uc.id = ?
      GROUP BY uc.id;
    `, [id]);

    if (rows.length === 0) return res.status(404).json({ error: 'UC não encontrada' });
    res.json(rows[0]);
  } catch (err) { next(err); }
}

export async function listarComunicacoesDaUnidade(req, res, next) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(`
      SELECT id, titulo, descricao, data_envio, email, status, unidade_id
      FROM comunicacao
      WHERE unidade_id = ?
      ORDER BY data_envio DESC;
    `, [id]);
    res.json(rows);
  } catch (err) { next(err); }
}