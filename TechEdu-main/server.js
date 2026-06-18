"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoute_1 = __importDefault(require("./api/src/routes/authRoute"));
const cursoRoute_1 = __importDefault(require("./api/src/routes/cursoRoute"));
const chatRoute_1 = __importDefault(require("./api/src/routes/chatRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares Globais
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Definição das Rotas (Prefixos)
app.use('/api/auth', authRoute_1.default);
app.use('/api/cursos', cursoRoute_1.default);
app.use('/api/chat', chatRoute_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escalável rodando em ambiente MVC na porta ${PORT}`);
});
//# sourceMappingURL=server.js.map