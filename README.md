# Cellar-frontend
Frontend da API Cellar

API Cellar é um projeto para as cadeiras de Desenvolvimento Frontend e Backend do Instituto Federal de Santa Catarina (IFSC), campus Lages, que apresenta um sistema de controle de adega de vinhos particular

## Descrição do projeto e arquitetura


Cellar-frontend é uma single-page application (SPA) construída com React e Vite para consumir a API do sistema Cellar (backend separado). A aplicação organiza as páginas com React Router e componentes reutilizáveis localizados em `src/components/`. A camada de autenticação é implementada no diretório `src/auth/`, que fornece contexto de usuário, helpers de fetch autenticado e verificação de tokens.

Arquitetura em alto nível:

Frontend (React + Vite) <---> Backend (API REST)

Diagrama simples:

  [Browser]
	  |
	  v
  [Vite Dev Server (React SPA)]
	  |
	  v
  [API Backend (auth, dados, migrations)]

Principais tecnologias: Vite, React, React Router, react-bootstrap. Preferência por `import.meta.env.VITE_API_BASE_URL` para configurar o endpoint da API.

## Como executar

Passo a passo para desenvolvimento e build:

1. Instale dependências:

	npm install

2. Crie um arquivo de ambiente (opcional) com a URL do backend:

	- Arquivo: `.env.local` ou `.env`
	- Variável necessária:

	  VITE_API_BASE_URL=http://localhost:3000

3. Rodar em modo de desenvolvimento (Vite):

	npm run dev

	- Porta padrão do Vite: 5173 (a porta é exibida no terminal quando o servidor inicia).

4. Build para produção:

	npm run build

5. Servir os arquivos de produção (exemplo com `npm run preview` se estiver configurado):

	npm run preview

Migrations / seeds:

- Este repositório é apenas o frontend; não há migrations ou seeds aqui.
- Se o backend do projeto usar migrations/seeds, execute-as no repositório do backend (por exemplo: `npm run migrate` ou `php artisan migrate`, conforme o backend fornecido). Consulte a documentação do backend para comandos específicos.

Notas sobre autenticação e tokens:

- O frontend armazena o access token em `sessionStorage` com a chave `at` em alguns fluxos (veja `src/components/usuarios/UsuarioFormLogin.jsx`).
- Há um hook `useAuthFetch` em `src/auth/useAuthFetch.jsx` que facilita chamadas autenticadas e uma lógica de refresh parcialmente implementada — se alterar o fluxo de refresh, atualize esse arquivo e garanta uma tentativa de re-request em 401.

Onde olhar no código:

- Ponto de entrada: `src/main.jsx`
- Contexto de autenticação: `src/auth/AuthContext.jsx`
- Hooks de autenticação: `src/auth/useAuth.jsx`, `src/auth/useAuthFetch.jsx`
- Componentes: `src/components/`

Backend
- Repositório oficial do backend: https://github.com/cristo-j/Cellar.git
- Clone e siga o README do backend para executar migrations, seeds e levantar o servidor API antes de usar o frontend.


