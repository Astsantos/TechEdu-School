import { API_URL } from './config.js';

document.getElementById('login')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById("email") as HTMLInputElement;
    console.log(email.value);
    const senha = document.getElementById("senha") as HTMLInputElement;
    console.log(senha.value);

    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.value, senha: senha.value })
        });

        const data = await response.json();

        if (response.ok) {
            // Salva o token JWT de forma persistente no navegador
            localStorage.setItem('token_curso', data.token);
            alert('Login efetuado!');
            window.location.href = 'curso.html'; // Redireciona para a página do curso
        } else {
            alert(data.error); // Mensagem genérica e segura vinda do back
        }
    } catch (error) {
        alert('Erro ao conectar com o servidor.');
    }
});