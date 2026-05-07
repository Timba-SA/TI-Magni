# Tasks: Frontend Folder Restructure

- [x] 1. Crear la carpeta `/frontend` en el directorio raíz.
- [x] 2. Mover carpetas `/src`, `/public`, `/dist` a `/frontend`.
- [x] 3. Mover archivos base del frontend (`index.html`, `package.json`, `tsconfig.json`, `vite.config.ts`, `postcss.config.mjs`, `default_shadcn_theme.css`) a `/frontend`.
- [x] 4. Modificar el archivo `pnpm-workspace.yaml` para incluir `frontend` y `backend`.
- [x] 5. Mover o eliminar la carpeta `node_modules` de la raíz, y ejecutar `pnpm install` desde la raíz para que resuelva los workspaces correctamente.
- [x] 6. Verificar que la aplicación arranque ejecutando `npm run dev` (o build) desde `/frontend`.
