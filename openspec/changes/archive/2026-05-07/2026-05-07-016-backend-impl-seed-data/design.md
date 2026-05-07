# Design: Seed Data Idempotente

## Arquitectura de Ejecución
- El script vivirá en `backend/app/db/seed.py`.
- Se ejecutará manualmente como un script standalone (`python -m app.db.seed`) desde el contenedor del backend o por consola.
- Utilizará SQLModel y la sesión de base de datos directamente, saltándose las capas de servicio por ser una tarea de infraestructura.

## Patrón de Inserción: Idempotencia
Dado que el script se puede correr múltiples veces por accidente, todas las inserciones deben verificar la existencia previa del registro:
1. Hacer un `select` por campo único (ej. nombre del rol).
2. Si existe, no hacer nada (o actualizar flags).
3. Si no existe, hacer `add`.

## Dependencias de Contraseñas
Para el usuario administrador, usaremos `passlib` con `bcrypt` simulando la misma lógica que implementaremos en el módulo de seguridad, para que la clave `Admin1234!` se guarde ya hasheada.
