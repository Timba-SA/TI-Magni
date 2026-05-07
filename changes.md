# Índice Activo de Cambios (SDD)

Este documento mantiene el registro de todos los cambios gestionados bajo la metodología Spec-Driven Development (SDD) en The Food Store.

### Estados permitidos:
- **Draft:** Propuesta en redacción.
- **Approved:** Propuesta aprobada, lista para implementación.
- **In Progress:** Implementación en curso.
- **Done:** Implementado y verificado.
- **Rejected:** Propuesta rechazada.

## Registro de Cambios

| Change ID | Estado | Contexto | Artefactos |
|---|---|---|---|
| 000-project-baseline | Done | Documentación del estado actual del proyecto The Food Store | proposal, design, tasks, acceptance, verification |
| 001-backend-auth-module | Done | Creación del módulo de autenticación backend (JWT, bcrypt, SQLite) | proposal, design, tasks, acceptance, verification |
| 002-frontend-landing-premium | Done | Desarrollo de la UI pública premium con Tailwind y React Router | proposal, design, tasks, acceptance, verification |
| 003-fullstack-insumos-crud | Done | Implementación End-to-End del módulo de Insumos con baja lógica | proposal, design, tasks, acceptance, verification |
| 004-docker-infrastructure | Done | Contenerización de la aplicación con Docker y Docker Compose | proposal, tasks, verification |
| 005-dashboard-analytics | Done | Implementación de métricas y KPIs dinámicos basados en stock e inventario | proposal, design, tasks, verification |
| 006-frontend-folder-restructure | Done | Mover todos los archivos y carpetas del frontend a una nueva carpeta `frontend` | proposal, design, tasks, acceptance, verification |
| 007-premium-ui-reservas-contacto | Done | Rediseño premium de páginas Reservas y Contacto | proposal, design, tasks, acceptance, verification |
| 008-cleanup-fake-data | Done | Limpieza de datos falsos del script de seed para iniciar con base de datos limpia | proposal, state |
| 009-premium-ui-insumos-form | Done | Rediseño premium del formulario de Nuevo/Editar Insumo | proposal, design, tasks, state |
| 010-admin-users-and-categories | Done | Módulo de usuarios (listado) y categorías dinámicas (CRUD) en el panel admin | proposal |
| 011-jwt-rbac | Done | JWT real + RBAC: roles Admin / Encargado / Cliente con guards en backend y frontend | proposal |
| 012-visual-break-redesign | Done | Rediseño de la sección VisualBreak en la landing: manifesto horizontal con marquee, columnas animadas por clip-path y stats editoriales | proposal |
