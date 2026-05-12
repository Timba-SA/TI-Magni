from fastapi import APIRouter, Depends, Request, status
from sqlmodel import Session

from app.core.database import get_session
from app.core.dependencies import get_current_user
from app.core.middleware import limiter
from app.modules.auth.schemas import LoginRequest, RefreshRequest, RegisterRequest, TokenResponse
from app.modules.auth.service import AuthService

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(data: RegisterRequest, session: Session = Depends(get_session)):
    """Registra un nuevo usuario y retorna tokens (queda logueado directamente)."""
    return AuthService(session).register(data)


@router.post("/login", response_model=TokenResponse, status_code=status.HTTP_200_OK)
@limiter.limit("10/minute")
def login(request: Request, data: LoginRequest, session: Session = Depends(get_session)):
    return AuthService(session).login(data)


@router.post("/refresh", response_model=TokenResponse, status_code=status.HTTP_200_OK)
def refresh(data: RefreshRequest, session: Session = Depends(get_session)):
    return AuthService(session).refresh(data.refresh_token)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(
    data: RefreshRequest,
    session: Session = Depends(get_session),
    _current_user: dict = Depends(get_current_user),
):
    AuthService(session).logout(data.refresh_token)
