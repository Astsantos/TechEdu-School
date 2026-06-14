-- ============================================================
--  Banco de Dados - Sistema de Cursos e Atendimentos
--  Com base na modelagem (2ª versão - completa)
-- ============================================================

CREATE DATABASE IF NOT EXISTS sistema_cursos
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE sistema_cursos;

-- ------------------------------------------------------------
-- USUARIO
-- ------------------------------------------------------------
CREATE TABLE Usuario (
  id            INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  nome          VARCHAR(150)    NOT NULL,
  email         VARCHAR(255)    NOT NULL,
  senha         VARCHAR(255)    NOT NULL,
  cpf           CHAR(11)        NOT NULL,           -- somente dígitos
  telefone      VARCHAR(20)         NULL,
  tipo          ENUM('aluno','funcionario') NOT NULL,
  status        ENUM('ativo','inativo')    NOT NULL DEFAULT 'ativo',
  data_cadastro DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  CONSTRAINT uq_usuario_email UNIQUE (email),
  CONSTRAINT uq_usuario_cpf   UNIQUE (cpf)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- CURSO
-- ------------------------------------------------------------
CREATE TABLE Curso (
  id                INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  nome_curso       VARCHAR(200)    NOT NULL,
  descricao_curso  TEXT                NULL,
  carga_horaria    SMALLINT UNSIGNED NOT NULL,       -- em horas; > 0 garantido pelo CHECK
  matriz_curricular TEXT               NULL,
  status           ENUM('ativo','inativo') NOT NULL DEFAULT 'ativo',

  PRIMARY KEY (id),
  CONSTRAINT chk_curso_carga_horaria CHECK (carga_horaria > 0)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- TURMA
-- ------------------------------------------------------------
CREATE TABLE Turma (
  id           INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  curso_id     INT UNSIGNED    NOT NULL,
  horario      VARCHAR(100)        NULL,
  data_inicio  DATE            NOT NULL,
  data_fim     DATE            NOT NULL,
  vagas_totais SMALLINT UNSIGNED NOT NULL,
  status       ENUM('aberta','lotada','encerrada') NOT NULL DEFAULT 'aberta',

  PRIMARY KEY (id),
  CONSTRAINT fk_turma_curso FOREIGN KEY (curso_id)
    REFERENCES Curso (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- MATRICULA
-- Regra: mesmo aluno não pode se matricular duas vezes na mesma turma
-- Regra: nova matrícula bloqueada se vagas_totais preenchidas (verificar na app)
-- ------------------------------------------------------------
CREATE TABLE Matricula (
  id             INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  usuario_id     INT UNSIGNED    NOT NULL,
  turma_id       INT UNSIGNED    NOT NULL,
  data_matricula DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status         ENUM('ativa','cancelada') NOT NULL DEFAULT 'ativa',

  PRIMARY KEY (id),
  CONSTRAINT uq_matricula_aluno_turma UNIQUE (usuario_id, turma_id),
  CONSTRAINT fk_matricula_usuario FOREIGN KEY (usuario_id)
    REFERENCES Usuario (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_matricula_turma FOREIGN KEY (turma_id)
    REFERENCES Turma (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- ATENDIMENTO
-- Atende ao sistema de agendamentos e mensagens exigido no projeto
-- ------------------------------------------------------------
CREATE TABLE Atendimento (
  id             INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  aluno_id       INT UNSIGNED    NOT NULL,
  funcionario_id INT UNSIGNED        NULL,  -- pode ser NULL (inicialmente sem responsável)
  assunto        VARCHAR(255)    NOT NULL,  -- Campo adicionado para o formulário do site
  descricao      TEXT            NOT NULL,  -- Corresponde à mensagem enviada
  data           DATE            NOT NULL,
  horario        TIME            NOT NULL,
  status         ENUM('agendado','em_andamento','concluido','cancelado') NOT NULL DEFAULT 'agendado',
  data_criacao   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  CONSTRAINT fk_atendimento_aluno FOREIGN KEY (aluno_id)
    REFERENCES Usuario (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_atendimento_funcionario FOREIGN KEY (funcionario_id)
    REFERENCES Usuario (id)
    ON UPDATE CASCADE
    ON DELETE SET NULL
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- MENSAGEM
-- ------------------------------------------------------------
CREATE TABLE Mensagem (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  usuario_id  INT UNSIGNED    NOT NULL,
  tipo        ENUM('confirmacao_matricula','lembrete_atendimento') NOT NULL,
  conteudo    TEXT            NOT NULL,
  data_envio  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  CONSTRAINT fk_mensagem_usuario FOREIGN KEY (usuario_id)
    REFERENCES Usuario (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
--  VIEW AUXILIAR: vagas disponíveis por turma
-- ============================================================
CREATE OR REPLACE VIEW vw_vagas_turma AS
SELECT
  t.id                                            AS turma_id,
  t.curso_id,
  t.vagas_totais,
  COUNT(m.id)                                     AS vagas_preenchidas,
  t.vagas_totais - COUNT(m.id)                    AS vagas_disponiveis,
  CASE
    WHEN COUNT(m.id) >= t.vagas_totais THEN 'lotada'
    ELSE 'disponivel'
  END                                             AS situacao
FROM Turma t
LEFT JOIN Matricula m
  ON m.turma_id = t.id
 AND m.status   = 'ativa'
GROUP BY t.id, t.curso_id, t.vagas_totais;
