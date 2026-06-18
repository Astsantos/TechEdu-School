"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_js_1 = require("./config.js");
// Evento de Cadastro
document.getElementById('register')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById("name");
    console.log(nome.value);
    const sobrenome = document.getElementById("surname");
    console.log(sobrenome.value);
    const data_nascimento = document.getElementById("birthday");
    console.log(data_nascimento.value);
    const cep = document.getElementById("cep");
    console.log(cep.value);
    const endereco = document.getElementById("address");
    console.log(endereco.value);
    const telefone = document.getElementById("phone");
    console.log(telefone.value);
    const cpf = document.getElementById("cpf");
    console.log(cpf.value);
    const email = document.getElementById("email");
    console.log(email.value);
    const senha = document.getElementById("senha");
    console.log(senha.value);
    const confirmacaoSenha = document.getElementById("confirmarSenha");
    console.log(confirmacaoSenha.value);
    const payload = {
        nome: nome.value,
        sobrenome: sobrenome.value,
        data_nascimento: data_nascimento.value,
        cep: cep.value,
        endereco: endereco.value,
        telefone: telefone.value,
        cpf: cpf.value,
        email: email.value,
        senha: senha.value,
        confirmacaoSenha: confirmacaoSenha.value
    };
    try {
        const response = await fetch(`${config_js_1.API_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            const form = document.getElementById("register");
            form.reset();
        }
        else {
            alert(data.error); // Mostra o erro retornado pelo back (ex: menor de idade, senhas diferentes)
        }
    }
    catch (error) {
        alert('Erro ao conectar com o servidor.');
    }
});
//# sourceMappingURL=cadastro.js.map