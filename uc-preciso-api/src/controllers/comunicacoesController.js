import { pool } from '../db.js';

export async function criarComunicacao(req, res, next) {
  try {
    const { titulo, descricao, email, unidade_id } = req.body;

    if (!titulo || !descricao || !email || !unidade_id) {
      return res.status(400).json({
        error: 'Campos obrigatórios: titulo, descricao, email, unidade_id',
      });
    }

    const [result] = await pool.query(`
      INSERT INTO comunicacao (titulo, descricao, email, unidade_id, status)
      VALUES (?, ?, ?, ?, 0);
    `, [titulo, descricao, email, unidade_id]);

    res.status(201).json({
      id: result.insertId,
      titulo, descricao, email, unidade_id,
      status: 0,
      data_envio: new Date(),
    });
  } catch (err) { next(err); }
}