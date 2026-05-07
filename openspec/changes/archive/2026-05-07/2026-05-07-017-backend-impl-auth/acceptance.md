# Acceptance Criteria: Backend — Autenticación JWT + RBAC

## Criterios de Aceptación Funcionales

- [ ] `POST /api/v1/auth/login` con credenciales correctas retorna `access_token` y `refresh_token`. HTTP 200.
- [ ] `POST /api/v1/auth/login` con contraseña incorrecta retorna HTTP 401.
- [ ] `POST /api/v1/auth/login` con email inexistente retorna HTTP 401 (mismo mensaje, para no filtrar info).
- [ ] `POST /api/v1/auth/refresh` con un refresh token válido retorna un nuevo `access_token`. HTTP 200.
- [ ] `POST /api/v1/auth/refresh` con un refresh token ya revocado retorna HTTP 401.
- [ ] `POST /api/v1/auth/logout` revoca el refresh token (registro en DB con `revoked_at`). HTTP 204.
- [ ] Un endpoint protegido con `require_role("ADMIN")` retorna HTTP 403 si el usuario tiene rol `CLIENT`.
- [ ] Un endpoint protegido con `require_role("ADMIN")` retorna HTTP 401 si el token está vencido.
- [ ] La contraseña del admin NO aparece en ningún log ni en la respuesta de ningún endpoint.

## Criterios de Seguridad

- [ ] El refresh token en la base de datos es el hash SHA-256, nunca el token plaintext.
- [ ] Hacer 11 requests a `POST /auth/login` en un minuto retorna HTTP 429 en la undécima.
- [ ] El JWT usa el algoritmo HS256 y expira a los 15 minutos.
