import { API_URL } from './config.js';
// Evento de Cadastro
document.getElementById('register')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById("name") as HTMLInputElement;
    console.log(nome.value);
    const sobrenome = document.getElementById("surname") as HTMLInputElement;
    console.log(sobrenome.value);
    const data_nascimento = document.getElementById("birthday") as HTMLInputElement;
    console.log(data_nascimento.value);
    const cep = document.getElementById("cep") as HTMLInputElement;
    console.log(cep.value);
    const endereco = document.getElementById("address") as HTMLInputElement;
    console.log(endereco.value);
    const telefone = document.getElementById("phone") as HTMLInputElement;
    console.log(telefone.value);
    const cpf = document.getElementById("cpf") as HTMLInputElement;
    console.log(cpf.value);
    const email = document.getElementById("email") as HTMLInputElement;
    console.log(email.value);
    const senha = document.getElementById("senha") as HTMLInputElement;
    console.log(senha.value);
    const confirmacaoSenha = document.getElementById("confirmarSenha") as HTMLInputElement;
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
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            const form = document.getElementById("register") as HTMLFormElement;
            form.reset();
        } else {
            alert(data.error); // Mostra o erro retornado pelo back (ex: menor de idade, senhas diferentes)
        }
    } catch (error) {
        alert('Erro ao conectar com o servidor.');
    }
});