# Design: 001-backend-auth-module

## Arquitectura
- **Router:** `backend/app/modules/auth/router.py` (Manejo de HTTP).
- **Service:** `AuthService` para orquestar la lógica de validación de contraseñas y generación de sesión.
- **Repository:** `UserRepository` para encapsular las consultas SQLAlchemy sobre el modelo `User`.
- **Seguridad:** Encriptación usando bcrypt.

## Base de Datos
- Tabla `users` con columnas: `id`, `username`, `email`, `hashed_password`, `nombre`, `rol`.
