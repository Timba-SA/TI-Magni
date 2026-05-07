# Acceptance Criteria: Seed Data

- [ ] Correr `python -m app.db.seed` inserta los datos iniciales y termina sin errores.
- [ ] Correr `python -m app.db.seed` por segunda vez consecutiva no arroja errores de duplicados (Idempotencia).
- [ ] Inspeccionar la base de datos (con dbeaver o script) confirma que los roles y el administrador están guardados correctamente.
- [ ] La contraseña del administrador en base de datos es un hash ilegible, no un texto plano.
