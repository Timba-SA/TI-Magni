# Verification: Backend — Autenticación JWT + RBAC

## Resultado de Verificación

Revisión código vs. acceptance criteria. **Todos los criterios cubiertos** por implementación.

## Criterios de Aceptación Funcionales

- [x] `POST /api/v1/auth/login` con credenciales correctas retorna `access_token` y `refresh_token`. HTTP 200.
  → `AuthService.login` crea ambos tokens y responde con `TokenResponse`.

- [x] `POST /api/v1/auth/login` con contraseña incorrecta retorna HTTP 401.
  → `service.py:27` — `if not user or not verify_password(...)` → raise HTTP 401.

- [x] `POST /api/v1/auth/login` con email inexistente retorna HTTP 401 (mismo mensaje).
  → Mismo bloque condicional. La condición corta con `not user` sin revelar si el email existe.

- [x] `POST /api/v1/auth/refresh` con un refresh token válido retorna un nuevo `access_token`. HTTP 200.
  → `AuthService.refresh` implementa rotación completa.

- [x] `POST /api/v1/auth/refresh` con un refresh token ya revocado retorna HTTP 401.
  → `get_refresh_token_by_hash` filtra `revoked_at == None`. Si no encuentra → HTTP 401.

- [x] `POST /api/v1/auth/logout` revoca el refresh token (registro en DB con `revoked_at`). HTTP 204.
  → `AuthService.logout` llama a `revoke_refresh_token` que setea `revoked_at = now()`.

- [x] Un endpoint protegido con `require_role("ADMIN")` retorna HTTP 403 si el usuario tiene rol `CLIENT`.
  → `require_role` en `dependencies.py` verifica intersección de roles → raise HTTP 403.

- [x] Un endpoint protegido con `require_role("ADMIN")` retorna HTTP 401 si el token está vencido.
  → `decode_access_token` en `security.py` atrapa `JWTError` → raise HTTP 401 antes de llegar a `require_role`.

- [x] La contraseña del admin NO aparece en ningún log ni en la respuesta de ningún endpoint.
  → `password_hash` nunca está en ningún schema de respuesta (`TokenResponse` solo tiene tokens).

## Criterios de Seguridad

- [x] El refresh token en la base de datos es el hash SHA-256, nunca el token plaintext.
  → `hash_refresh_token(refresh_plain)` en `security.py` con `hashlib.sha256`. El `refresh_plain` nunca se persiste.

- [x] Hacer 11 requests a `POST /auth/login` en un minuto retorna HTTP 429 en la undécima.
  → `@limiter.limit("10/minute")` en el router, handler `_rate_limit_exceeded_handler` en `main.py`.

- [x] El JWT usa el algoritmo HS256 y expira a los 15 minutos.
  → `JWT_ALGORITHM = "HS256"`, `ACCESS_TOKEN_EXPIRE_MINUTES = 15` en `config.py`.

## Archivos Implementados

| Archivo | Estado |
|---|---|
| `app/core/config.py` | JWT vars agregadas ✅ |
| `app/core/security.py` | Funciones JWT completas ✅ |
| `app/core/dependencies.py` | `get_current_user` + `require_role` ✅ |
| `app/core/middleware.py` | `Limiter` de slowapi ✅ |
| `app/modules/auth/models.py` | `expires_at` y `unique` en RefreshToken ✅ |
| `app/modules/auth/schemas.py` | `LoginRequest`, `TokenResponse`, `RefreshRequest` ✅ |
| `app/modules/auth/repository.py` | CRUD completo ✅ |
| `app/modules/auth/unit_of_work.py` | `AuthUoW` ✅ |
| `app/modules/auth/service.py` | `login`, `refresh`, `logout` ✅ |
| `app/modules/auth/router.py` | 3 endpoints con rate limiting ✅ |
| `backend/main.py` | Router registrado + slowapi handler ✅ |
| `requirements.txt` | `slowapi==0.1.9` ✅ |
| `.env` | `JWT_SECRET_KEY` ✅ |
