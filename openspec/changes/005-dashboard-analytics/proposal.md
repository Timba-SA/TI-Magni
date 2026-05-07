# Proposal: 005-dashboard-analytics

## Contexto
El dashboard principal actualmente se encuentra vacío o con información muy básica. El backend ya provee estadísticas de inventario a través del endpoint `/api/insumos/stats/resumen`.

## Intención
Implementar un panel de control (Dashboard) visual y analítico en el frontend que consuma las métricas reales del backend, aportando valor al encargado de inventario.

## Alcance
- Crear vista `DashboardPage` dentro de una nueva feature `analytics` o integrada en `insumos`.
- Consumir el endpoint de estadísticas.
- Utilizar una librería de gráficos ligera (ej: Recharts, ya listada en package.json).
- Mostrar KPIs como: Total de insumos, Valor de inventario, Insumos con bajo stock.
- Mostrar un gráfico de distribución (ej: Insumos Activos vs Inactivos).

## Justificación
El usuario final necesita una visión general rápida del estado de su negocio sin tener que leer toda la tabla de datos manualmente. Un dashboard analítico soluciona este problema.
