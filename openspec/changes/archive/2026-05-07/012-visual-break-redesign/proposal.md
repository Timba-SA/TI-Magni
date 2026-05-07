# Proposal: 012-visual-break-redesign

## Estado
Done

## Contexto
La sección `VisualBreak` de la landing mostraba tres tarjetas oscuras flotantes con una letra editorial de fondo (A, P, C) y los conceptos "Arte", "Pasión", "Calidad". El patrón de "letra gigante con glassmorphism oscuro" ya se repite en `ProductShowcase` y otras secciones, generando fatiga visual y falta de unicidad en esta parte específica.

## Problema
- El mismo patrón visual (tarjeta oscura + letra transparente de fondo + texto en esquina) se usa en múltiples secciones.
- Las tarjetas flotantes con `clip-path` poligonal no generaban suficiente diferenciación.
- La sección no tenía una jerarquía de información clara ni contexto de datos reales.

## Solución Propuesta
Rediseñar `VisualBreak` con un concepto de **Manifesto Horizontal** inspirado en publicaciones editoriales de lujo:

- **Marquee de texto** corriendo en ambas direcciones (arriba y abajo), casi invisible pero generando movimiento constante.
- **Grid de 3 columnas** con revelación individual por `clip-path` animado al hacer scroll (efecto "telón corriendo").
- **Línea de acento vertical** que crece desde el tope de cada columna al hacer scroll, usando `useTransform` de Framer Motion.
- **Stats contextuales** por columna (72hs de maduración, 100% origen, etc.) para aportar credibilidad real.
- **Badge inferior** con micro-animación de entrada.
- Fondo `#080808` (más profundo que el resto de la landing) para generar contraste con las secciones claras adyacentes.

## Alcance
- **Archivo modificado:** `frontend/src/components/landing/VisualBreak.tsx`
- Sin cambios en backend, rutas, tipos ni otros componentes.

## Justificación
El cambio es puramente estético y de experiencia visual. No rompe ninguna integración existente. El componente es autocontenido y no recibe ni emite props.
