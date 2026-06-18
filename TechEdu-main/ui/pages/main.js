/* Chat*/

const input = document.getElementById("message-input");
const sendButton = document.getElementById("btn-submit");
const mensagens = document.getElementById("historic");

/* Variável que vai guardar o histórico da conversa no formato que o Gemini exige*/ 
let historicoChat = [];

/* Função responsável por enviar a mensagem */
async function sendMessage() {
    const texto = input.value.trim();

    if (texto === "") return;

    /* Exibe a mensagem do usuário */
    mensagens.innerHTML += `
        <div class="msg-user">
            <div class="msg-bubble msg-bubble--user">
                ${texto}
            </div>
        </div>
    `;

    input.value = "";
    mensagens.scrollTop = mensagens.scrollHeight;

    /* Adiciona o indicador de digitando*/ 
    const idCarregando = "msg-" + Date.now();

    mensagens.innerHTML += `
        <div class="msg-bot" id="${idCarregando}">
            <div class="msg-bubble msg-bubble--bot">
                <em>Digitando...</em>
            </div>
        </div>
    `;

    mensagens.scrollTop = mensagens.scrollHeight;

    /* Faz a requisição para o Back-end */
    try {

        const response = await fetch("http://localhost:3000/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            /* MODIFICAÇÃO: Enviamos a mensagem atual E o histórico acumulado*/ 
            body: JSON.stringify({
                mensagem: texto,
                historico: historicoChat
            })
        });

        const data = await response.json();

        const mensagemBot = document.getElementById(idCarregando);

        if (data.resposta) {

            mensagemBot.innerHTML = `
                <div class="msg-bubble msg-bubble--bot">
                    ${data.resposta.replace(/\n/g, "<br>")}
                </div>
            `;

            /* NOVIDADE: Salva a pergunta do usuário e a resposta do bot no histórico para a próxima requisição*/ 
            historicoChat.push({
                role: "user",
                parts: [{ text: texto }]
            });

            historicoChat.push({
                role: "model",
                parts: [{ text: data.resposta }]
            });

        } else {

            mensagemBot.innerHTML = `
                <div class="msg-bubble msg-bubble--bot">
                    Erro ao obter resposta.
                </div>
            `;
        }

    } catch (error) {

        console.error("Erro:", error);

        const mensagemBot = document.getElementById(idCarregando);

        mensagemBot.innerHTML = `
            <div class="msg-bubble msg-bubble--bot">
                Não foi possível conectar ao servidor.
            </div>
        `;
    }

    mensagens.scrollTop = mensagens.scrollHeight;
}

/* Evento de clique no botão enviar*/
sendButton.addEventListener("click", sendMessage);

/* Permite enviar pressionando Enter*/
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});