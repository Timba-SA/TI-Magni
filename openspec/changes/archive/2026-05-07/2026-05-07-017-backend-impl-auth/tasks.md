# Tasks: Backend — Implementación de Autenticación

## Core / Infraestructura

- [x] Agregar variables JWT al modelo `Settings` en `core/config.py`: `JWT_SECRET_KEY`, `JWT_ALGORITHM`, `ACCESS_TOKEN_EXPIRE_MINUTES`, `REFRESH_TOKEN_EXPIRE_DAYS`.
- [x] Agregar `JWT_SECRET_KEY=supersecretkey` a `.env` (documentar en `.env.example`).
- [x] Implementar `create_access_token(data: dict) -> str` en `core/security.py` usando `python-jose`.
- [x] Implementar `create_refresh_token() -> str` en `core/security.py`: UUID4 como token plaintext (para enviar al cliente). El hash SHA-256 se guarda en DB.
- [x] Implementar `hash_refresh_token(token: str) -> str` en `core/security.py`: `hashlib.sha256(token.encode()).hexdigest()`.
- [x] Implementar `decode_access_token(token: str) -> dict` en `core/security.py`: devuelve payload o lanza `HTTPException(401)`.

## Auth Repository

- [x] Implementar `AuthRepository` en `auth/repository.py`:
  - `get_user_by_email(email: str) -> Usuario | None`
  - `get_user_roles(usuario_id: int) -> list[str]`
  - `get_refresh_token_by_hash(token_hash: str) -> RefreshToken | None`
  - `create_refresh_token(usuario_id: int, token_hash: str, expires_at: datetime) -> RefreshToken`
  - `revoke_refresh_token(refresh_token: RefreshToken) -> None`

## Auth Schemas

- [x] Crear `auth/schemas.py` con:
  - `LoginRequest(email: EmailStr, password: str)`
  - `TokenResponse(access_token: str, refresh_token: str, token_type: str = "bearer")`
  - `RefreshRequest(refresh_token: str)`

## Auth Service

- [x] Implementar `AuthService` en `auth/service.py`:
  - `login(uow, email, password) -> TokenResponse`: verifica credenciales, crea tokens, guarda hash en DB.
  - `refresh(uow, refresh_token_plain) -> TokenResponse`: valida hash en DB, rota el token (revoca viejo, crea nuevo).
  - `logout(uow, refresh_token_plain) -> None`: revoca el refresh token en DB.

## Auth Router

- [x] Implementar `auth/router.py` con:
  - `POST /api/v1/auth/login` → `AuthService.login` (con rate limiting `10/minute`).
  - `POST /api/v1/auth/refresh` → `AuthService.refresh`.
  - `POST /api/v1/auth/logout` → `AuthService.logout` (requiere autenticación).
- [x] Registrar el router en `app/main.py`.

## Dependencies

- [x] Implementar `get_current_user(token: str = Depends(oauth2_scheme))` en `core/dependencies.py`: decodifica el token, retorna el usuario activo o lanza HTTP 401.
- [x] Implementar `require_role(*roles: str)` en `core/dependencies.py`: fábrica de dependencias que valida que el usuario tenga al menos uno de los roles requeridos, o lanza HTTP 403.

## Middleware / Rate Limiting

- [x] Instanciar `Limiter` de `slowapi` en `core/middleware.py`.
- [x] Montar el handler de `RateLimitExceeded` en `app/main.py`.
