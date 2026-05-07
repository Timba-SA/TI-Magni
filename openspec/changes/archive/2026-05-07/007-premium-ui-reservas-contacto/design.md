# Design: Premium UI — Reservas y Contacto

## Cambios por archivo

### `ReservationsPage.tsx`
- `AmbientOrbs`: tres esferas con `radial-gradient` que "respiran" via Framer Motion.
- `StatCard`: cards de métricas (40 comensales, 4 turnos, 30d anticipación) con hover reveal.
- `FormField`: cada field tiene underline animado (`scaleX: 0→1`) en color `#FF5A00` al hacer focus.
- Card del formulario con `rotateX/Y` 3D tilt via `useMotionValue`.
- Botón CTA con `scaleX` fill de izquierda a derecha on hover.
- Estado de éxito con `AnimatePresence` + `CheckCircle` spring animation.

### `ContactPage.tsx`
- `AmbientOrbs`: versión con `#C1121F` para diferenciarse de Reservas.
- `InfoBlock`: cada dato de contacto (Ubicación, Horario, Email, Teléfono) con caja de ícono y accent color.
- Mismo patrón de `FormField` animado, pero con `#C1121F`.
- Folio tag, separator editorial, vertical marker.
- Estado de éxito con color rojo.

## Paleta utilizada
- Naranja (`#FF5A00`) → Reservas
- Rojo (`#C1121F`) → Contacto
- Beige (`#D4A574`) → acentos secundarios en info blocks
