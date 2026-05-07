# Especificación del proyecto — The Food Store

## Resumen
The Food Store es una aplicación web Full Stack para la gestión de inventario, pedidos y usuarios. Cuenta con un frontend moderno y reactivo, y un backend robusto basado en API REST.

## Frontend
- **Framework:** React con Vite.
- **Lenguaje:** TypeScript.
- **Estilos:** Tailwind CSS.
- **Componentes:** shadcn/ui.
- **Routing:** React Router.
- **Características:** Landing pública visual/editorial, Login, Dashboard, Módulo de insumos, arquitectura basada en features.

## Backend
- **Framework:** FastAPI (Python).
- **ORM:** SQLAlchemy.
- **Validación:** Pydantic.
- **Base de Datos:** SQLite (preparado para evolución).
- **Arquitectura:** Modular, orientada a dominios (Routers -> Services -> Unit of Work -> Repositories).
- **Características:** Documentación OpenAPI/Swagger automática, CORS configurado, seed inicial, healthcheck.

## Dominios actuales
- `auth`: Autenticación, login y registro.
- `insumos`: Gestión de inventario de materias primas y productos.

## API actual conocida
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/insumos`
- `POST /api/insumos`
- `GET /api/insumos/{id}`
- `PUT /api/insumos/{id}`
- `PATCH /api/insumos/{id}`
- `DELETE /api/insumos/{id}`
- `PATCH /api/insumos/{id}/reactivar`
- `GET /api/insumos/stats/resumen`
- `GET /health`

## Principios de arquitectura
- **Frontend:** Separación de responsabilidades mediante hooks personalizados, servicios API centralizados y componentes presentacionales vs contenedores.
- **Backend:** Inversión de control y transaccionalidad manejada por el patrón Unit of Work. Los controladores (routers) son delgados y delegan la lógica a los servicios.

## Reglas importantes
Ver `/agents.md` para el listado exhaustivo de reglas técnicas y metodológicas. La regla principal es el uso obligatorio de Spec-Driven Development (SDD) para cualquier cambio.

## Evolución futura
Cualquier módulo nuevo (ej: pedidos, usuarios, reportes) debe seguir la estructura actual de dominios y respetar el flujo de aprobación SDD.
