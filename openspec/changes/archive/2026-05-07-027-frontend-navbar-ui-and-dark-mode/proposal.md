# Proposal: Frontend — Navbar UI Refinements y Dark/Light Mode

## Contexto y Objetivo

El Navbar público presenta tres elementos con visibilidad reducida: el logotipo "The Food Store" es casi ilegible por su tamaño mínimo (`text-[10px]`), el botón orbital de menú resulta pequeño a pesar de su diseño llamativo, y el botón "Panel" tiene poco peso visual y un nombre ambiguo que no comunica su función.

Además, tanto la página de Login/Register como el panel de gestión administrivo están diseñados exclusivamente para modo oscuro, lo que genera problemas de legibilidad para usuarios que operan en ambientes bien iluminados o prefieren fondos claros.

## Estado Actual (lo que existe y necesita ajuste)

| Componente | Archivo | Problema |
|---|---|---|
| Logo "The Food Store" | `Navbar.tsx` línea 349 | `text-[10px]` — casi ilegible. Sin cambio de tamaño responsive |
| Botón hamburguesa `OrbitalButton` | `Navbar.tsx` línea 38 | `w-14 h-14` — pequeño en pantalla completa |
| Botón "Panel" | `Navbar.tsx` líneas 366–389 | Nombre ambiguo, tamaño reducido (`px-4 py-1.5`, icono `size={11}`), nula percepción de CTA |
| Login / Register | `LoginPage.tsx` | Fondo hardcodeado `#0c0c0c` / `#0B0B0B`, sin soporte de modo claro |
| Panel de gestión | `AdminLayout.tsx`, `AdminHeader.tsx`, `AdminSidebar.tsx` | Background `bg-[#0B0B0B]` sin soporte de modo claro |

## Requerimientos

### 1. Navbar — Ajustes visuales
- **Logo "The Food Store"**: aumentar de `text-[10px]` a `text-sm` (14px). Mantener tracking y font-mono.
- **OrbitalButton (hamburguesa)**: aumentar de `w-14 h-14` a `w-16 h-16`. Aumentar los `line` internos de `w-5 h-5` a `w-6 h-6`.
- **Botón "Panel"**: renombrar a `Acceso · Panel`. Aumentar padding a `px-5 py-2`. Icono a `size={13}`. Texto a `text-[11px]`.

### 2. Dark/Light Mode — Login / Register
- Agregar un `ThemeProvider` a nivel de la app o contextualizado en la ruta de auth.
- Toggle visible en la `LoginPage` (ícono sol/luna de Lucide).
- En **modo claro**: fondo `#F5F0E8` (crema), textos en oscuro `#1a1a1a`, bordes y acentos se mantienen con el naranja `#FF5A00` como color primario.
- En **modo oscuro**: mantener exactamente el diseño actual (sin regresiones).
- Persistir preferencia en `localStorage`.

### 3. Dark/Light Mode — Panel de Gestión
- El mismo `ThemeContext` se aplica al `AdminLayout`.
- Toggle en el `AdminHeader` (ícono sol/luna, alineado a la derecha junto al live dot).
- En **modo claro**: fondo `#F5F0E8`, sidebar con `#E8E0D0`, header y cards con `#EDE8DC`, textos en `#1a1a1a`, acentos naranja se mantienen.
- En **modo oscuro**: mantener exactamente el diseño actual.

## Lo que NO se toca en este change
- Estilos, animaciones y estructura interna de la landing pública.
- Lógica de autenticación, routing, servicios.
- Cualquier componente del backend.
- Las páginas públicas (Menu, Nosotros, Experiencia, Reservas, Contacto).
