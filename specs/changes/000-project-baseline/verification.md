# Verification: 000-project-baseline

## Pruebas Manuales Registradas
Esta verificación se basa en pruebas manuales realizadas previamente por el usuario, constatando el funcionamiento de la aplicación actual:

- **Swagger/OpenAPI:** Muestra correctamente los dominios de Auth, Insumos y Health.
- **Healthcheck:** `GET /health` responde 200 OK.
- **Auth:** `POST /api/auth/login` responde 200 OK con credenciales válidas.
- **Insumos - Lectura:** `GET /api/insumos` responde 200 OK y lista insumos.
- **Insumos - Creación:** `POST /api/insumos` crea un insumo exitosamente.
- **Insumos - Actualización:** `PATCH` actualiza correctamente los campos de un insumo.
- **Insumos - Eliminación:** `DELETE` realiza la baja lógica (cambio de estado).
- **Insumos - Reactivación:** `PATCH /reactivar` reactiva un insumo inactivo.
- **Insumos - Estadísticas:** `GET /stats/resumen` responde 200 OK con métricas.
- **Convenciones:** Los responses de la API utilizan formato `camelCase` para compatibilidad con el frontend en TypeScript.

## Conclusión
El estado actual del sistema es estable, funcional y corresponde con la arquitectura documentada en este baseline.
