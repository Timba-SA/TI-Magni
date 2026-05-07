# Acceptance: Frontend Folder Restructure

1. **Ubicación**: Todos los archivos relacionados con la aplicación React deben residir dentro del directorio `/frontend`.
2. **Raíz limpia**: La raíz del proyecto ya no debe contener las carpetas `src`, `public` ni archivos como `package.json` de React.
3. **Ejecución**: Debemos poder acceder a `/frontend`, ejecutar `pnpm run dev` (o npm run dev) y la aplicación frontend debe cargar sin errores de rutas ni problemas de dependencias.
4. **Workspace**: `pnpm-workspace.yaml` está configurado correctamente para gestionar ambos paquetes (frontend/backend).
