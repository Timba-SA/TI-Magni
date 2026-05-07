# Design: 003-fullstack-insumos-crud

## Backend
- Uso de `UnitOfWork` para asegurar que las creaciones y actualizaciones de insumos sean atómicas.
- Baja lógica: Agregar columna `estado` (Activo/Inactivo). El DELETE cambiará este estado.

## Frontend
- **Arquitectura:** Feature `/src/features/insumos`.
- **Vista:** Un Data Table que consuma el hook `useInsumos`.
- **Estado:** Peticiones asíncronas con manejo de errores global.
- No depender de librerías externas para fetch (uso exclusivo de `fetch` nativo encapsulado).
