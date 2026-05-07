# Tasks: Docker Infrastructure + PostgreSQL Migration (004)

## Fase 1: Backend — Migración PostgreSQL
- [x] 1.1 Agregar `psycopg2-binary==2.9.9` y `email-validator==2.1.1` a `backend/requirements.txt`.
- [x] 1.2 Modificar `backend/app/core/database.py`: mantener `connect_args` condicional (SQLite local / PostgreSQL Docker).
- [x] 1.3 Modificar `backend/app/core/config.py`: cambiar `DATABASE_URL` default a PostgreSQL (Docker override via env vars, `.env` local sigue en SQLite).

## Fase 2: Dockerfiles
- [x] 2.1 Crear `backend/Dockerfile`.
- [x] 2.2 Crear `backend/.dockerignore`.
- [x] 2.3 Crear `frontend/Dockerfile`.
- [x] 2.4 Crear `frontend/.dockerignore`.

## Fase 3: Vite config
- [x] 3.1 Modificar `frontend/vite.config.ts`: agregar `server: { host: true, port: 5173 }`.

## Fase 4: Docker Compose
- [x] 4.1 Crear `docker-compose.yml` en la raíz con servicios `db`, `backend` y `frontend`.

## Fase 5: Verificación
- [ ] 5.1 Ejecutar `docker compose up --build` y confirmar que los 3 servicios arrancan sin errores.
- [ ] 5.2 Verificar `http://localhost:8000/health` responde `{"status": "ok"}`.
- [ ] 5.3 Verificar `http://localhost:5173` carga la app.
- [ ] 5.4 Verificar que los datos iniciales aparecen automáticamente (auto-seed) y persisten tras reiniciar el contenedor.
