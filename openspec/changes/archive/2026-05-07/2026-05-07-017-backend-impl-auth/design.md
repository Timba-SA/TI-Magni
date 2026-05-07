# Design: Backend — Autenticación JWT + RBAC

## Flujo de Autenticación

```
[POST /auth/login]
  → AuthService.login(email, password)
      → AuthRepository.get_user_by_email(email)
      → verify_password(plain, hash) → 403 si falla
      → create_access_token(user_id, roles)   → JWT 15min
      → create_refresh_token()                → UUID seguro
      → SHA-256(refresh_token) → guardar en RefreshToken
      → return TokenResponse

[POST /auth/refresh]
  → SHA-256(token_recibido) → buscar en DB
  → Verificar: no revocado, no expirado
  → Emitir nuevo access_token
  → Rotación: revocar token viejo, emitir refresh nuevo

[POST /auth/logout]
  → SHA-256(token_recibido) → buscar en DB
  → Setear revoked_at = now()
```

## Estructura del JWT (payload)

```json
{
  "sub": "42",
  "email": "admin@foodstore.com",
  "roles": ["ADMIN"],
  "exp": 1234567890
}
```

## Dependencias de FastAPI

- `get_current_user`: decodifica el Bearer token del header `Authorization`.
  Si el token está expirado o es inválido → HTTP 401.
- `require_role(*roles)`: factory que devuelve un `Depends()` y verifica que al menos uno de los roles requeridos esté en el payload.
  Si el usuario no tiene el rol → HTTP 403.

## Configuración de JWT en `config.py`

Agregar al modelo `Settings`:
- `JWT_SECRET_KEY: str` (sin default, obligatorio vía `.env`)
- `JWT_ALGORITHM: str = "HS256"`
- `ACCESS_TOKEN_EXPIRE_MINUTES: int = 15`
- `REFRESH_TOKEN_EXPIRE_DAYS: int = 7`

## Rate Limiting

Usar `slowapi` en el endpoint `POST /auth/login`:
`@limiter.limit("10/minute")`
Configurar el `Limiter` global en `middleware.py` y montarlo en `main.py`.

## Modelos (ya implementados, referencia)

- `Rol(codigo PK)` → `UsuarioRol(usuario_id, rol_codigo)` → `Usuario`
- `RefreshToken(token_hash CHAR(64), revoked_at nullable)`
