# ADR 001: Elección de FastAPI y React

## Contexto
Necesitamos construir una aplicación de inventario rápida, segura y altamente responsiva. Queríamos tipado estático tanto en frontend como en backend para reducir bugs en producción.

## Decisión
Se eligió **FastAPI (Python)** para el backend por su autogeneración de OpenAPI, validación estricta con Pydantic y velocidad. Para el frontend se eligió **React con TypeScript y Vite** por el ecosistema maduro y la velocidad de construcción.
La base de datos elegida fue **SQLite** para facilitar el desarrollo inicial, orquestada a través de SQLAlchemy.

## Consecuencias
**Positivas:**
- Tipado End-to-End.
- Frontend ultra rápido.
- Backend autodescriptivo.

**Negativas:**
- SQLite no es escalable horizontalmente de manera nativa (requerirá migración a PostgreSQL en el futuro).
