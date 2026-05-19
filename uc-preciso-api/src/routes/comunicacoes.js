import { Router } from 'express';
import { criarComunicacao } from '../controllers/comunicacoesController.js';

const router = Router();

router.post('/', criarComunicacao);

export default router;