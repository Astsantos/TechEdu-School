CREATE DATABASE IF NOT EXISTS curso_db;
USE curso_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    cep VARCHAR(9) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR(191) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    doc_nome VARCHAR(50) NOT NULL,
    doc_caminho VARCHAR(150) NOT NULL,
    carga_horaria INT NOT NULL
);

CREATE TABLE matriculas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    curso_id INT NOT NULL,
    data_matricula TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE,
    UNIQUE KEY unique_matricula (user_id, curso_id)
);

CREATE TABLE mensagens_chat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    mensagem TEXT NOT NULL,
    enviado_por ENUM('usuario', 'suporte') NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Inserir um curso de exemplo para teste
INSERT INTO cursos (nome, descricao, doc_nome, doc_caminho, carga_horaria) 
VALUES ('Curso de Front-End', 'O Curso de Front-End é voltado para iniciantes e profissionais que desejam dominar a criação de interfaces web modernas, responsivas e interativas.', 'Grade Curricular', '/arquivo/📚front_end_gc.pdf', 190);
INSERT INTO cursos (nome, descricao, doc_nome, doc_caminho, carga_horaria) 
VALUES ('Curso de Back-End', 'O Curso de Back-End é projetado para quem deseja construir a lógica, o banco de dados e a infraestrutura por trás de aplicações web e mobile.', 'Grade Curricular', '/arquivo/📚back_end_gc.pdf', 200);
INSERT INTO cursos (nome, descricao, doc_nome, doc_caminho, carga_horaria) 
VALUES ('Curso de Design Gráfico', 'O Curso de Design Gráfico é voltado para iniciantes e profissionais que desejam dominar a comunicação visual por meio de projetos gráficos para mídias impressas e digitais.', 'Grade Curricular', '/arquivo/📚design_grafico_gc.pdf', 210);
INSERT INTO cursos (nome, descricao, doc_nome, doc_caminho, carga_horaria) 
VALUES ('Curso de Marketing Digital', 'O Curso de Marketing Digital é voltado para empreendedores, profissionais de comunicação e iniciantes que desejam dominar as estratégias e ferramentas para promover negócios, produtos ou serviços no ambiente online.', 'Grade Curricular', '/arquivo/📚marketing_digital_gc.pdf', 220);