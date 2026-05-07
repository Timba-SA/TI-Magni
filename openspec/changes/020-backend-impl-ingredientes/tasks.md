# Tasks: Backend: Implementación de Ingredientes

- [ ] Agregar el campo `deleted_at` al modelo SQLModel `Ingrediente` en `app/modules/ingredientes/models.py`.
- [ ] Crear los schemas de Pydantic (`IngredienteRead`, `IngredienteCreate`, `IngredienteUpdate`) en `schemas.py`.
- [ ] Implementar `IngredienteRepository` extendiendo `BaseRepository`, agregando soporte para paginación (`skip`, `limit`) y filtros dinámicos.
- [ ] Implementar `IngredienteService` garantizando el uso del Unit of Work para la persistencia de datos.
- [ ] Asegurar que la lógica de eliminación en el servicio llame obligatoriamente a `self.soft_delete(obj)` del repositorio base.
- [ ] Crear un endpoint específico `GET /exportar` (o similar) en el Router que devuelva un archivo CSV/Excel con los datos filtrados.
- [ ] Implementar el resto de los endpoints CRUD estándar en `IngredienteRouter`.
- [ ] Integrar/verificar que el Frontend existente interactúe correctamente con los filtros, paginación, baja lógica y botón de exportación.
