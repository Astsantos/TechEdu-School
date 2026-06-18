"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.matricularNoCurso = exports.obterDetalhesCurso = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const conexao_1 = __importDefault(require("../config/conexao"));
const obterDetalhesCurso = async (req, res) => {
    const cursoId = req.params.id;
    const userId = req.userId;
    try {
        const [cursoRows] = await conexao_1.default.query('SELECT * FROM cursos WHERE id = ?', [cursoId]);
        if (cursoRows.length === 0) {
            res.status(404).json({ error: 'Curso não encontrado.' });
            return;
        }
        const [matriculaRows] = await conexao_1.default.query('SELECT id FROM matriculas WHERE user_id = ? AND curso_id = ?', [userId, cursoId]);
        res.json({
            curso: cursoRows[0],
            jaMatriculado: matriculaRows.length > 0
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar informações do curso.' });
    }
};
exports.obterDetalhesCurso = obterDetalhesCurso;
const matricularNoCurso = async (req, res) => {
    const cursoId = req.params.id;
    const userId = req.userId;
    try {
        const [matriculaRows] = await conexao_1.default.query('SELECT id FROM matriculas WHERE user_id = ? AND curso_id = ?', [userId, cursoId]);
        if (matriculaRows.length > 0) {
            res.status(400).json({ error: 'Usuário já está matriculado neste curso.' });
            return;
        }
        await conexao_1.default.query('INSERT INTO matriculas (user_id, curso_id) VALUES (?, ?)', [userId, cursoId]);
        res.json({ message: 'Matrícula realizada com sucesso!' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao realizar matrícula.' });
    }
};
exports.matricularNoCurso = matricularNoCurso;
//# sourceMappingURL=cursoController.js.map