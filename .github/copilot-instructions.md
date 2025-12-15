<!-- .github/copilot-instructions.md - Project-specific guidance for AI coding agents -->
# Copilot instructions — Cellar-frontend

Purpose: help AI agents become productive quickly in this React + Vite frontend.

- Project root: source code under `src/` (pages, components, auth).
- Dev server: `npm install` then `npm run dev` (Vite). Build: `npm run build`.

Quick architecture notes
- Single-page React app using Vite and React Router. Entry: `src/main.jsx`.
- UI: Bootstrap + `react-bootstrap` components. Look under `src/components/`.
- Auth: small client-side auth layer:
  - `src/auth/AuthContext.jsx` provides `user`, `setUser`, `authLoading`.
  - `src/auth/useAuth.jsx` returns the context (`useAuth`).
  - `src/auth/useAuthFetch.jsx` builds an `authFetch` helper and reads `VITE_API_BASE_URL`.
  - Some components still use plain `fetch` (example: `src/components/usuarios/UsuarioFormLogin.jsx` posts to `http://localhost:3000/usuario/login` and stores the access token at `sessionStorage.setItem("at", ...)`).

API / tokens
- Environment: prefer `import.meta.env.VITE_API_BASE_URL` for API base.
- Access token location: `sessionStorage` key `at`. Refresh token is expected as an HttpOnly cookie in the backend.
- `useAuthFetch` contains a commented, partially-implemented refresh flow — if you modify auth behavior, update that file and keep one re-request attempt on 401.

Patterns and conventions
- Prefer `useAuthFetch` for API calls that require Authorization headers or automatic refresh.
- When adding forms, follow existing patterns in `src/components/usuarios/` (controlled inputs, `Toast` component for errors).
- Routes/pages live in `src/pages/` (examples: `src/pages/usuarios/UsuariosLogin.jsx`, `src/pages/chamados/ChamadosIndex.jsx`).

Developer workflows
- Run dev: `npm run dev` (Vite). Lint: `npm run lint`.
- Environment variables: add a `.env` or `.env.local` with `VITE_API_BASE_URL=http://localhost:3000` during development.
- When changing auth or API calls, test both logged-in and logged-out flows (token present / absent). The app checks token expiration in `AuthContext.jsx`.

What to watch out for (gotchas)
- Some modules use hardcoded `http://localhost:3000` instead of `VITE_API_BASE_URL` — prefer the env var and update usages consistently.
- `useAuthFetch.jsx` currently returns the first response immediately (refresh logic is commented). If you enable refresh logic, ensure navigation on failed refresh uses `navigate('/usuarios/login', { replace: true })`.
- Token decoding: `AuthContext.jsx` decodes tokens and expects `exp` in payload for expiry checks.

When editing files
- Keep public APIs of hooks unchanged (`useAuth`, `useAuthFetch`) unless you update all call sites.
- Update `src/auth/*` and test flows with browser sessionStorage changes.

Where to look first for changes
- Authentication: `src/auth/*`
- Login/register forms: `src/components/usuarios/UsuarioFormLogin.jsx`, `UsuarioFormRegister.jsx`
- Pages: `src/pages/` (feature boundaries like `chamados` and `usuarios`).

If anything is unclear, ask the repo owner for the backend API contract (endpoints, refresh semantics, cookie domain). After changes, request the user to run the app locally with the dev server.
