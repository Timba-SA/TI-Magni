# Proposal: Pagination and Excel Export (021)

## Intent
Implement a robust pagination system and Excel export capability across the three primary data modules: **Insumos**, **Categorías**, and **Usuarios**. This will improve frontend performance, reduce payload sizes, and allow users to export filtered data for external analysis.

## Scope
### Backend
- Estandarizar la paginación (`skip`, `limit`) en los routers y repositorios de `Usuarios` y `Categorías` (actualmente solo implementado en `Ingredientes/Insumos`).
- Implementar un endpoint GET `/exportar` en `Usuarios` y `Categorías` que devuelva un archivo `.xlsx` (utilizando la librería `openpyxl` existente), estandarizando el comportamiento con el módulo de `Ingredientes`.

### Frontend
- Crear un componente genérico de UI `<Pagination />`.
- Integrar la paginación en `InsumosTable`, `UsuariosTable` y `CategoriasTable`, modificando los hooks de obtención de datos para incluir los parámetros `skip` y `limit`.
- Modificar el flujo de exportación: descartar (o actualizar) la utilidad local frontend `exportExcel.ts` a favor de consumir los endpoints `/exportar` del backend. Esto asegura que la exportación refleje todos los registros que coincidan con los filtros aplicados y no solo los visibles en la página actual.

## Approach
1. **Backend Standardization**: The backend will be the source of truth for both pagination (calculating `total` records) and exporting (generating the `.xlsx` file). 
2. **Frontend Componentization**: A reusable Pagination component will handle the state and provide callbacks for page changes. Export actions will trigger a file download from the backend endpoint.

## User Review Required
> [!IMPORTANT]
> The existing frontend export utility (`exportExcel.ts`) will be replaced by backend-generated files. This ensures we can export *all* filtered records, not just the ones on the current page. ¿Estás de acuerdo con centralizar la exportación en el backend?
