require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

/* Inicializa o SDK do Gemini com a sua chave*/
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* Define o prompt de sistema com as diretrizes do colégio*/
const systemPrompt = `Você é o assistente virtual do TechEdu School. 
Seu objetivo é ajudar alunos, professores e visitantes com dúvidas sobre cursos, matrículas, horários, plataforma de ensino e informações da instituição.
Responda sempre de forma educada, clara, objetiva e amigável.
Se não souber uma informação específica, informe isso em vez de inventar uma resposta.`;

app.post('/api/chat', async (req, res) => {
    try {
        /* Captura a mensagem e o histórico enviados pelo front-end*/
        const { mensagem, historico } = req.body;

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: systemPrompt
        });

        /* Inicia o chat carregando o histórico recebido (ou um array vazio se for a primeira mensagem)*/
        const chat = model.startChat({
            history: historico || []
        });

        /* Envia a nova mensagem dentro do contexto desse chat*/
        const result = await chat.sendMessage(mensagem);
        const resposta = result.response.text();

        res.json({ resposta });

    } catch (error) {
        console.error("Erro ao comunicar com o Gemini:", error);
        res.status(500).json({ erro: "Desculpe, estou com problemas técnicos no momento." });
    }
});

/* A parte abaixo é obrigatória para o servidor rodar*/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
