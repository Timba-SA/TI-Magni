# Proposal: Docker Infrastructure + PostgreSQL Migration (004)

## Intención
Contenerizar completamente la aplicación (frontend + backend + base de datos) y migrar de SQLite a PostgreSQL, de modo que `docker compose up` levante todo el stack sin ninguna dependencia local.

## Contexto
Actualmente:
- El frontend corre con `npm run dev` en la raíz de `frontend/`.
- El backend corre con `uvicorn` en `backend/` con un entorno virtual Python manual.
- La base de datos es un archivo SQLite (`the_food_store.db`).

## Scope
### In Scope
- `backend/Dockerfile`: imagen `python:3.11-slim`, instala dependencias, corre uvicorn.
- `frontend/Dockerfile`: imagen `node:20-slim` con pnpm, dev server de Vite expuesto en `:5173`.
- `docker-compose.yml`: orquesta los 3 servicios (db, backend, frontend) con health checks y depends_on.
- Servicio `db`: imagen oficial `postgres:16-alpine`, volumen persistente.
- **Migración SQLite → PostgreSQL**:
  - Agregar `psycopg2-binary` a `requirements.txt`.
  - Cambiar `DATABASE_URL` default en `config.py` a formato PostgreSQL.
  - Ajustar `database.py`: eliminar el `connect_args` específico de SQLite.
  - El script `seed_db.py` sigue funcionando sin cambios (es ORM puro).
- `.dockerignore` para backend y frontend.
- Modificar `vite.config.ts`: agregar `server.host: true` para exponer el dev server.

### Out of Scope
- Migraciones con Alembic (el schema se recrea via `create_all` al iniciar el backend).
- Configuración de producción (nginx, SSL, build estático).
- Backup automatizado de PostgreSQL.

## Justificación
PostgreSQL es el estándar de la industria para proyectos FastAPI + SQLAlchemy. La arquitectura del backend (ORM con SQLAlchemy) ya está lista para el cambio — solo hay que cambiar el driver y la URL de conexión.

## Riesgos
- El `create_all` crea las tablas si no existen, pero no migra datos del SQLite existente. Los datos de desarrollo se pierden — se resuelve corriendo `seed_db.py` una vez levantado el stack.
