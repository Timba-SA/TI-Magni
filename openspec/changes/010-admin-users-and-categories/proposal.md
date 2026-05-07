# Proposal: Admin — Usuarios y Categorías Dinámicas

## Intent
Ampliar el panel de gestión con dos nuevos módulos:
1. **Usuarios:** listado de todos los usuarios registrados en el sistema.
2. **Categorías:** CRUD completo con persistencia en base de datos, reemplazando el array hardcodeado del frontend.

## Scope

### Backend
- Nuevo módulo `categorias` (model, schemas, repository, service, router).
- Nuevo endpoint `GET /api/users` en el módulo de auth.
- Registrar el nuevo router en `main.py`.
- Exponer `get_all` en `UserRepository`.
- Registrar `CategoriaRepository` en el `UnitOfWork`.

### Frontend
- Nueva página `/categorias` con tabla + formulario inline de creación y eliminación.
- Nueva página `/usuarios` con tabla de solo lectura.
- Actualizar `InsumoForm.tsx` para cargar categorías desde la API.
- Agregar rutas en `AppRouter.tsx`.
- Agregar ítems en `AdminSidebar.tsx`.
- Nuevos tipos y servicios: `categoria.types.ts`, `categoriasService.ts`, `usersService.ts`.

## Approach
- Opción A: Categorías dinámicas con BD, aprobada por el usuario.
- Seguir la arquitectura en capas del proyecto: routers → services → UoW → repositories.
