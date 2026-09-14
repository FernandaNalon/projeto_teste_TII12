# Projeto Exemplo de Publicação

Projeto didático com:

> Este projeto usa NestJS 11 com dependências alinhadas para evitar conflitos de peer dependency.

- Frontend em HTML, CSS e JavaScript;
- Backend em NestJS;
- Banco de dados MySQL;
- Frontend servido pelo próprio NestJS através da pasta `public`;
- CRUD simples de tarefas;
- Estrutura preparada para publicação na Hostinger.

## Estrutura

```text
projeto-exemplo-publicacao/
├── public/
│   ├── index.html
│   ├── javascript/
│   │   └── script.js
│   └── style/
│       └── style.css
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── database/
│   │   ├── database.module.ts
│   │   └── database.service.ts
│   └── tarefas/
│       ├── dto/
│       │   ├── create-tarefa.dto.ts
│       │   └── update-tarefa.dto.ts
│       ├── tarefas.controller.ts
│       ├── tarefas.module.ts
│       └── tarefas.service.ts
├── banco.sql
├── .env.example
├── package.json
├── nest-cli.json
└── tsconfig.json
```

## Rotas

| Método | Rota | Função |
|---|---|---|
| GET | `/tarefas` | Lista tarefas |
| GET | `/tarefas/:id` | Busca uma tarefa |
| POST | `/tarefas` | Cadastra tarefa |
| PUT | `/tarefas/:id` | Atualiza tarefa |
| DELETE | `/tarefas/:id` | Exclui tarefa |

## Banco local

Crie um banco chamado:

```sql
projeto_publicacao
```

Depois importe `banco.sql`.

Crie um arquivo `.env` baseado em `.env.example`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=projeto_publicacao
```

## Rodar localmente

```bash
npm install
npm run start:dev
```

Acesse:

```text
http://localhost:3000
```

API:

```text
http://localhost:3000/tarefas
```

## Publicar na Hostinger

1. Crie um banco MySQL na Hostinger.
2. Importe `banco.sql` pelo phpMyAdmin.
3. Suba o projeto para o GitHub.
4. Na Hostinger, crie uma nova Web App.
5. Conecte o repositório.
6. Como o `package.json` está na raiz, o diretório raiz é a raiz do projeto.
7. Cadastre as variáveis:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=USUARIO_COMPLETO_DA_HOSTINGER
DB_PASSWORD=SENHA_DO_BANCO
DB_NAME=NOME_COMPLETO_DO_BANCO
```

8. Implante.
9. Teste primeiro:

```text
https://seu-subdominio.com/tarefas
```

10. Depois acesse:

```text
https://seu-subdominio.com/
```

## Objetivo didático

Este projeto é propositalmente simples para permitir demonstrar:

```text
Frontend
   ↓
fetch('/tarefas')
   ↓
NestJS
   ↓
mysql2
   ↓
MySQL
   ↓
resposta
   ↓
Frontend
```

O cadastro de uma tarefa comprova um fluxo de escrita (POST/INSERT).
A listagem comprova um fluxo de leitura (GET/SELECT).
Atualizar e excluir permitem demonstrar PUT/UPDATE e DELETE.
