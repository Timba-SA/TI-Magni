# Proposal: 003-fullstack-insumos-crud

## Contexto
El core del negocio es la gestión de inventario. El sistema necesita permitir visualizar, crear, modificar y eliminar insumos lógicamente.

## Intención
Construir el flujo End-to-End (Back y Front) para la gestión del CRUD de insumos, implementando baja lógica en lugar de borrado físico.

## Alcance
- Backend: Modelo SQLAlchemy `Insumo`, endpoints CRUD y estadísticas.
- Frontend: `InsumosPage`, tabla de datos, formularios interactivos y modales de confirmación.
- Conexión: Servicios frontend que consuman la API mediante `fetchApi`.
