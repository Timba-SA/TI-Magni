# Proposal: 001-backend-auth-module

## Contexto
El sistema necesita restringir el acceso a ciertas áreas (como el dashboard y gestión de inventario). Actualmente no existe un mecanismo de autenticación.

## Intención
Crear un módulo backend de autenticación que permita registrar usuarios y autenticarlos, devolviendo tokens seguros.

## Alcance
- Modelo de base de datos para usuarios.
- Endpoints de login y registro (`/api/auth/login`, `/api/auth/register`).
- Encriptación de contraseñas.
- Integración con el patrón Unit of Work.
