-- ============================================================
-- Banco de Dados - Sistema de Cursos e Atendimentos
-- Este banco controla usuários, cursos, turmas, matrículas, atendimentos e mensagens.
-- ============================================================


CREATE DATABASE IF NOT EXISTS sistema_cursos -- Cria o banco de dados sistema_cursos, caso ele ainda não exista
  CHARACTER SET utf8mb4                     -- Define o conjunto de caracteres, permitindo acentos e caracteres especiais
  COLLATE utf8mb4_unicode_ci;               -- Define a forma de comparação e ordenação dos textos

USE sistema_cursos;                         -- Seleciona o banco sistema_cursos para ser usado


-- ------------------------------------------------------------
-- USUARIO
-- Tabela responsável por armazenar alunos e funcionários
-- ------------------------------------------------------------

CREATE TABLE Usuario (                      -- Cria a tabela Usuario

  id INT UNSIGNED NOT NULL AUTO_INCREMENT,  -- Identificador único do usuário, positivo e gerado automaticamente

  nome VARCHAR(150) NOT NULL,               -- Nome do usuário, com até 150 caracteres, obrigatório

  email VARCHAR(255) NOT NULL,              -- Email do usuário, com até 255 caracteres, obrigatório

  senha VARCHAR(255) NOT NULL,              -- Senha do usuário, obrigatória

  cpf CHAR(11) NOT NULL,                    -- CPF do usuário, com exatamente 11 dígitos, obrigatório

  telefone VARCHAR(20) NULL,                -- Telefone do usuário, opcional

  tipo ENUM('aluno','funcionario') NOT NULL, -- Define se o usuário é aluno ou funcionário

  status ENUM('ativo','inativo') NOT NULL DEFAULT 'ativo', -- Situação do usuário; por padrão, ativo

  data_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Data e hora automáticas do cadastro

  PRIMARY KEY (id),                         -- Define o campo id como chave primária da tabela

  CONSTRAINT uq_usuario_email UNIQUE (email), -- Impede que dois usuários tenham o mesmo email

  CONSTRAINT uq_usuario_cpf UNIQUE (cpf)    -- Impede que dois usuários tenham o mesmo CPF

) ENGINE=InnoDB;                            -- Define o mecanismo da tabela como InnoDB


-- ------------------------------------------------------------
-- CURSO
-- Tabela responsável por armazenar os cursos disponíveis
-- ------------------------------------------------------------

CREATE TABLE Curso (                        -- Cria a tabela Curso

  id INT UNSIGNED NOT NULL AUTO_INCREMENT,  -- Identificador único do curso, positivo e automático

  nome_curso VARCHAR(200) NOT NULL,         -- Nome do curso, com até 200 caracteres, obrigatório

  descricao_curso TEXT NULL,                -- Descrição do curso, texto longo, opcional

  carga_horaria SMALLINT UNSIGNED NOT NULL, -- Carga horária do curso, número pequeno positivo, obrigatório

  matriz_curricular TEXT NULL,              -- Matriz curricular ou conteúdo do curso, opcional

  status ENUM('ativo','inativo') NOT NULL DEFAULT 'ativo', -- Situação do curso; por padrão, ativo

  PRIMARY KEY (id),                         -- Define o campo id como chave primária da tabela Curso

  CONSTRAINT chk_curso_carga_horaria CHECK (carga_horaria > 0) -- Garante que a carga horária seja maior que zero

) ENGINE=InnoDB;                            -- Define o mecanismo da tabela como InnoDB


-- ------------------------------------------------------------
-- TURMA
-- Tabela responsável por armazenar turmas de cursos
-- Cada turma pertence a um curso
-- ------------------------------------------------------------

