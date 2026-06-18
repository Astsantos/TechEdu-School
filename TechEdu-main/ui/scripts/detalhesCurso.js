"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_js_1 = require("./config.js");
const token = localStorage.getItem('token_curso');
// Se não houver token, barra o acesso imediatamente e manda de volta
if (!token) {
    window.location.href = 'cadastro.html';
}
const pageToContentId = {
    '/Back': 2,
    '/Design': 3,
    '/Front': 1,
    '/Marketing': 4
};
const currentPath = window.location.pathname;
const CURSO_ID = pageToContentId[currentPath] ?? null;
// Carregar informações ao abrir a página
async function carregarCurso() {
    try {
        const response = await fetch(`${config_js_1.API_URL}/api/cursos/${CURSO_ID}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem('token_curso');
            window.location.href = 'cadastro.html';
            return;
        }
        const data = await response.json();
        // Preenche o HTML com as informações vindas do Banco de Dados
        const titulo = document.getElementById("titulo-curso");
        console.log(titulo.innerText);
        const descricao = document.getElementById("descricao-curso");
        console.log(descricao.innerText);
        const carga_horaria = document.getElementById("cargahoraria-curso");
        console.log(carga_horaria.innerText);
        const matriz_curricular = document.getElementById("matriz-curso");
        console.log(matriz_curricular.innerText);
        const btn = document.getElementById('matricula');
        // Regra de Negócio: Trata o estado do botão
        if (data.jaMatriculado) {
            btn.innerText = 'Matrícula Realizada';
            btn.className = 'btn-inativo';
            btn.disabled = true; // Botão inativo
        }
        else {
            btn.innerText = 'Matricular-se';
            btn.className = 'btn-ativo';
            btn.disabled = false;
            btn.onclick = matricular;
        }
    }
    catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}
async function matricular() {
    try {
        const response = await fetch(`${config_js_1.API_URL}/api/cursos/${CURSO_ID}/matricular`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            carregarCurso(); // Atualiza a tela para desativar o botão
        }
        else {
            alert(data.error);
        }
    }
    catch (error) {
        alert('Erro ao efetuar matrícula.');
    }
}
// Inicialização
carregarCurso();
//# sourceMappingURL=detalhesCurso.js.map