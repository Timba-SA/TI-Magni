# Acceptance Criteria: Backend — CRUD Ingredientes

## CRUD Básico

- [ ] `GET /api/v1/ingredientes` retorna HTTP 200 con lista paginada. La lista excluye ingredientes con `deleted_at IS NOT NULL`.
- [ ] `GET /api/v1/ingredientes/{id}` retorna HTTP 200 para un ingrediente activo.
- [ ] `GET /api/v1/ingredientes/{id}` retorna HTTP 404 para un ID inexistente o con `deleted_at` seteado.
- [ ] `POST /api/v1/ingredientes` retorna HTTP 201 con el ingrediente creado.
- [ ] `POST /api/v1/ingredientes` con un nombre ya existente retorna HTTP 409.
- [ ] `PATCH /api/v1/ingredientes/{id}` actualiza solo los campos enviados. HTTP 200.
- [ ] `DELETE /api/v1/ingredientes/{id}` retorna HTTP 204 y setea `deleted_at` en la fila (NO la borra).

## Paginación y Filtros

- [ ] `GET /api/v1/ingredientes?nombre=que` retorna solo ingredientes cuyo nombre contiene "que" (case-insensitive).
- [ ] `GET /api/v1/ingredientes?es_alergeno=true` retorna solo ingredientes marcados como alérgenos.
- [ ] `GET /api/v1/ingredientes?skip=0&limit=5` retorna como máximo 5 registros.
- [ ] La respuesta incluye el campo `total` con la cantidad total de registros que cumplen el filtro.

## Exportación

- [ ] `GET /api/v1/ingredientes/exportar` retorna HTTP 200 con `Content-Type: application/vnd.openxmlformats...`.
- [ ] El archivo descargado es un `.xlsx` válido con columnas: `ID`, `Nombre`, `Descripción`, `Alérgeno`, `Creado`.
- [ ] Los filtros `nombre` y `es_alergeno` funcionan también en el endpoint de exportación.

## Arquitectura

- [ ] `IngredienteService` no tiene referencia directa a `session`. Solo usa `uow.ingredientes.*`.
- [ ] El endpoint `DELETE` **nunca** ejecuta una sentencia SQL `DELETE`. Verificable inspeccionando los logs de SQLAlchemy.
- [ ] Los endpoints de escritura (`POST`, `PATCH`, `DELETE`) retornan HTTP 401 si se llaman sin token.
- [ ] Los endpoints de escritura retornan HTTP 403 si se llaman con un token de rol `CLIENT`.
