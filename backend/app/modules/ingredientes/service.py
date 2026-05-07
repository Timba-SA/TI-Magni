import io
from datetime import datetime
from typing import Optional

import openpyxl
from fastapi import HTTPException, status

from app.modules.ingredientes.models import Ingrediente
from app.modules.ingredientes.schemas import (
    IngredienteCreate,
    IngredienteListResponse,
    IngredienteRead,
    IngredienteUpdate,
)
from app.modules.ingredientes.unit_of_work import IngredienteUoW


class IngredienteService:

    @staticmethod
    def listar(
        uow: IngredienteUoW,
        nombre: Optional[str] = None,
        es_alergeno: Optional[bool] = None,
        skip: int = 0,
        limit: int = 20,
    ) -> IngredienteListResponse:
        items, total = uow.ingredientes.list_with_filters(nombre, es_alergeno, skip, limit)
        return IngredienteListResponse(
            items=[IngredienteRead.model_validate(i) for i in items],
            total=total,
            skip=skip,
            limit=limit,
        )

    @staticmethod
    def obtener(uow: IngredienteUoW, id: int) -> Ingrediente:
        obj = uow.ingredientes.get_activo_by_id(id)
        if not obj:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Ingrediente con id={id} no encontrado.",
            )
        return obj

    @staticmethod
    def crear(uow: IngredienteUoW, data: IngredienteCreate) -> Ingrediente:
        existing = uow.ingredientes.get_activo_by_nombre(data.nombre)
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"Ya existe un ingrediente con el nombre '{data.nombre}'.",
            )
        obj = Ingrediente(**data.model_dump())
        # add() hace flush() + refresh() internamente.
        # El commit real lo ejecuta UoW.__exit__ al salir del bloque `with`.
        return uow.ingredientes.add(obj)

    @staticmethod
    def actualizar(uow: IngredienteUoW, id: int, data: IngredienteUpdate) -> Ingrediente:
        obj = IngredienteService.obtener(uow, id)
        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(obj, field, value)
        obj.updated_at = datetime.utcnow()
        # update() hace flush() + refresh(). El commit lo hace UoW.__exit__.
        return uow.ingredientes.update(obj)

    @staticmethod
    def eliminar(uow: IngredienteUoW, id: int) -> None:
        obj = IngredienteService.obtener(uow, id)
        # soft_delete() hace flush(). El commit lo hace UoW.__exit__.
        uow.ingredientes.soft_delete(obj)

    @staticmethod
    def exportar(
        uow: IngredienteUoW,
        nombre: Optional[str] = None,
        es_alergeno: Optional[bool] = None,
    ) -> bytes:
        # Sin paginación — exportar todo. El UoW sigue abierto mientras generamos el xlsx.
        items, _ = uow.ingredientes.list_with_filters(nombre, es_alergeno, skip=0, limit=10_000)

        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = "Ingredientes"

        headers = ["ID", "Nombre", "Descripción", "Alérgeno", "Creado"]
        ws.append(headers)

        for item in items:
            ws.append([
                item.id,
                item.nombre,
                item.descripcion or "",
                "Sí" if item.es_alergeno else "No",
                item.created_at.strftime("%Y-%m-%d %H:%M"),
            ])

        buffer = io.BytesIO()
        wb.save(buffer)
        buffer.seek(0)
        return buffer.read()
