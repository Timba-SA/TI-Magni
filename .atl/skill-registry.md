# Skill Registry - Timba-SA/TI-Magni

## Project Standards

### Tech Stack
- **Frontend**: React, Vite, TypeScript, Tailwind CSS v4, shadcn/ui.
- **Backend**: Python, FastAPI, SQLAlchemy, SQLite.
- **Infrastructure**: Docker, Docker Compose.

### Conventions (from agents.md)
- **Architecture**: Features-based frontend (`/src/features/`), layered backend (`routers` -> `services` -> `unit_of_work` -> `repositories`).
- **Strict TDD**: Enabled for business logic. Tests MUST be created before implementation.
- **Styling**: Tailwind CSS exclusively.
- **Hardcoding**: Strictly forbidden. Use `.env`.

## User Skills

| Skill | Trigger | Source |
|-------|---------|--------|
| docker-expert | Docker, containerization, production deployment | Project |
| fastapi-templates | FastAPI, backend API, async patterns | Project |
| frontend-design | Web components, styling, UI design | Project |
| vercel-react-best-practices | React, performance, optimization | Project |
| branch-pr | Creating pull request, opening PR | User |
| issue-creation | Creating GitHub issue, bug report | User |
| judgment-day | Review, adversarial review, judge | User |

## Project-Specific Rules (Injected)

```markdown
### Backend Standards
- Repositories NUNCA hacen commit ni rollback.
- UnitOfWork es el único responsable de la sesión.
- Routers sin lógica de negocio.

### Frontend Standards
- Mantener arquitectura por features.
- No alterar landing pública sin proposal.
```