CREATE TABLE Turma (                        -- Cria a tabela Turma

  id INT UNSIGNED NOT NULL AUTO_INCREMENT,  -- Identificador único da turma, positivo e automático

  curso_id INT UNSIGNED NOT NULL,           -- Identificador do curso ao qual a turma pertence

  horario VARCHAR(100) NULL,                -- Horário da turma, opcional

  data_inicio DATE NOT NULL,                -- Data de início da turma, obrigatória

  data_fim DATE NOT NULL,                   -- Data de término da turma, obrigatória

  vagas_totais SMALLINT UNSIGNED NOT NULL,  -- Quantidade total de vagas da turma

  status ENUM('aberta','lotada','encerrada') NOT NULL DEFAULT 'aberta', -- Situação da turma; por padrão, aberta

  PRIMARY KEY (id),                         -- Define o campo id como chave primária da tabela Turma

  CONSTRAINT fk_turma_curso FOREIGN KEY (curso_id) -- Cria uma chave estrangeira ligando Turma a Curso

    REFERENCES Curso (id)                   -- Indica que curso_id referencia o campo id da tabela Curso

    ON UPDATE CASCADE                       -- Se o id do curso mudar, a mudança será atualizada na Turma

    ON DELETE RESTRICT                      -- Impede excluir um curso que possua turmas vinculadas

) ENGINE=InnoDB;                            -- Define o mecanismo da tabela como InnoDB


-- ------------------------------------------------------------
-- MATRICULA
-- Tabela responsável por registrar alunos em turmas
-- O mesmo aluno não pode se matricular duas vezes na mesma turma
-- ------------------------------------------------------------

CREATE TABLE Matricula (                    -- Cria a tabela Matricula

  id INT UNSIGNED NOT NULL AUTO_INCREMENT,  -- Identificador único da matrícula, positivo e automático

  usuario_id INT UNSIGNED NOT NULL,         -- Identificador do usuário/aluno matriculado

  turma_id INT UNSIGNED NOT NULL,           -- Identificador da turma em que o aluno foi matriculado

  data_matricula DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Data e hora automáticas da matrícula

  status ENUM('ativa','cancelada') NOT NULL DEFAULT 'ativa', -- Situação da matrícula; por padrão, ativa

  PRIMARY KEY (id),                         -- Define o campo id como chave primária da matrícula

  CONSTRAINT uq_matricula_aluno_turma UNIQUE (usuario_id, turma_id), -- Impede matrícula duplicada do mesmo aluno na mesma turma

  CONSTRAINT fk_matricula_usuario FOREIGN KEY (usuario_id) -- Cria chave estrangeira com a tabela Usuario

    REFERENCES Usuario (id)                 -- Indica que usuario_id referencia o campo id da tabela Usuario

    ON UPDATE CASCADE                       -- Se o id do usuário mudar, atualiza também na matrícula

    ON DELETE RESTRICT,                     -- Impede excluir usuário que possua matrícula

  CONSTRAINT fk_matricula_turma FOREIGN KEY (turma_id) -- Cria chave estrangeira com a tabela Turma

    REFERENCES Turma (id)                   -- Indica que turma_id referencia o campo id da tabela Turma

    ON UPDATE CASCADE                       -- Se o id da turma mudar, atualiza também na matrícula

    ON DELETE RESTRICT                      -- Impede excluir turma que possua matrícula

) ENGINE=InnoDB;                            -- Define o mecanismo da tabela como InnoDB


-- ------------------------------------------------------------
-- ATENDIMENTO
-- Tabela responsável por armazenar atendimentos dos alunos
-- ------------------------------------------------------------

