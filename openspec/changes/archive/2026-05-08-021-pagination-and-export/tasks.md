# Tasks: Pagination and Excel Export (021)

## 1. Backend Updates
- `[ ]` **Categorías**:
  - Actualizar `CategoriaRepository` para soportar paginación (método que devuelva `items` y `total`).
  - Actualizar `CategoriaService.listar` para devolver la estructura paginada.
  - Implementar `CategoriaService.exportar` usando `openpyxl`.
  - Actualizar el router GET `/` y agregar GET `/exportar`.
- `[ ]` **Usuarios**:
  - Actualizar `UsuarioRepository` para soportar paginación (`items`, `total`).
  - Actualizar `UsuarioService.listar` y agregar `UsuarioService.exportar`.
  - Actualizar el router GET `/` y agregar GET `/exportar`.
- `[ ]` **Ingredientes**:
  - Verificar que el endpoint actual ya retorne la estructura correcta (`items`, `total`, `skip`, `limit`) y que el exportar funcione.

## 2. Frontend Infrastructure
- `[ ]` Crear componente de UI genérico `<Pagination />` (posiblemente basado en shadcn/ui si está disponible, o customizado para hacer match con el theme).
- `[ ]` Refactorizar el servicio de API de Frontend para manejar descargas de archivos (e.g. `downloadFile` function en `apiClient.ts` o utilidades).

## 3. Frontend Integration
- `[ ]` **InsumosPage**:
  - Integrar el estado `skip` y `limit`.
  - Agregar el componente `<Pagination />`.
  - Conectar el botón "Exportar a Excel" al endpoint backend correspondiente.
- `[ ]` **CategoriasPage**:
  - Integrar paginación en estado y tabla.
  - Agregar botón y lógica de exportación.
- `[ ]` **UsuariosPage**:
  - Integrar paginación en estado y tabla.
  - Agregar botón y lógica de exportación.

## 4. Verification
- `[ ]` Escribir tests de backend que validen la paginación y exportación de Categorías y Usuarios (Strict TDD).
- `[ ]` Validar manualmente la descarga correcta de archivos `.xlsx` desde el frontend.
