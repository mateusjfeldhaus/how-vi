import { Router } from 'express';
import {
  listarUnidades,
  obterUnidade,
  listarComunicacoesDaUnidade,
} from '../controllers/unidadesController.js';

const router = Router();

router.get('/', listarUnidades);
router.get('/:id', obterUnidade);
router.get('/:id/comunicacoes', listarComunicacoesDaUnidade);

export default router;