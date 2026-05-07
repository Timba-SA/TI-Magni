# Verification: Backend - Implementación de Seed Data y DB Init

## Resultado de Verificación
- Se crearon los modelos `Rol` y `UsuarioRol` (Auth), `Usuario` (Usuarios), `EstadoPedido` y `FormaPago` (Pedidos).
- Se implementó `get_password_hash` en `app/core/security.py` utilizando `passlib` y `bcrypt`.
- Se creó `app/db/seed.py` con las funciones `seed_roles`, `seed_estados`, `seed_formas_pago` y `seed_admin` (con lógica idempotente).

## Tareas Completadas
- [x] Importar los modelos `Rol`, `EstadoPedido`, `FormaPago` y `Usuario`.
- [x] Configurar el utilitario de hashing de contraseñas temporal en `seed.py`.
- [x] Escribir función `seed_roles(session)`.
- [x] Escribir función `seed_estados(session)`.
- [x] Escribir función `seed_formas_pago(session)`.
- [x] Escribir función `seed_admin(session)`.
- [x] Integrar todo en una función `main()`.

## Acceptance Criteria
- [x] Script construido correctamente y lógica idempotente implementada.
- [ ] Ejecución en entorno validado por el usuario (debido a un error local de versión de SQLAlchemy en la máquina, el test final se delega a la validación en vivo).
