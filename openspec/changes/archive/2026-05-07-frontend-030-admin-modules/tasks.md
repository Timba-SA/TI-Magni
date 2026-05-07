# Tasks — 030 · Frontend: Módulos del Panel de Gestión

## Checklist

### Bloque 1 — Fix crítico de roles en Sidebar
- [x] **T01** · `AdminSidebar.tsx`: Cambiar `"Admin"` → `"ADMIN"` y `"Encargado"` → `"ENCARGADO"` en `ALL_NAV_ITEMS`

### Bloque 2 — Componente reutilizable BackToDashboard
- [x] **T02** · Crear `frontend/src/components/admin/BackToDashboard.tsx`  
  - Botón con icono `ArrowLeft` + texto "Volver al panel"  
  - `navigate("/home")` al hacer click  
  - Estilo consistente con el design system del proyecto (fondo oscuro, borde sutil, hover en naranja)

### Bloque 3 — Agregar BackToDashboard en páginas interiores
- [x] **T03** · `InsumosPage.tsx`: Insertar `<BackToDashboard />` en la parte superior del header
- [x] **T04** · `CategoriasPage.tsx`: Insertar `<BackToDashboard />` en la parte superior del header
- [x] **T05** · `UsuariosPage.tsx`: Insertar `<BackToDashboard />` en la parte superior del header

### Bloque 4 — Expandir DashboardPage con accesos rápidos a los nuevos módulos
- [x] **T06** · `DashboardPage.tsx`: Refactorizar el bloque "Acceso rápido" para soportar múltiples cards via array de configuración
- [x] **T07** · Agregar card de **Categorías** (navega a `/categorias`, ícono `Tag`)
- [x] **T08** · Agregar card de **Usuarios** (navega a `/usuarios`, ícono `Users`, solo visible si `user?.rol === "ADMIN"`)
