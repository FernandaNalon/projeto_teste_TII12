-- Projeto exemplo: Gerenciador de Tarefas
-- Arquivo pronto para ser importado em um banco já criado na Hostinger.
-- Não contém CREATE DATABASE nem USE.

CREATE TABLE tarefas (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descricao VARCHAR(255),
    concluida BOOLEAN NOT NULL DEFAULT FALSE,
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO tarefas (titulo, descricao, concluida) VALUES
('Publicar o frontend', 'Verificar se HTML, CSS e JavaScript carregam corretamente.', TRUE),
('Testar a API', 'Acessar GET /tarefas e conferir o retorno em JSON.', FALSE),
('Validar o banco', 'Cadastrar uma nova tarefa e conferir no phpMyAdmin.', FALSE);
