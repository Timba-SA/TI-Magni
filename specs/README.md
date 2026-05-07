# Especificaciones (Spec-Driven Development)

## ¿Qué es `/specs`?
Es el directorio central para gestionar la evolución del proyecto mediante la metodología Spec-Driven Development (SDD). Aquí reside la documentación funcional, técnica y el registro de cambios.

## ¿Qué es `/specs/changes`?
Es la carpeta donde se aísla cada nueva iniciativa, funcionalidad, refactor o corrección. Cada cambio tiene su propio identificador y directorio.

## ¿Qué es un baseline?
Un baseline (como `000-project-baseline`) es una captura del estado actual del sistema. Sirve como punto de partida documentado para que los agentes IA comprendan el contexto sin necesidad de escanear todo el código base constantemente.

## ¿Cómo crear un change-id?
1. Elegir un ID secuencial y descriptivo (ej: `001-add-user-profile`).
2. Crear la carpeta en `/specs/changes/001-add-user-profile/`.

## ¿Qué archivos tiene cada change?
- `proposal.md`: Qué se quiere hacer y por qué.
- `design.md`: Cómo se va a construir técnica y visualmente.
- `tasks.md`: Checklist paso a paso de la implementación.
- `acceptance.md`: Criterios que definen cuándo el cambio está "listo".
- `verification.md`: Pruebas y validaciones post-implementación.

## ¿Cuándo se puede implementar?
**SOLO** cuando los documentos `proposal.md`, `design.md`, `tasks.md` y `acceptance.md` han sido redactados y **aprobados por un humano**.

## ¿Cómo se verifica?
Siguiendo los pasos definidos en `verification.md` para asegurar que los criterios de `acceptance.md` se cumplen y no hay regresiones.

## ¿Cómo se cierra?
Actualizando el estado del Change ID a `Done` en el archivo `/changes.md` en la raíz del proyecto.
