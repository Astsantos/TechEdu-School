import { API_URL } from './config.js';

async function enviarMensagemChat(textoMensagem: string) {
    const token = localStorage.getItem('token_curso');

    try {
        const response = await fetch(`${API_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ message: textoMensagem })
        });

        if (response.ok) {
            const el = document.getElementById("input-mensagem") as HTMLInputElement;
            el.value = ""; // limpa o campo
            //carregarHistoricoChat(); // Atualiza a tela com a nova mensagem
        }
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }
}