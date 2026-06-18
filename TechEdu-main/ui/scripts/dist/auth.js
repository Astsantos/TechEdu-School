var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { API_URL } from './config.js';
(_a = document.getElementById('login')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const email = document.getElementById("email");
    console.log(email.value);
    const senha = document.getElementById("senha");
    console.log(senha.value);
    try {
        const response = yield fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.value, senha: senha.value })
        });
        const data = yield response.json();
        if (response.ok) {
            // Salva o token JWT de forma persistente no navegador
            localStorage.setItem('token_curso', data.token);
            alert('Login efetuado!');
            // REDIRECIONAMENTO CORRIGIDO: Redireciona para a página principal index.html
            window.location.href = 'index.html';
        }
        else {
            alert(data.error); // Mensagem genérica e segura vinda do back
        }
    }
    catch (error) {
        alert('Erro ao conectar com o servidor.');
    }
}));
