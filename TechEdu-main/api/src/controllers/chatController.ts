import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import pool from '../config/conexao';

export const enviarMensagem = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.userId;
    const { message: mensagem } = req.body; // Adaptado para receber 'message' ou 'mensagem'

    if (!mensagem || mensagem.trim() === '') {
        res.status(400).json({ error: 'A mensagem não pode estar vazia.' });
        return;
    }

    try {
        await pool.query(
            'INSERT INTO mensagens_chat (user_id, mensagem, enviado_por) VALUES (?, ?, ?)',
            [userId, mensagem, 'usuario']
        );
        res.status(201).json({ message: 'Mensagem enviada com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao enviar mensagem.' });
    }
};

export const obterHistoricoChat = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.userId;

    try {
        const [rows] = await pool.query(
            'SELECT mensagem, enviado_por, data_envio FROM mensagens_chat WHERE user_id = ? ORDER BY data_envio ASC',
            [userId]
        );
        res.json({ historico: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao carregar histórico do chat.' });
    }
};