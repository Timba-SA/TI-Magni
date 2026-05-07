# Tasks: Backend — CRUD Ingredientes

## Modelo

- [x] Agregar campo `deleted_at: Optional[datetime] = Field(default=None)` al modelo `Ingrediente` en `models.py`.

## Schemas

- [x] Reescribir `ingredientes/schemas.py` con:
  - `IngredienteCreate(nombre, descripcion?, es_alergeno)`
  - `IngredienteUpdate(nombre?, descripcion?, es_alergeno?)` — todos opcionales
  - `IngredienteRead(id, nombre, descripcion, es_alergeno, created_at, updated_at)`
  - `IngredienteListResponse(items: list[IngredienteRead], total: int, skip: int, limit: int)`

## Repositorio

- [x] Reescribir `IngredienteRepository` para que extienda `BaseRepository[Ingrediente]`.
- [x] Agregar método `list_with_filters(nombre?, es_alergeno?, skip, limit) → tuple[list, int]`:
  - Filtrar siempre `deleted_at IS NULL`.
  - Soporte para búsqueda parcial `ilike` por nombre.
  - Soporte para filtro exacto por `es_alergeno`.
  - Devolver `(items, total_count)`.
- [x] Agregar método `get_activo_by_id(id) → Optional[Ingrediente]` con filtro `deleted_at IS NULL`.
- [x] Agregar método `get_activo_by_nombre(nombre) → Optional[Ingrediente]` con filtro `deleted_at IS NULL`.

## Unit of Work

- [x] Implementar `IngredienteUoW(UnitOfWork)` en `ingredientes/unit_of_work.py` exponiendo `self.ingredientes = IngredienteRepository(session)`.

## Service

- [x] Reescribir `IngredienteService` para que reciba `uow: IngredienteUoW` como parámetro (stateless).
- [x] `listar(uow, nombre, es_alergeno, skip, limit) → IngredienteListResponse`
- [x] `obtener(uow, id) → Ingrediente` — lanza HTTP 404 si no existe o `deleted_at IS NOT NULL`.
- [x] `crear(uow, data) → Ingrediente` — verifica unicidad del nombre. Lanza HTTP 409 si ya existe.
- [x] `actualizar(uow, id, data) → Ingrediente`
- [x] `eliminar(uow, id) → None` — usa `uow.ingredientes.soft_delete(obj)`.
- [x] `exportar(uow, nombre?, es_alergeno?) → bytes` — genera el `.xlsx` en memoria con `openpyxl`.

## Router

- [x] Reescribir `ingredientes/router.py` pasando el UoW a todos los endpoints.
- [x] `GET /ingredientes` — con query params `nombre`, `es_alergeno`, `skip`, `limit`.
- [x] `GET /ingredientes/exportar` — `StreamingResponse` con `Content-Disposition: attachment`.
  ⚠️ Declarado ANTES de `GET /ingredientes/{id}` para que FastAPI no confunda "exportar" con un ID.
- [x] `GET /ingredientes/{id}`
- [x] `POST /ingredientes` — protegido con `require_role("ADMIN", "STOCK")`.
- [x] `PATCH /ingredientes/{id}` — protegido con `require_role("ADMIN", "STOCK")`.
- [x] `DELETE /ingredientes/{id}` — protegido con `require_role("ADMIN", "STOCK")`.

## Dependencias

- [x] Agregar `openpyxl==3.1.2` a `requirements.txt`.
