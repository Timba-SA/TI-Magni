from datetime import datetime, timezone

from fastapi import HTTPException, status
from sqlmodel import Session, select

from app.modules.auth.models import UsuarioRol
from app.modules.usuarios.models import Usuario
from app.modules.usuarios.schemas import (
    UsuarioDetailResponse,
    UsuarioResponse,
    UsuarioRoleUpdateRequest,
    UsuarioUpdateRequest,
)
from app.modules.usuarios.unit_of_work import UsuarioUoW


class UsuarioService:
    def __init__(self, session: Session):
        self._session = session

    # ── Helpers privados ───────────────────────────────────────────────────────

    def _get_roles(self, usuario_id: int) -> list[str]:
        """Carga los roles del usuario desde la tabla usuario_roles."""
        roles = self._session.exec(
            select(UsuarioRol.rol_codigo).where(UsuarioRol.usuario_id == usuario_id)
        ).all()
        return list(roles)

    def _get_or_404(self, uow: UsuarioUoW, usuario_id: int) -> Usuario:
        """Obtiene un usuario activo o lanza 404."""
        usuario = uow.usuarios.get_by_id(usuario_id)
        if not usuario or usuario.deleted_at is not None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Usuario con id={usuario_id} no encontrado.",
            )
        return usuario

    # ── Métodos públicos ───────────────────────────────────────────────────────

    def get_me(self, usuario_id: int) -> UsuarioDetailResponse:
        """Devuelve el perfil completo del usuario autenticado, incluyendo sus roles."""
        with UsuarioUoW(self._session) as uow:
            usuario = self._get_or_404(uow, usuario_id)
            roles = self._get_roles(usuario_id)

        return UsuarioDetailResponse(
            id=usuario.id,
            nombre=usuario.nombre,
            apellido=usuario.apellido,
            email=usuario.email,
            celular=usuario.celular,
            is_active=usuario.is_active,
            created_at=usuario.created_at,
            roles=roles,
        )

    def update_me(self, usuario_id: int, data: UsuarioUpdateRequest) -> UsuarioResponse:
        """Actualiza el perfil del usuario autenticado (nombre, apellido, celular)."""
        with UsuarioUoW(self._session) as uow:
            usuario = self._get_or_404(uow, usuario_id)

            cambios = data.model_dump(exclude_unset=True)
            for key, value in cambios.items():
                setattr(usuario, key, value)
            usuario.updated_at = datetime.now(timezone.utc)
            uow.usuarios.update(usuario)

        self._session.refresh(usuario)
        return UsuarioResponse(
            id=usuario.id,
            nombre=usuario.nombre,
            apellido=usuario.apellido,
            email=usuario.email,
            celular=usuario.celular,
            is_active=usuario.is_active,
            created_at=usuario.created_at,
        )

    def get_all(self) -> list[UsuarioDetailResponse]:
        """Lista todos los usuarios no eliminados. Solo para ADMIN."""
        with UsuarioUoW(self._session) as uow:
            usuarios = uow.usuarios.get_all_active()

        result = []
        for u in usuarios:
            roles = self._get_roles(u.id)
            result.append(
                UsuarioDetailResponse(
                    id=u.id,
                    nombre=u.nombre,
                    apellido=u.apellido,
                    email=u.email,
                    celular=u.celular,
                    is_active=u.is_active,
                    created_at=u.created_at,
                    roles=roles,
                )
            )
        return result

    def toggle_active(self, usuario_id: int, current_user_id: int) -> UsuarioResponse:
        """
        Alterna el estado is_active del usuario.
        Un admin NO puede suspenderse a sí mismo.
        """
        if usuario_id == current_user_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No podés suspender tu propia cuenta.",
            )

        with UsuarioUoW(self._session) as uow:
            usuario = self._get_or_404(uow, usuario_id)
            usuario.is_active = not usuario.is_active
            usuario.updated_at = datetime.now(timezone.utc)
            uow.usuarios.update(usuario)

        self._session.refresh(usuario)
        return UsuarioResponse(
            id=usuario.id,
            nombre=usuario.nombre,
            apellido=usuario.apellido,
            email=usuario.email,
            celular=usuario.celular,
            is_active=usuario.is_active,
            created_at=usuario.created_at,
        )

    def update_roles(self, usuario_id: int, data: UsuarioRoleUpdateRequest, current_user_id: int) -> UsuarioDetailResponse:
        """Modifica los roles de un usuario. Protegido contra auto-modificación de admin."""
        if usuario_id == current_user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No puedes modificar tus propios roles.",
            )

        with UsuarioUoW(self._session) as uow:
            usuario = self._get_or_404(uow, usuario_id)

            # Borrar todos los roles actuales
            self._session.exec(
                UsuarioRol.__table__.delete().where(UsuarioRol.usuario_id == usuario_id)
            )

            # Insertar nuevos
            # Si se envía una lista vacía, el usuario se queda sin roles (no recomendado pero posible)
            roles_set = set(data.roles)
            for rol in roles_set:
                self._session.add(UsuarioRol(usuario_id=usuario_id, rol_codigo=rol))
            
            uow.commit()
            
        return self.get_me(usuario_id)
