# Tasks: Implementación de Seed Data

- [x] Importar los modelos `Rol`, `EstadoPedido`, `FormaPago` y `Usuario` (creándolos/corrigiéndolos si es necesario en sus respectivos archivos de modelos).
- [x] Configurar el utilitario de hashing de contraseñas temporal en `seed.py` (o adelantar la creación de `core/security.py:get_password_hash`).
- [x] Escribir función `seed_roles(session)` que inserte ADMIN, STOCK, PEDIDOS, CLIENT si no existen.
- [x] Escribir función `seed_estados(session)` que inserte PENDIENTE, CONFIRMADO, EN_PREP, EN_CAMINO, ENTREGADO (es_terminal=True), CANCELADO (es_terminal=True).
- [x] Escribir función `seed_formas_pago(session)` que inserte MERCADOPAGO, EFECTIVO, TRANSFERENCIA.
- [x] Escribir función `seed_admin(session)` que cree el usuario `admin@foodstore.com` con su rol `ADMIN` asociado.
- [x] Integrar todo en una función `main()` dentro de un bloque `if __name__ == "__main__":` obteniendo la sesión del `database.py`.

