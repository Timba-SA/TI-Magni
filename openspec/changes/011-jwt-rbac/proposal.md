# Proposal: RBAC con JWT Real

## Change ID: `011-jwt-rbac`

## Intent
Implementar autenticación real con JWT (JSON Web Tokens) firmados por el servidor y un sistema de control de acceso basado en roles (RBAC) que reemplace la sesión simulada en localStorage actual.

## Roles del sistema
| Rol | Acceso admin | Permisos |
|---|---|---|
| `Admin` | Panel completo | Insumos, Categorías, Usuarios, cambiar roles de otros usuarios |
| `Encargado` | Panel parcial | Insumos, Categorías, Dashboard — sin gestión de usuarios |
| `Cliente` | Sin acceso al panel | Redirigido a la landing pública |

## Scope

### Backend
- Agregar `python-jose[cryptography]` a `requirements.txt`.
- Agregar `JWT_SECRET_KEY` y `JWT_ALGORITHM` a `config.py` y al `.env`.
- Crear `app/core/security.py`: `create_access_token()` y `decode_access_token()`.
- Crear `app/core/dependencies.py`: `get_current_user` (valida JWT del header) y `require_role(*roles)` (factory de guards).
- Actualizar `AuthService.authenticate_user()` para devolver un JWT firmado.
- Actualizar `LoginResponse` schema para incluir el campo `token`.
- Agregar `PATCH /api/auth/users/{id}/rol` (solo Admin).
- Proteger con guards:
  - `GET /api/auth/users` → solo Admin
  - `PATCH /api/auth/users/{id}/rol` → solo Admin
  - `POST /api/categorias`, `DELETE /api/categorias/{id}` → Admin o Encargado
  - `POST /api/insumos`, `PUT`, `PATCH`, `DELETE /api/insumos` → Admin o Encargado

### Frontend
- Actualizar `AuthUser` type para incluir el `token` (string).
- Actualizar `login()` en `authService.ts` para guardar el token.
- Actualizar `fetchApi` para enviar `Authorization: Bearer {token}` automáticamente.
- Crear `RoleGuard` component que protege rutas por rol.
- Actualizar `ProtectedRoute` para redirigir `Cliente` a `/` (no al panel).
- Actualizar sidebar para ocultar "Usuarios" a `Encargado`.
- Agregar UI de cambio de rol en `UsuariosPage` (solo visible para `Admin`).

## Approach
- JWT sin refresh token (una sola duración: 8 horas) para mantener la implementación simple.
- El token se guarda en `localStorage` junto a la sesión actual (sin romper el formato existente).
- La validación de roles en el backend es la fuente de verdad. El frontend solo oculta UI, no "protege" nada real.
