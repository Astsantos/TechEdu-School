"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_js_1 = require("./config.js");
async function enviarMensagemChat(textoMensagem) {
    const token = localStorage.getItem('token_curso');
    try {
        const response = await fetch(`${config_js_1.API_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ message: textoMensagem })
        });
        if (response.ok) {
            const el = document.getElementById("input-mensagem");
            el.value = ""; // limpa o campo
            //carregarHistoricoChat(); // Atualiza a tela com a nova mensagem
        }
    }
    catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }
}
//# sourceMappingURL=chat.js.map