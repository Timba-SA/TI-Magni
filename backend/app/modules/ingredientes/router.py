from typing import Annotated, Optional

from fastapi import APIRouter, Depends, Query, status
from fastapi.responses import StreamingResponse
from sqlmodel import Session

from app.core.database import get_session
from app.core.dependencies import get_current_user, require_role
from app.modules.ingredientes.schemas import (
    IngredienteCreate,
    IngredienteListResponse,
    IngredienteRead,
    IngredienteUpdate,
)
from app.modules.ingredientes.service import IngredienteService
from app.modules.ingredientes.unit_of_work import IngredienteUoW

router = APIRouter(prefix="/ingredientes", tags=["Ingredientes"])

SessionDep = Annotated[Session, Depends(get_session)]


@router.get("/", response_model=IngredienteListResponse, status_code=status.HTTP_200_OK)
def listar_ingredientes(
    session: SessionDep,
    nombre: Annotated[Optional[str], Query(description="Búsqueda parcial por nombre")] = None,
    es_alergeno: Annotated[Optional[bool], Query(description="Filtrar por alérgeno")] = None,
    skip: Annotated[int, Query(ge=0, description="Registros a saltar")] = 0,
    limit: Annotated[int, Query(ge=1, le=100, description="Límite de registros")] = 20,
    _current_user: dict = Depends(get_current_user),
):
    with IngredienteUoW(session) as uow:
        return IngredienteService.listar(uow, nombre, es_alergeno, skip, limit)


# ⚠️ IMPORTANTE: /exportar debe ir ANTES de /{id}
# De lo contrario FastAPI interpreta "exportar" como un entero (id) y devuelve 422.
@router.get("/exportar", status_code=status.HTTP_200_OK)
def exportar_ingredientes(
    session: SessionDep,
    nombre: Annotated[Optional[str], Query()] = None,
    es_alergeno: Annotated[Optional[bool], Query()] = None,
    _current_user: dict = Depends(get_current_user),
):
    with IngredienteUoW(session) as uow:
        file_bytes = IngredienteService.exportar(uow, nombre, es_alergeno)

    # El UoW ya cerró. file_bytes son bytes puros en memoria — safe de retornar fuera del with.
    return StreamingResponse(
        content=iter([file_bytes]),
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=ingredientes.xlsx"},
    )


@router.get("/{id}", response_model=IngredienteRead, status_code=status.HTTP_200_OK)
def obtener_ingrediente(
    id: int,
    session: SessionDep,
    _current_user: dict = Depends(get_current_user),
):
    with IngredienteUoW(session) as uow:
        return IngredienteService.obtener(uow, id)


@router.post(
    "/",
    response_model=IngredienteRead,
    status_code=status.HTTP_201_CREATED,
)
def crear_ingrediente(
    data: IngredienteCreate,
    session: SessionDep,
    _current_user: dict = Depends(require_role("ADMIN", "STOCK")),
):
    with IngredienteUoW(session) as uow:
        return IngredienteService.crear(uow, data)


@router.patch("/{id}", response_model=IngredienteRead, status_code=status.HTTP_200_OK)
def actualizar_ingrediente(
    id: int,
    data: IngredienteUpdate,
    session: SessionDep,
    _current_user: dict = Depends(require_role("ADMIN", "STOCK")),
):
    with IngredienteUoW(session) as uow:
        return IngredienteService.actualizar(uow, id, data)


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_ingrediente(
    id: int,
    session: SessionDep,
    _current_user: dict = Depends(require_role("ADMIN", "STOCK")),
):
    with IngredienteUoW(session) as uow:
        IngredienteService.eliminar(uow, id)
