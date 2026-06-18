"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatController_1 = require("../controllers/chatController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/', authMiddleware_1.autenticarToken, chatController_1.enviarMensagem);
router.get('/historico', authMiddleware_1.autenticarToken, chatController_1.obterHistoricoChat);
exports.default = router;
//# sourceMappingURL=chatRoute.js.map