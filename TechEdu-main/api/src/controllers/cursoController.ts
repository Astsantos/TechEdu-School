import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import pool from '../config/conexao';

export const obterDetalhesCurso = async (req: AuthRequest, res: Response): Promise<void> => {
    const cursoId = req.params.id;
    const userId = req.userId;

    try {
        const [cursoRows]: any = await pool.query('SELECT * FROM cursos WHERE id = ?', [cursoId]);
        if (cursoRows.length === 0) {
            res.status(404).json({ error: 'Curso não encontrado.' });
            return;
        }

        const [matriculaRows]: any = await pool.query(
            'SELECT id FROM matriculas WHERE user_id = ? AND curso_id = ?',
            [userId, cursoId]
        );

        res.json({
            curso: cursoRows[0],
            jaMatriculado: matriculaRows.length > 0
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar informações do curso.' });
    }
};

export const matricularNoCurso = async (req: AuthRequest, res: Response): Promise<void> => {
    const cursoId = req.params.id;
    const userId = req.userId;

    try {
        const [matriculaRows]: any = await pool.query(
            'SELECT id FROM matriculas WHERE user_id = ? AND curso_id = ?',
            [userId, cursoId]
        );

        if (matriculaRows.length > 0) {
            res.status(400).json({ error: 'Usuário já está matriculado neste curso.' });
            return;
        }

        await pool.query('INSERT INTO matriculas (user_id, curso_id) VALUES (?, ?)', [userId, cursoId]);
        res.json({ message: 'Matrícula realizada com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao realizar matrícula.' });
    }
};