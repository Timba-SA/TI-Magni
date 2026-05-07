# Proposal: Premium UI — Páginas Reservas y Contacto (007)

## Intent
Mejorar el diseño visual de las páginas `/reservas` y `/contacto` aplicando una estética premium consistente con el design system del proyecto (dark mode, glassmorphism editorial, Playfair Display, paleta naranja/rojo).

> ⚠️ **NOTA DE PROCESO**: Este change fue implementado ANTES de ser aprobado, violando el flujo SDD. Se documenta retroactivamente como registro histórico.

## Context
Las páginas `ReservationsPage.tsx` y `ContactPage.tsx` existían con un diseño funcional pero básico. No estaban a la altura estética del resto de la landing (Navbar, HeroSection, etc.).

## Scope
### In Scope
- Rediseño completo de `ReservationsPage.tsx`.
- Rediseño completo de `ContactPage.tsx`.
- Ambient orbs animados, grid overlay, campos de formulario con animaciones de underline, botones con reveal fill, estado de éxito post-submit.

### Out of Scope
- Lógica de negocio o conexión real con el backend.
- Otras páginas del sitio.
