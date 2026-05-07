# Proposal: Backend — Implementación de Autenticación (JWT + RBAC)

## Contexto y Objetivo

Implementar el sistema de autenticación y autorización completo del backend. Este módulo es la **puerta de entrada a todo el sistema**: sin él no puede funcionar ni la protección de endpoints, ni el panel de administración, ni la validación de roles.

La especificación exige:
- **JWT** con access token de corta vida (15min) y refresh token de larga vida (7 días).
- **RBAC** con 4 roles: `ADMIN`, `STOCK`, `PEDIDOS`, `CLIENT`.
- **bcrypt** con cost ≥ 12 para el hash de contraseñas.
- **Refresh token almacenado como hash SHA-256** (nunca plaintext en DB).
- **Rate limiting** en el endpoint de login para protección contra brute force.
- **Revocación de refresh token** en logout.

## Alcance de Este Change

| Componente | Archivo | Descripción |
|---|---|---|
| Seguridad JWT | `core/security.py` | Funciones `create_access_token`, `create_refresh_token`, `decode_token` |
| Config JWT | `core/config.py` | Variables `JWT_SECRET_KEY`, `JWT_ALGORITHM`, `ACCESS_TOKEN_EXPIRE_MINUTES`, `REFRESH_TOKEN_EXPIRE_DAYS` |
| Schemas | `auth/schemas.py` | `LoginRequest`, `TokenResponse`, `RefreshRequest` |
| Repository | `auth/repository.py` | Queries sobre `Rol`, `UsuarioRol`, `RefreshToken` |
| Service | `auth/service.py` | Lógica de `login`, `refresh`, `logout` |
| Router | `auth/router.py` | `POST /api/v1/auth/login`, `POST /api/v1/auth/refresh`, `POST /api/v1/auth/logout` |
| Dependencias | `core/dependencies.py` | `get_current_user`, `require_role(...)` |

## Lo que YA está hecho (no tocar)
- Modelos `Rol`, `UsuarioRol`, `RefreshToken` en `auth/models.py` ✅
- Modelo `Usuario` en `usuarios/models.py` ✅
- `get_password_hash` y `verify_password` en `core/security.py` ✅
