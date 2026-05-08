# Acceptance: Frontend — Navbar UI Refinements y Dark/Light Mode

## Criterios de Aceptación

### AC-01 — Logo legible
**Dado** que el usuario está en cualquier página pública con el Navbar visible,  
**cuando** observa la esquina superior izquierda,  
**entonces** el texto "The Food Store" es legible a simple vista (≥ 14px) y mantiene el estilo tipográfico actual.

### AC-02 — Botón hamburguesa más grande
**Dado** que el usuario observa la esquina superior derecha del Navbar,  
**cuando** el menú está cerrado,  
**entonces** el botón orbital es visiblemente más grande que antes sin romper el alineamiento del Navbar.

### AC-03 — Botón de acceso al panel más claro
**Dado** que el usuario está en la landing pública,  
**cuando** observa el botón de acceso al panel,  
**entonces** el botón muestra el texto "Acceso · Panel" (u otro texto acordado), es más prominente y al hacer click navega correctamente a `/login`.

### AC-04 — Toggle de tema visible en Login
**Dado** que el usuario navega a `/login`,  
**cuando** la página carga,  
**entonces** existe un ícono de sol/luna que, al hacer click, alterna entre modo oscuro y modo claro sin romper el diseño existente.

### AC-05 — Modo claro en Login legible
**Dado** que el usuario activa el modo claro en Login,  
**cuando** se muestra el formulario,  
**entonces** todos los textos son legibles sobre el fondo claro y los campos de input son distinguibles.

### AC-06 — Toggle de tema visible en Panel de Gestión
**Dado** que el usuario está autenticado y en el panel de gestión,  
**cuando** observa el header del panel,  
**entonces** existe un ícono de sol/luna que, al hacer click, alterna entre modo oscuro y modo claro.

### AC-07 — Modo claro en Panel legible
**Dado** que el usuario activa el modo claro en el Panel de Gestión,  
**cuando** navega por las páginas del panel (dashboard, insumos, etc.),  
**entonces** todos los textos, tarjetas, sidebar y tablas son legibles sobre el fondo claro.

### AC-08 — Persistencia del tema
**Dado** que el usuario seleccionó un tema (claro u oscuro),  
**cuando** recarga la página o navega entre rutas,  
**entonces** el tema seleccionado se mantiene (persistido en `localStorage`).

### AC-09 — Landing siempre en dark
**Dado** que el usuario activa el modo claro,  
**cuando** navega a cualquier página pública de la landing (home, menú, nosotros, etc.),  
**entonces** la landing permanece en modo oscuro (no se ve afectada por el toggle).

### AC-10 — Sin regresiones en modo oscuro
**Dado** que el usuario tiene el modo oscuro activo (default),  
**cuando** usa el Login, Register o el Panel de Gestión,  
**entonces** el diseño es visualmente idéntico al diseño original (sin degradación de estilos).
