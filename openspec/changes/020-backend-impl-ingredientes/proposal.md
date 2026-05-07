# Proposal: Backend: Implementación de Ingredientes (Insumos)

## Contexto
CRUD completo de insumos (ingredientes) con gestión de alérgenos.
Este módulo debe cumplir con los requerimientos específicos de la primera entrega obligatoria:

1. **Paginación y Filtros:** El listado debe soportar búsqueda por nombre y filtrado por estado de alérgeno, además de paginación (`skip` y `limit`).
2. **Baja Lógica (Soft Delete):** El borrado no debe ser físico bajo ninguna circunstancia. Se debe implementar usando el campo `deleted_at`.
3. **Exportación a Excel:** Debe existir la capacidad de exportar el listado actual (respetando los filtros) a formato `.xlsx` o `.csv`.
