from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class IngredienteCreate(BaseModel):
    nombre: str
    descripcion: Optional[str] = None
    es_alergeno: bool = False


class IngredienteUpdate(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    es_alergeno: Optional[bool] = None


class IngredienteRead(BaseModel):
    id: int
    nombre: str
    descripcion: Optional[str]
    es_alergeno: bool
    is_active: bool  # False = Inhabilitado (visible en admin con etiqueta)
    deleted_at: Optional[datetime] = None  # None = activo, fecha = archivado
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class IngredienteListResponse(BaseModel):
    items: list[IngredienteRead]
    total: int
    skip: int
    limit: int
