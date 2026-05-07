# Verification: Backend — CRUD Ingredientes

## Resultado de Revisión

Revisión código vs. acceptance criteria. **Todos los criterios cubiertos.** Se detectaron y corrigieron 3 bugs durante la revisión.

## Bugs Corregidos Post-Implementación

| # | Bug | Archivo | Fix |
|---|---|---|---|
| 1 | `uow.commit()` explícito dentro del `with` → doble commit | `service.py` | Eliminados. `UoW.__exit__` hace el commit final |
| 2 | Nombre de método incorrecto `get_activo_by_id_by_nombre` | `service.py` | Corregido a `get_activo_by_nombre` |
| 3 | Comentario confuso en `StreamingResponse` | `router.py` | Aclarado con comentario explicativo |

## Criterios de Aceptación — CRUD Básico

- [x] `GET /ingredientes` retorna HTTP 200 con lista paginada. Excluye `deleted_at IS NOT NULL`.
  → `list_with_filters` siempre aplica `.where(Ingrediente.deleted_at == None)`.

- [x] `GET /ingredientes/{id}` retorna HTTP 404 para un ID inexistente o con `deleted_at` seteado.
  → `get_activo_by_id` filtra `deleted_at == None`. El service lanza HTTP 404 si no encuentra.

- [x] `POST /ingredientes` retorna HTTP 201 con el ingrediente creado.
  → `crear()` instancia el modelo y llama `uow.ingredientes.add(obj)`.

- [x] `POST /ingredientes` con un nombre ya existente retorna HTTP 409.
  → `get_activo_by_nombre` verifica duplicados antes de insertar.

- [x] `PATCH /ingredientes/{id}` actualiza solo los campos enviados. HTTP 200.
  → `model_dump(exclude_unset=True)` + `setattr` loop.

- [x] `DELETE /ingredientes/{id}` retorna HTTP 204 y setea `deleted_at` (NO borra la fila).
  → `uow.ingredientes.soft_delete(obj)` del `BaseRepository`.

## Criterios de Aceptación — Paginación y Filtros

- [x] `?nombre=x` → búsqueda parcial case-insensitive.
  → `.ilike(f"%{nombre}%")`.

- [x] `?es_alergeno=true` → solo alérgenos.
  → `.where(Ingrediente.es_alergeno == es_alergeno)`.

- [x] `?skip=0&limit=5` → máximo 5 registros.
  → `.offset(skip).limit(limit)`.

- [x] Respuesta incluye campo `total`.
  → `func.count()` sobre el subquery base (sin paginación).

## Criterios de Aceptación — Exportación

- [x] `GET /exportar` retorna Content-Type xlsx.
  → `StreamingResponse` con `media_type="application/vnd.openxmlformats..."`.

- [x] Archivo `.xlsx` válido con columnas: ID, Nombre, Descripción, Alérgeno, Creado.
  → `openpyxl.Workbook` con headers y filas correctas.

- [x] Filtros `nombre` y `es_alergeno` funcionan en exportación.
  → `exportar()` llama a `list_with_filters` con los mismos parámetros.

## Criterios de Aceptación — Arquitectura

- [x] `IngredienteService` no tiene referencia directa a `session`.
  → Solo accede via `uow.ingredientes.*`.

- [x] El `DELETE` nunca ejecuta SQL `DELETE`.
  → `soft_delete()` del `BaseRepository` solo hace `UPDATE` seteando `deleted_at`.

- [x] Endpoints de escritura retornan HTTP 401 sin token.
  → `require_role(...)` encadena `get_current_user` que lanza 401 si no hay Bearer token.

- [x] Endpoints de escritura retornan HTTP 403 con rol `CLIENT`.
  → `require_role("ADMIN", "STOCK")` verifica intersección de roles.

## Archivos Implementados

| Archivo | Estado |
|---|---|
| `ingredientes/models.py` | `deleted_at` agregado ✅ |
| `ingredientes/schemas.py` | `IngredienteListResponse` con paginación ✅ |
| `ingredientes/repository.py` | Extiende `BaseRepository`, filtros, paginación ✅ |
| `ingredientes/unit_of_work.py` | `IngredienteUoW` funcional ✅ |
| `ingredientes/service.py` | Stateless con UoW, exportación xlsx ✅ |
| `ingredientes/router.py` | `/exportar` antes de `/{id}`, RBAC ✅ |
| `requirements.txt` | `openpyxl==3.1.2` ✅ |
