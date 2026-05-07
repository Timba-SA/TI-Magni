# Design: Frontend Folder Restructure

## Architecture
La estructura del proyecto pasará de ser un frontend en la raíz con un backend en una subcarpeta, a ser un monorepo real con dos paquetes claramente definidos:

### Estructura actual:
```
/the food store
  /backend
  /src
  /public
  package.json
  vite.config.ts
  ...
```

### Nueva estructura:
```
/the food store
  /backend
  /frontend
    /src
    /public
    package.json
    vite.config.ts
    ...
  pnpm-workspace.yaml
```

## Considerations
- **pnpm workspaces**: El archivo `pnpm-workspace.yaml` en la raíz debe ser modificado para apuntar a `frontend` y `backend`.
  ```yaml
  packages:
    - 'frontend'
    - 'backend'
  ```
- **node_modules**: Será necesario reinstalar las dependencias o moverlas con cuidado (lo más prudente será reinstalarlas en la nueva ruta para evitar errores de links).
