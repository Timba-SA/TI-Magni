# Design: Pagination and Excel Export (021)

## Architecture Decisions

### 1. Pagination Pattern
- **Backend**: Use `skip` and `limit` query parameters. Service methods will return a response containing `items` (list of entities), `total` (count of total matches), `skip`, and `limit`.
- **Frontend**: The generic `<Pagination />` component will use `total`, `skip` (as `page = skip / limit + 1`), and `limit` to render navigation controls. The parent page component will manage the `skip` and `limit` state.

### 2. Export Pattern
- **Backend**: Provide a GET `/exportar` endpoint for each module. These endpoints will accept the same filtering parameters as the list endpoint but will ignore `skip` and `limit` to export the full filtered dataset. They will use `openpyxl` to generate a `StreamingResponse` with `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`.
- **Frontend**: A generic `downloadFile` utility will be used to handle the `Blob` response and trigger the browser's download prompt.

## Affected Components

### Backend
- `app/modules/categorias/router.py`, `service.py`, `repository.py`, `schemas.py`
- `app/modules/usuarios/router.py`, `service.py`, `repository.py`, `schemas.py`
- `app/modules/ingredientes/schemas.py` (Ensure `IngredienteListResponse` aligns with the pattern)

### Frontend
- `src/components/ui/pagination.tsx` (NEW)
- `src/utils/downloadFile.ts` (NEW / Modify existing)
- `src/pages/insumos/InsumosPage.tsx`
- `src/pages/usuarios/UsuariosPage.tsx`
- `src/pages/categorias/CategoriasPage.tsx`
- Relevant service files (`usersService.ts`, `categoriasService.ts`)
