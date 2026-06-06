import { Router } from 'express';
import * as usuarioController from '../controllers/usuarioController';

const router = Router();

router.post('/usuario', usuarioController.cadastrarUsuario);
router.post('/login', usuarioController.loginUsuario);

export default router;