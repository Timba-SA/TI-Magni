# Índice Activo de Cambios (SDD)

Este documento mantiene el registro de todos los cambios gestionados bajo la metodología Spec-Driven Development (SDD) en The Food Store.

### Estados permitidos:
- **Draft:** Propuesta en redacción.
- **Approved:** Propuesta aprobada, lista para implementación.
- **In Progress:** Implementación en curso.
- **Done:** Implementado y verificado.
- **Rejected:** Propuesta rechazada.

## Registro de Cambios Activos (Backend Implementation)

| Change ID | Estado | Contexto | Artefactos |
|---|---|---|---|
| 015-frontend-store-checkout | Draft | Flujo de checkout de la tienda en el Frontend | proposal, design, tasks, acceptance |
| 016-backend-impl-seed-data | Draft | Poblar la base de datos con datos base (roles, estados, formas de pago) | proposal, design, tasks, acceptance |
| 017-backend-impl-auth | Draft | Implementación de Autenticación (JWT y Roles) | proposal, design, tasks, acceptance |
| 018-backend-impl-usuarios | Draft | Implementación de Usuarios y Perfil | proposal, design, tasks, acceptance |
| 019-backend-impl-categorias | Draft | Implementación de Categorías jerárquicas | proposal, design, tasks, acceptance |
| 020-backend-impl-ingredientes | Draft | Implementación de Ingredientes y Alérgenos | proposal, design, tasks, acceptance |
| 021-backend-impl-productos | Draft | Implementación de Productos y Catálogo | proposal, design, tasks, acceptance |
| 022-backend-impl-direcciones | Draft | Implementación de Direcciones de Entrega | proposal, design, tasks, acceptance |
| 023-backend-impl-pedidos | Draft | Implementación de Pedidos y Máquina de Estados (FSM) | proposal, design, tasks, acceptance |
| 024-backend-impl-pagos | Draft | Integración con MercadoPago (Idempotency y Webhook) | proposal, design, tasks, acceptance |
| 025-backend-impl-admin-stock | Draft | Gestión de Stock y Disponibilidad (Admin) | proposal, design, tasks, acceptance |
| 026-backend-impl-admin-metrics | Draft | Dashboard de Métricas Administrativas | proposal, design, tasks, acceptance |

## Registro de Cambios Archivados (Frontend y Baseline)

Estos changes fueron completados y archivados en `openspec/changes/archive/2026-05-07`.

| Change ID | Estado | Contexto |
|---|---|---|
| 000-project-baseline | Done | Documentación del estado actual del proyecto The Food Store |
| 002-frontend-landing-premium | Done | Desarrollo de la UI pública premium con Tailwind y React Router |
| 006-frontend-folder-restructure | Done | Mover todos los archivos y carpetas del frontend a una nueva carpeta `frontend` |
| 007-premium-ui-reservas-contacto | Done | Rediseño premium de páginas Reservas y Contacto |
| 009-premium-ui-insumos-form | Done | Rediseño premium del formulario de Nuevo/Editar Insumo |
| 012-visual-break-redesign | Done | Rediseño de la sección VisualBreak en la landing |
