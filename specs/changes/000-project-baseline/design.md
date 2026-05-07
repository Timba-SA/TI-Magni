# Design: 000-project-baseline

## Aclaración
Este documento **no diseña una nueva funcionalidad**. Su propósito es documentar el diseño y la arquitectura del estado actual del sistema, y definir el flujo de trabajo futuro.

## Arquitectura actual del Frontend
- **Core:** React SPA servida vía Vite.
- **Estructura:** División por `features` (`auth`, `insumos`), `components` compartidos, `layouts`, `pages`, `hooks` y `services`.
- **UI/UX:** Estilizado mediante Tailwind CSS y componentes de shadcn/ui.
- **Estado/Datos:** Consumo de API REST nativo (`fetchApi`), sin librerías externas de HTTP pesadas.

## Arquitectura actual del Backend
- **Core:** API RESTful con FastAPI.
- **Estructura:** Módulos de dominio (`auth`, `insumos`).
- **Capas:**
  - **Routers:** Exposición de endpoints y validación HTTP.
  - **Services:** Lógica de negocio orquestada.
  - **Unit of Work:** Manejo de transacciones de base de datos.
  - **Repositories:** Acceso a datos (SQLAlchemy).

## Flujo futuro de trabajo (SDD)
Cualquier cambio futuro seguirá la metodología Spec-Driven Development:
1. `proposal.md` -> 2. `design.md` -> 3. `tasks.md` -> 4. Aprobación humana -> 5. Implementación -> 6. `verification.md` -> 7. Actualización en `changes.md`.
