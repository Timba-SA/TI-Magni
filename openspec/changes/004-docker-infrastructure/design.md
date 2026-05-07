# Design: Docker Infrastructure + PostgreSQL Migration (004)

## Stack de contenedores

```
docker-compose.yml (raíz)
├── service: db (postgres:16-alpine)
│   ├── Puerto: 5432
│   ├── Volumen: postgres_data (named volume, persistente)
│   └── Health check: pg_isready
│
├── service: backend (python:3.11-slim)
│   ├── Puerto: 8000
│   ├── depends_on: db (condición: healthy)
│   ├── Vars de entorno: DATABASE_URL, APP_NAME, FRONTEND_ORIGIN
│   └── Comando: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
│
└── service: frontend (node:20-slim)
    ├── Puerto: 5173
    ├── depends_on: backend
    └── Comando: pnpm dev
```

## Decisiones de diseño

### `python:3.11-slim` para el backend
Alpine tiene problemas con `bcrypt` y `psycopg2` por falta de librerías C. `slim` resuelve esto sin overhead innecesario.

### `psycopg2-binary` vs `psycopg2`
Se usa `psycopg2-binary` porque incluye el driver compilado, sin necesidad de `libpq-dev` en la imagen. Suficiente para desarrollo.

### DATABASE_URL en Docker
```
postgresql://postgres:postgres@db:5432/food_store
```
El hostname `db` resuelve al contenedor de PostgreSQL dentro de la red de Docker Compose. En el `.env` local sigue apuntando a SQLite para desarrollo fuera de Docker.

### `server.host: true` en Vite
Sin esta opción, el dev server de Vite solo escucha en `127.0.0.1` dentro del contenedor. Con `host: true` escucha en `0.0.0.0` y se puede acceder desde el host en `localhost:5173`.

### Seed de datos
Los datos NO se migran automáticamente desde SQLite. Después de levantar el stack, hay que correr una vez:
```bash
docker compose exec backend python scripts/seed_db.py
```

## Archivos modificados

| Archivo | Tipo | Descripción |
|---|---|---|
| `backend/Dockerfile` | NUEVO | Multi-step: instala deps, copia código |
| `backend/.dockerignore` | NUEVO | Excluye venv, __pycache__, .env, .db |
| `frontend/Dockerfile` | NUEVO | Instala pnpm, copia código, expone 5173 |
| `frontend/.dockerignore` | NUEVO | Excluye node_modules, dist |
| `docker-compose.yml` | NUEVO | 3 servicios: db, backend, frontend |
| `backend/requirements.txt` | MODIFICAR | Agrega `psycopg2-binary` |
| `backend/app/core/database.py` | MODIFICAR | Elimina `connect_args` condicional |
| `backend/app/core/config.py` | MODIFICAR | Cambia DATABASE_URL default a PostgreSQL |
| `frontend/vite.config.ts` | MODIFICAR | Agrega `server.host: true`, `server.port: 5173` |
