# Design: Frontend — Navbar UI Refinements y Dark/Light Mode

## Arquitectura del Sistema de Temas

Se implementa un `ThemeContext` con `React.createContext` + `useReducer` que expone:
```ts
type Theme = "dark" | "light";
interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}
```

**Archivo nuevo**: `src/contexts/ThemeContext.tsx`  
**Persistencia**: `localStorage.getItem("tfs-theme")` — se lee al inicializar. Default: `"dark"`.  
**Aplicación**: el `ThemeProvider` agrega/remueve la clase `data-theme="light"` al `<html>` o usa una prop de clase en el wrapper del componente raíz. Se usan variables CSS en vez de hardcodear colores en cada componente.

## Variables CSS del sistema de temas

Se definen en `src/index.css` (o el archivo global de estilos):

```css
:root[data-theme="dark"] {
  --bg-primary: #0B0B0B;
  --bg-secondary: #0D0D0D;
  --bg-surface: rgba(13,13,13,0.9);
  --text-primary: rgba(248,248,248,0.85);
  --text-muted: rgba(248,248,248,0.4);
  --text-subtle: rgba(248,248,248,0.18);
  --border-subtle: rgba(248,248,248,0.05);
  --border-mid: rgba(248,248,248,0.12);
  --sidebar-bg: #111111;
}

:root[data-theme="light"] {
  --bg-primary: #F5F0E8;
  --bg-secondary: #EDE8DC;
  --bg-surface: rgba(245,240,232,0.95);
  --text-primary: rgba(26,26,26,0.9);
  --text-muted: rgba(26,26,26,0.55);
  --text-subtle: rgba(26,26,26,0.35);
  --border-subtle: rgba(26,26,26,0.08);
  --border-mid: rgba(26,26,26,0.15);
  --sidebar-bg: #E8E0D0;
}
```

El color de acento `#FF5A00` (naranja) y el dorado `rgba(198,154,58,…)` **no cambian** — son colores de marca, válidos en ambos modos.

## Componente ThemeToggle

**Archivo nuevo**: `src/components/ui/ThemeToggle.tsx`

```tsx
// Usa icono Sun / Moon de lucide-react
// Tamaño configurable por prop (default size=16)
// No tiene label de texto — solo el ícono
// Animación suave de rotación al cambiar
```

## Modificaciones a componentes existentes

### `Navbar.tsx` — 3 ajustes de tamaño

| Elemento | Antes | Después |
|---|---|---|
| Logo text "The Food Store" | `text-[10px]` | `text-sm` (14px) |
| OrbitalButton wrapper | `w-14 h-14` | `w-16 h-16` |
| OrbitalButton inner lines | `w-5 h-5` | `w-6 h-6` |
| Botón texto "Panel" | `Panel`, `text-[10px]`, icono `size={11}`, `px-4 py-1.5` | `Acceso · Panel`, `text-[11px]`, icono `size={13}`, `px-5 py-2` |

### `LoginPage.tsx`
- Envolver el root `div` con variables CSS en lugar de colores hardcodeados.
- `bg-[#0B0B0B]` → `bg-[var(--bg-primary)]`
- `bg-[#0c0c0c]` → `bg-[var(--bg-secondary)]`
- Textos `text-white/XX` → usar `text-[color:var(--text-primary)]` / `text-[color:var(--text-muted)]` según el caso
- Agregar `<ThemeToggle />` en la esquina superior derecha del panel del formulario (z-10, absolute).

### `AdminLayout.tsx`
- `bg-[#0B0B0B]` → `bg-[var(--bg-primary)]`

### `AdminHeader.tsx`
- `background: rgba(13,13,13,0.9)` → `background: var(--bg-surface)`
- `borderBottom: ...rgba(248,248,248,0.05)` → `border-[var(--border-subtle)]`
- Todos los `rgba(248,248,248,X)` → variable equivalente
- Agregar `<ThemeToggle size={16} />` en la sección derecha, antes del live dot.

### `AdminSidebar.tsx`
- Background del sidebar → `bg-[var(--sidebar-bg)]`
- Textos y bordes → variables CSS correspondientes

## Flujo de datos

```
App.tsx
  └─ ThemeProvider (ThemeContext)
       ├─ PublicLayout → LoginPage → ThemeToggle
       └─ AdminLayout  → AdminHeader → ThemeToggle
```

El `ThemeProvider` vive en `App.tsx` para que ambas rutas (pública y admin) compartan el mismo estado de tema.

## Restricción de estilos

- **NO** usar Tailwind `dark:` modifier — el proyecto no tiene el plugin `darkMode: 'class'` configurado.
- Usar exclusivamente variables CSS `var(--...)` en los componentes modificados.
- El Navbar landing (`Navbar.tsx`) **no** recibe soporte de modo claro — la landing es siempre dark (es parte del brand).
