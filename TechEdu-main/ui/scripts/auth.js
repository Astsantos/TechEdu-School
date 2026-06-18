import { API_URL } from "./config.js";

document.getElementById('login')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");
    
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.value, senha: senha.value })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token_curso', data.token);
            
            // Salva os dados do usuário para usar no perfil
            localStorage.setItem('usuarioLogado', JSON.stringify({
                nome: data.nome || data.name || data.usuario?.nome || 'Usuário',
                email: data.email || data.usuario?.email || email.value,
                descricao: data.descricao || data.usuario?.descricao || ''
            }));
            
            window.location.href = 'index.html';
        } else {
            alert(data.error || 'Erro ao fazer login.');
        }
    } catch (error) {
        alert('Erro ao conectar com o servidor.');
    }
});