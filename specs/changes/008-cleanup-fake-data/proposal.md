# Proposal: Cleanup of Fake Seed Data

## Intent
Remove hardcoded 'Insumos' data from the database seeding script to ensure a clean state for evaluation.

## Scope
- Modify `backend/scripts/seed_db.py` to empty the `SEED_DATA_INSUMOS` list.

## Approach
- Keep user seeding (admin) to ensure system access.
- Remove all dummy food supply entries.
