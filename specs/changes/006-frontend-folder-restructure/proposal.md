# Proposal: Frontend Folder Restructure (006)

## Intent
El usuario solicitó mover todos los archivos y carpetas relacionados con el frontend a una nueva carpeta dedicada llamada `frontend` (corrigiendo el typo "frotend" de la petición original).

## Context
Actualmente, el código del frontend (React, Vite, Tailwind) reside directamente en la raíz del proyecto (`/src`, `/public`, `/package.json`, etc.), mientras que el backend ya cuenta con su propia carpeta `/backend`. Para lograr un proyecto verdaderamente Full Stack equilibrado, tanto el backend como el frontend deben estar aislados en sus respectivas carpetas principales.

## Scope
### In Scope
- Creación de la carpeta `/frontend` en la raíz del proyecto.
- Migración de las carpetas `/src`, `/public` y `/dist`.
- Migración de los archivos de configuración (`package.json`, `vite.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `default_shadcn_theme.css`, `index.html`).
- Actualización del workspace de pnpm (`pnpm-workspace.yaml`).
- Actualización de referencias relativas o scripts (si los hubiere) que asuman que el frontend está en la raíz.

### Out of Scope
- Modificación de lógica de negocio o componentes de React.
- Modificación del código backend.
