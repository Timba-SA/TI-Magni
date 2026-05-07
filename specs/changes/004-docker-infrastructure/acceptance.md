# Acceptance: Docker Infrastructure + PostgreSQL Migration (004)

1. **Single command**: `docker compose up --build` desde la raíz levanta los 3 servicios sin errores.
2. **Backend**: `http://localhost:8000/health` responde `{"status": "ok"}`.
3. **Frontend**: `http://localhost:5173` carga la aplicación React.
4. **Base de datos**: PostgreSQL corre en el contenedor `db` y el backend se conecta exitosamente.
5. **Seed**: `docker compose exec backend python scripts/seed_db.py` puebla la base de datos sin errores.
6. **Login funcional**: se puede ingresar con `admin / admin123` y operar el CRUD de insumos.
7. **Persistencia**: los datos sobreviven a un `docker compose restart`.
8. **Sin dependencias locales**: no se requiere Python, pip, Node ni pnpm en el host.
