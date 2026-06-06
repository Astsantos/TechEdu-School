import { Router } from 'express';
import * as cursoController from '../controllers/cursoController';
import { uploadFile } from '../middleware/upload';
import { validateCurso } from '../middleware/validateCurso';

const router = Router();

router.post(
  '/cursos',
  uploadFile,       // handles file upload
  validateCurso,    // validates text fields and file existence
  cursoController.createCurso
);

router.get('/cursos/:id', cursoController.getCursoById);

export default router;