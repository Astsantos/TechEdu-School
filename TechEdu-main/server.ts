import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './api/src/routes/authRoute';
import cursoRoutes from './api/src/routes/cursoRoute';
import chatRoutes from './api/src/routes/chatRoute';

dotenv.config();

const app = express();

// Middlewares Globais
app.use(cors());
app.use(express.json());

// Definição das Rotas (Prefixos)
app.use('/api/auth', authRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escalável rodando em ambiente MVC na porta ${PORT}`);
});