CREATE TABLE Atendimento (                  -- Cria a tabela Atendimento

  id INT UNSIGNED NOT NULL AUTO_INCREMENT,  -- Identificador único do atendimento, positivo e automático

  aluno_id INT UNSIGNED NOT NULL,           -- Identificador do aluno que solicitou o atendimento

  funcionario_id INT UNSIGNED NULL,         -- Identificador do funcionário responsável, podendo ficar vazio

  assunto VARCHAR(255) NOT NULL,            -- Assunto do atendimento, obrigatório

  descricao TEXT NOT NULL,                  -- Descrição ou mensagem do atendimento, obrigatória

  data DATE NOT NULL,                       -- Data marcada para o atendimento

  horario TIME NOT NULL,                    -- Horário marcado para o atendimento

  status ENUM('agendado','em_andamento','concluido','cancelado') NOT NULL DEFAULT 'agendado', -- Situação do atendimento

  data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Data e hora automáticas da criação do atendimento

  PRIMARY KEY (id),                         -- Define o campo id como chave primária do atendimento

  CONSTRAINT fk_atendimento_aluno FOREIGN KEY (aluno_id) -- Cria chave estrangeira para identificar o aluno

    REFERENCES Usuario (id)                 -- Indica que aluno_id referencia o campo id da tabela Usuario

    ON UPDATE CASCADE                       -- Se o id do aluno mudar, atualiza também no atendimento

    ON DELETE RESTRICT,                     -- Impede excluir aluno que possua atendimento

  CONSTRAINT fk_atendimento_funcionario FOREIGN KEY (funcionario_id) -- Cria chave estrangeira para identificar o funcionário

    REFERENCES Usuario (id)                 -- Indica que funcionario_id referencia o campo id da tabela Usuario

    ON UPDATE CASCADE                       -- Se o id do funcionário mudar, atualiza também no atendimento

    ON DELETE SET NULL                      -- Se o funcionário for excluído, o atendimento continua, mas sem responsável

) ENGINE=InnoDB;                            -- Define o mecanismo da tabela como InnoDB


-- ------------------------------------------------------------
-- MENSAGEM
-- Tabela responsável por armazenar mensagens enviadas aos usuários
-- ------------------------------------------------------------

CREATE TABLE Mensagem (                     -- Cria a tabela Mensagem

  id INT UNSIGNED NOT NULL AUTO_INCREMENT,  -- Identificador único da mensagem, positivo e automático

  usuario_id INT UNSIGNED NOT NULL,         -- Identificador do usuário que recebeu a mensagem

  tipo ENUM('confirmacao_matricula','lembrete_atendimento') NOT NULL, -- Tipo da mensagem enviada

  conteudo TEXT NOT NULL,                   -- Conteúdo da mensagem, obrigatório

  data_envio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Data e hora automáticas do envio

  PRIMARY KEY (id),                         -- Define o campo id como chave primária da mensagem

  CONSTRAINT fk_mensagem_usuario FOREIGN KEY (usuario_id) -- Cria chave estrangeira com Usuario

    REFERENCES Usuario (id)                 -- Indica que usuario_id referencia o campo id da tabela Usuario

    ON UPDATE CASCADE                       -- Se o id do usuário mudar, atualiza também na mensagem

    ON DELETE CASCADE                       -- Se o usuário for excluído, suas mensagens também serão excluídas

) ENGINE=InnoDB;                            -- Define o mecanismo da tabela como InnoDB


-- ============================================================
-- VIEW AUXILIAR: vagas disponíveis por turma
-- Mostra vagas totais, preenchidas e disponíveis por turma
-- ============================================================

CREATE OR REPLACE VIEW vw_vagas_turma AS    -- Cria ou substitui a view vw_vagas_turma

SELECT                                      -- Inicia a consulta que define os dados da view

  t.id AS turma_id,                         -- Mostra o id da turma com o nome turma_id

  t.curso_id,                               -- Mostra o id do curso ligado à turma

  t.vagas_totais,                           -- Mostra o total de vagas da turma

  COUNT(m.id) AS vagas_preenchidas,         -- Conta quantas matrículas ativas existem na turma

  t.vagas_totais - COUNT(m.id) AS vagas_disponiveis, -- Calcula as vagas disponíveis

  CASE                                      -- Inicia uma condição

    WHEN COUNT(m.id) >= t.vagas_totais THEN 'lotada' -- Se as vagas preenchidas forem iguais ou maiores que o total, a turma está lotada

    ELSE 'disponivel'                       -- Caso contrário, a turma ainda possui vagas

  END AS situacao                           -- Finaliza a condição e dá o nome situacao ao resultado

FROM Turma t                                -- Usa a tabela Turma como base da consulta, com apelido t

LEFT JOIN Matricula m                       -- Junta a tabela Matricula, com apelido m, mantendo turmas sem matrícula

  ON m.turma_id = t.id                      -- Liga a matrícula à turma correspondente

 AND m.status = 'ativa'                     -- Considera apenas matrículas ativas

GROUP BY t.id, t.curso_id, t.vagas_totais;  -- Agrupa os dados por turma para contar corretamente as matrículas
```
