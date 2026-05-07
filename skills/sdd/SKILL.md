---
name: sdd-workflow
description: Usar esta skill cuando el usuario pida crear, modificar, refactorizar, conectar, arreglar o auditar funcionalidades del proyecto The Food Store siguiendo flujo SDD.
---

# Skill: Spec-Driven Development (SDD) Workflow

## Instrucciones de Ejecución

Cuando se active esta skill, debes seguir **estrictamente** este procedimiento antes y durante la intervención en el proyecto:

1. **Leer Documentación Base:**
   - Lee `agents.md` para entender las reglas del proyecto.
   - Lee `changes.md` para ver el historial y estado de cambios.
   - Lee `specs/project.md` para entender el contexto actual.

2. **Fase de Propuesta y Diseño (NO TOCAR CÓDIGO AÚN):**
   - Crea un nuevo directorio para el cambio: `/specs/changes/<change-id>/` (usa un ID descriptivo, ej. `001-add-user-roles`).
   - Crea `proposal.md` definiendo el contexto, intención y alcance.
   - Crea `design.md` documentando la arquitectura y decisiones técnicas.
   - Crea `tasks.md` con el checklist de implementación detallado.
   - Crea `acceptance.md` con los criterios para dar el trabajo por finalizado.

3. **Punto de Control (ESPERAR):**
   - Detente y **espera la aprobación humana**. NO implementes nada hasta que el usuario dé el OK al proposal, design y tasks.

4. **Implementación:**
   - Una vez aprobado, implementa **solo lo aprobado** en los documentos, actualizando el progreso en `tasks.md`.

5. **Verificación y Cierre:**
   - Ejecuta pruebas y completa `verification.md` detallando los resultados.
   - Actualiza el archivo `changes.md` en la raíz cambiando el estado a `Done`.
