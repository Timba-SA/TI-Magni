from typing import Optional, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship

class EstadoPedido(SQLModel, table=True):
    __tablename__ = "estados_pedido"
    
    codigo: str = Field(primary_key=True, max_length=20)
    descripcion: str = Field(max_length=80, nullable=False)
    orden: int = Field(nullable=False)
    es_terminal: bool = Field(nullable=False)

class FormaPago(SQLModel, table=True):
    __tablename__ = "formas_pago"
    
    codigo: str = Field(primary_key=True, max_length=20)
    descripcion: str = Field(max_length=80, nullable=False)
    habilitado: bool = Field(default=True, nullable=False)

# TODO: Implementar Pedido, DetallePedido e HistorialEstadoPedido en un PR futuro.
