"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obterHistoricoChat = exports.enviarMensagem = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const conexao_1 = __importDefault(require("../config/conexao"));
const enviarMensagem = async (req, res) => {
    const userId = req.userId;
    const { message: mensagem } = req.body; // Adaptado para receber 'message' ou 'mensagem'
    if (!mensagem || mensagem.trim() === '') {
        res.status(400).json({ error: 'A mensagem não pode estar vazia.' });
        return;
    }
    try {
        await conexao_1.default.query('INSERT INTO mensagens_chat (user_id, mensagem, enviado_por) VALUES (?, ?, ?)', [userId, mensagem, 'usuario']);
        res.status(201).json({ message: 'Mensagem enviada com sucesso!' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao enviar mensagem.' });
    }
};
exports.enviarMensagem = enviarMensagem;
const obterHistoricoChat = async (req, res) => {
    const userId = req.userId;
    try {
        const [rows] = await conexao_1.default.query('SELECT mensagem, enviado_por, data_envio FROM mensagens_chat WHERE user_id = ? ORDER BY data_envio ASC', [userId]);
        res.json({ historico: rows });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao carregar histórico do chat.' });
    }
};
exports.obterHistoricoChat = obterHistoricoChat;
//# sourceMappingURL=chatController.js.map