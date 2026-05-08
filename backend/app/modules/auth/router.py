from fastapi import APIRouter, Depends, Request, status
from sqlmodel import Session

from app.core.database import get_session
from app.core.dependencies import get_current_user
from app.core.middleware import limiter
from app.modules.auth.schemas import LoginRequest, RefreshRequest, RegisterRequest, TokenResponse
from app.modules.auth.service import AuthService
from app.modules.auth.unit_of_work import AuthUoW

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(data: RegisterRequest, session: Session = Depends(get_session)):
    """Registra un nuevo usuario y retorna tokens (queda logueado directamente)."""
    with AuthUoW(session) as uow:
        return AuthService.register(uow, data)


@router.post("/login", response_model=TokenResponse, status_code=status.HTTP_200_OK)
@limiter.limit("10/minute")
def login(request: Request, data: LoginRequest, session: Session = Depends(get_session)):
    with AuthUoW(session) as uow:
        return AuthService.login(uow, data)


@router.post("/refresh", response_model=TokenResponse, status_code=status.HTTP_200_OK)
def refresh(data: RefreshRequest, session: Session = Depends(get_session)):
    with AuthUoW(session) as uow:
        return AuthService.refresh(uow, data.refresh_token)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(
    data: RefreshRequest,
    session: Session = Depends(get_session),
    _current_user: dict = Depends(get_current_user),
):
    with AuthUoW(session) as uow:
        AuthService.logout(uow, data.refresh_token)
