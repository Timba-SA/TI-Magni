# Proposal: Backend — CRUD Completo de Ingredientes (Insumos)

## Contexto y Objetivo

Este módulo es el **primer CRUD de negocio** que se va a entregar al corrector. Ya existe una versión anterior del módulo (del trabajo anterior), pero **necesita ser refactorizada completamente** para cumplir con la nueva arquitectura (UoW pattern) y los requerimientos específicos de la entrega.

## Estado Actual (lo que YA existe pero está MAL o INCOMPLETO)

| Componente | Estado | Problema |
|---|---|---|
| `models.py` | ⚠️ Incompleto | Falta el campo `deleted_at` — sin él la baja lógica es imposible |
| `repository.py` | ⚠️ Incompleto | No usa `BaseRepository`. Faltan filtros por nombre y paginación |
| `service.py` | ❌ No usa UoW | Recibe `session` directamente en lugar de `UoW`. Viola la arquitectura |
| `router.py` | ⚠️ Incompleto | No hay paginación en el listado. No existe endpoint de exportación |
| `unit_of_work.py` | ⚠️ Placeholder | Existe el archivo pero está vacío |

## Requerimientos de la Entrega (lo que DEBE funcionar)

### 1. CRUD Completo
- `GET /ingredientes` — Listar con paginación y filtros (nombre, alérgeno, solo activos)
- `GET /ingredientes/{id}` — Obtener por ID
- `POST /ingredientes` — Crear nuevo ingrediente
- `PATCH /ingredientes/{id}` — Editar parcialmente
- `DELETE /ingredientes/{id}` — **Baja lógica** (setea `deleted_at`, NO borra la fila)

### 2. Paginación y Filtros (query params)
- `?nombre=queso` — búsqueda parcial case-insensitive por nombre
- `?es_alergeno=true/false` — filtro por flag de alérgeno
- `?skip=0&limit=20` — paginación offset/limit

### 3. Exportación a Excel
- `GET /ingredientes/exportar` — devuelve un archivo `.xlsx` con todos los ingredientes activos (respetando filtros de nombre y alérgeno)
- Generado con `openpyxl` (ya disponible como dependencia transitiva de pandas, o agregar directo)

### 4. Arquitectura
- El `IngredienteService` debe recibir un `IngredienteUoW`, no la sesión directamente
- El router instancia el UoW con `Depends(get_session)` y lo pasa al servicio

## Lo que NO se toca en este change
- El modelo `ProductoIngrediente` (pertenece al dominio de Productos)
- Ningún archivo del frontend
