# Tasks: Frontend — Navbar UI Refinements y Dark/Light Mode

## Fase 1 — Sistema de Temas (Infraestructura)

- [x] 1.1 Agregar variables CSS de tema (dark/light) en `frontend/src/styles/theme.css`
- [x] 1.2 Crear `src/contexts/ThemeContext.tsx` con `ThemeProvider`, `useTheme` hook y persistencia en `localStorage`
- [x] 1.3 Envolver `<App />` (o el root del router) con `<ThemeProvider>` en `App.tsx`
- [x] 1.4 Crear `src/components/ui/ThemeToggle.tsx` (ícono Sun/Moon, animación de rotación)

## Fase 2 — Navbar (ajustes visuales únicamente)

- [x] 2.1 Logo text: `text-[10px]` → `text-sm` en `Navbar.tsx`
- [x] 2.2 OrbitalButton: `w-14 h-14` → `w-16 h-16`, inner lines `w-5 h-5` → `w-6 h-6`
- [x] 2.3 Botón "Panel": renombrado a `Log In · Register`, padding aumentado, icono `size={13}`, texto `text-[11px]`

## Fase 3 — Login / Register con modo claro

- [x] 3.1 Reemplazar colores hardcodeados `#0B0B0B` / `#0c0c0c` por variables CSS en `LoginPage.tsx`
- [x] 3.2 Agregar `<ThemeToggle />` en la esquina superior derecha del panel del formulario

## Fase 4 — Panel de Gestión con modo claro

- [x] 4.1 `AdminLayout.tsx`: reemplazar `bg-[#0B0B0B]` por variable CSS
- [x] 4.2 `AdminHeader.tsx`: reemplazar todos los colores hardcodeados por variables CSS; agregar `<ThemeToggle />` en la sección derecha
- [x] 4.3 `AdminSidebar.tsx`: reemplazar background y colores de texto/borde por variables CSS

## Fase 4B — Polishing modo claro (páginas internas)

- [x] 4B.1 `DashboardCard.tsx`: background/hover/text de cards migrados a variables CSS
- [x] 4B.2 `DashboardPage.tsx`: divisores, headings, subtítulos y cards de módulos migrados
- [x] 4B.3 `InsumosPage.tsx`: modal de confirmación, page header, filtros y tabla migrados
- [x] 4B.4 `InsumosTable.tsx`: tabla completamente migrada con variables CSS
- [x] 4B.5 `InsumoFilters.tsx`: input, checkbox y botones migrados
- [x] 4B.6 `InsumoDetailModal.tsx`: dialog y detailrows migrados
- [x] 4B.7 `InsumoForm.tsx`: dialog, inputs, labels, footer migrados
- [x] 4B.8 `CategoriasPage.tsx`: todos los colores migrados
- [x] 4B.9 `BackToDashboard.tsx`: color de texto migrado a variable CSS

## Fase 5 — Verificación

- [x] 5.1 Verificar toggle dark/light en Login — diseño sin regresiones
- [x] 5.2 Verificar toggle dark/light en Panel — legibilidad en ambos modos
- [x] 5.3 Verificar persistencia del tema (localStorage)
- [x] 5.4 Verificar que la landing pública permanece siempre en dark
- [x] 5.5 Verificar en mobile el tamaño del botón hamburguesa y logo
