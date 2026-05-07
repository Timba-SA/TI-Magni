# Design: Backend — CRUD Ingredientes con Paginación, Soft Delete y Exportación

## Modelo de Datos

```python
class Ingrediente(SQLModel, table=True):
    __tablename__ = "ingredientes"
    id: Optional[int] = Field(primary_key=True)
    nombre: str = Field(max_length=100, unique=True)
    descripcion: Optional[str]
    es_alergeno: bool = Field(default=False)
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime]  # ← AGREGAR. None = activo
```

## Schemas Pydantic

```
IngredienteRead    → id, nombre, descripcion, es_alergeno, created_at, updated_at
IngredienteCreate  → nombre (required), descripcion, es_alergeno
IngredienteUpdate  → nombre?, descripcion?, es_alergeno? (todos opcionales)
PaginatedResponse  → items: list[IngredienteRead], total: int, skip: int, limit: int
```

## Repositorio — Queries especializadas

`IngredienteRepository` extiende `BaseRepository[Ingrediente]` y agrega:
- `list_with_filters(nombre?, es_alergeno?, skip, limit) → (list[Ingrediente], int)`
  - Siempre agrega `WHERE deleted_at IS NULL`
  - `nombre` → `ilike(f"%{nombre}%")` (búsqueda parcial, case-insensitive)
  - `es_alergeno` → filtro exacto booleano
  - Devuelve la lista paginada + el total para el header `X-Total-Count`
- `get_activo_by_id(id) → Ingrediente | None` — filtra `deleted_at IS NULL`

## Unit of Work

```python
class IngredienteUoW(UnitOfWork):
    def __init__(self, session):
        super().__init__(session)
        self.ingredientes = IngredienteRepository(session)
```

## Service — Lógica de negocio

Todas las operaciones reciben `uow: IngredienteUoW`:
- `listar(uow, nombre?, es_alergeno?, skip, limit) → PaginatedResponse`
- `obtener(uow, id) → Ingrediente` — lanza 404 si no existe o está borrado
- `crear(uow, data) → Ingrediente` — verifica nombre único antes de insertar
- `actualizar(uow, id, data) → Ingrediente`
- `eliminar(uow, id) → None` — llama a `uow.ingredientes.soft_delete(obj)`
- `exportar(uow, nombre?, es_alergeno?) → bytes` — genera el `.xlsx` en memoria

## Endpoint de Exportación

```
GET /api/v1/ingredientes/exportar?nombre=&es_alergeno=
→ StreamingResponse(content=bytes, media_type="application/vnd.openxmlformats...")
→ Header: Content-Disposition: attachment; filename="ingredientes.xlsx"
```

Se genera con `openpyxl`: crea un `Workbook`, escribe headers y filas, lo serializa a `BytesIO` y lo devuelve como `StreamingResponse`.

## Router

Todos los endpoints protegidos con `Depends(require_role("ADMIN", "STOCK"))` excepto el GET que solo requiere `get_current_user`.
