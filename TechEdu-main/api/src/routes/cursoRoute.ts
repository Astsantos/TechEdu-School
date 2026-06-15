import { Router } from 'express';
import { obterDetalhesCurso, matricularNoCurso } from '../controllers/cursoController';
import { autenticarToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/:id', autenticarToken, obterDetalhesCurso);
router.post('/:id/matricular', autenticarToken, matricularNoCurso);

export default router;