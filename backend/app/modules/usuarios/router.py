from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlmodel import Session

from app.core.database import get_session
from app.core.dependencies import get_current_user, require_role
from app.modules.usuarios.schemas import (
    UsuarioDetailResponse,
    UsuarioResponse,
    UsuarioRoleUpdateRequest,
    UsuarioUpdateRequest,
)
from app.modules.usuarios.service import UsuarioService

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

SessionDep = Annotated[Session, Depends(get_session)]
CurrentUser = Annotated[dict, Depends(get_current_user)]
AdminOnly = Annotated[dict, Depends(require_role("ADMIN"))]


@router.get("/me", response_model=UsuarioDetailResponse, status_code=status.HTTP_200_OK)
def get_me(session: SessionDep, current_user: CurrentUser):
    """Devuelve el perfil completo del usuario autenticado."""
    usuario_id = current_user["sub"]
    return UsuarioService(session).get_me(usuario_id)


@router.patch("/me", response_model=UsuarioResponse, status_code=status.HTTP_200_OK)
def update_me(data: UsuarioUpdateRequest, session: SessionDep, current_user: CurrentUser):
    """Actualiza el perfil del usuario autenticado (nombre, apellido, celular)."""
    usuario_id = current_user["sub"]
    return UsuarioService(session).update_me(usuario_id, data)


@router.get("/", response_model=list[UsuarioDetailResponse], status_code=status.HTTP_200_OK)
def get_all(session: SessionDep, _admin: AdminOnly):
    """Lista todos los usuarios activos. Solo ADMIN."""
    return UsuarioService(session).get_all()


@router.patch("/{id}/toggle-active", response_model=UsuarioResponse, status_code=status.HTTP_200_OK)
def toggle_active(id: int, session: SessionDep, current_user: AdminOnly):
    """Activa o suspende un usuario. Solo ADMIN. No puede aplicarse a uno mismo."""
    admin_id = current_user["sub"]
    return UsuarioService(session).toggle_active(id, admin_id)


@router.patch("/{id}/roles", response_model=UsuarioDetailResponse, status_code=status.HTTP_200_OK)
def update_roles(id: int, data: UsuarioRoleUpdateRequest, session: SessionDep, current_user: AdminOnly):
    """Actualiza los roles de un usuario. Solo ADMIN. No puede aplicarse a uno mismo."""
    admin_id = current_user["sub"]
    return UsuarioService(session).update_roles(id, data, admin_id)
