"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cursoController_1 = require("../controllers/cursoController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/:id', authMiddleware_1.autenticarToken, cursoController_1.obterDetalhesCurso);
router.post('/:id/matricular', authMiddleware_1.autenticarToken, cursoController_1.matricularNoCurso);
exports.default = router;
//# sourceMappingURL=cursoRoute.js.map