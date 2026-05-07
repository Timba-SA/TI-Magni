from typing import Optional, TYPE_CHECKING
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from app.modules.usuarios.models import Usuario

class Rol(SQLModel, table=True):
    __tablename__ = "roles"
    
    codigo: str = Field(primary_key=True, max_length=20)
    
    usuario_roles: list["UsuarioRol"] = Relationship(back_populates="rol")

class UsuarioRol(SQLModel, table=True):
    __tablename__ = "usuario_roles"
    
    usuario_id: int = Field(foreign_key="usuarios.id", primary_key=True)
    rol_codigo: str = Field(foreign_key="roles.codigo", primary_key=True)
    
    usuario: Optional["Usuario"] = Relationship(back_populates="usuario_roles")
    rol: Optional[Rol] = Relationship(back_populates="usuario_roles")

class RefreshToken(SQLModel, table=True):
    __tablename__ = "refresh_tokens"

    id: Optional[int] = Field(default=None, primary_key=True)
    token_hash: str = Field(max_length=64, nullable=False, unique=True)
    expires_at: datetime = Field(nullable=False)
    revoked_at: Optional[datetime] = Field(default=None)

    usuario_id: int = Field(foreign_key="usuarios.id", nullable=False)
    usuario: Optional["Usuario"] = Relationship(back_populates="refresh_tokens")
