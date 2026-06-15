import { Router } from 'express';
import { enviarMensagem, obterHistoricoChat } from '../controllers/chatController';
import { autenticarToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/', autenticarToken, enviarMensagem);
router.get('/historico', autenticarToken, obterHistoricoChat);

export default router;