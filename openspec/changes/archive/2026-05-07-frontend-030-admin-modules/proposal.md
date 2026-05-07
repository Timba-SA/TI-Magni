# Proposal — 030 · Frontend: Módulos del Panel de Gestión

## Estado: Aprobado pendiente de implementación

## Problema
El panel de administración tiene rutas definidas para `/categorias` y `/usuarios`,  
pero en la práctica el sistema tiene tres deficiencias críticas:

1. **Sidebar con roles desalineados:** `ALL_NAV_ITEMS` filtra por `"Admin"` (CamelCase), pero  
   tras la corrección de autenticación el rol del usuario es `"ADMIN"` (mayúsculas).  
   Resultado: ningún módulo aparece en el sidebar para el usuario administrador.

2. **DashboardPage incompleto:** El panel principal solo lista el módulo de Insumos  
   como "Acceso rápido". Faltan los cards de Categorías y Usuarios.

3. **Sin botón "Volver al panel":** Al navegar a un submódulo (`/insumos`, `/categorias`,  
   `/usuarios`), no hay botón contextual para volver al dashboard `/home`.

## Solución propuesta

### 1 · Corregir los roles en el Sidebar (`AdminSidebar.tsx`)
Actualizar el array `ALL_NAV_ITEMS` para que use los roles en mayúsculas (`ADMIN`, `ENCARGADO`)  
en lugar de CamelCase. Esto desbloquea la visibilidad de los módulos en el sidebar.

### 2 · Expandir el Dashboard (`DashboardPage.tsx`)
Agregar dos nuevos cards en la sección "Acceso rápido":
- **Categorías** → navega a `/categorias`, describe el CRUD de categorías.
- **Usuarios** → navega a `/usuarios`, solo visible para ADMIN.

### 3 · Añadir botón "Volver al panel" en las páginas interiores
Agregar un breadcrumb/botón en la parte superior de `InsumosPage`, `CategoriasPage` y  
`UsuariosPage` que lleve de vuelta al dashboard (`/home`).  
Componente reutilizable `BackToDashboard` en `src/components/admin/`.

## Alcance
- **Solo frontend** — No requiere cambios en el backend ni en rutas del router.
- Archivos afectados:
  - `frontend/src/components/admin/AdminSidebar.tsx`
  - `frontend/src/pages/dashboard/DashboardPage.tsx`
  - `frontend/src/pages/insumos/InsumosPage.tsx`
  - `frontend/src/pages/categorias/CategoriasPage.tsx`
  - `frontend/src/pages/usuarios/UsuariosPage.tsx`
  - `frontend/src/components/admin/BackToDashboard.tsx` *(nuevo)*

## No incluye
- Implementación de funcionalidad nueva en CategoriasPage (ya existente, CRUD ya implementado)
- Cambios en UsuariosPage (ya implementada en sesión anterior)
- Nuevas rutas en AppRouter
