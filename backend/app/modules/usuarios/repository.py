from typing import Optional

from sqlmodel import Session, select

from app.core.repository import BaseRepository
from app.modules.usuarios.models import Usuario


class UsuarioRepository(BaseRepository[Usuario]):
    def __init__(self, session: Session):
        super().__init__(Usuario, session)

    def get_by_email(self, email: str) -> Optional[Usuario]:
        """Busca un usuario por email (para login y validación de unicidad)."""
        return self.session.exec(
            select(Usuario).where(Usuario.email == email)
        ).first()

    def get_all_active(self) -> list[Usuario]:
        """
        Retorna usuarios no eliminados permanentemente (deleted_at IS NULL).
        Incluye tanto activos como suspendidos (is_active puede ser True o False).
        """
        return self.session.exec(
            select(Usuario).where(Usuario.deleted_at == None)  # noqa: E711
        ).all()
