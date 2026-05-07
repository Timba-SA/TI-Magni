from datetime import datetime, timedelta, timezone

from fastapi import HTTPException, status

from app.core.security import (
    verify_password,
    create_access_token,
    create_refresh_token,
    hash_refresh_token,
)
from app.core.config import settings
from app.modules.auth.schemas import LoginRequest, TokenResponse
from app.modules.auth.unit_of_work import AuthUoW


class AuthService:

    @staticmethod
    def login(uow: AuthUoW, data: LoginRequest) -> TokenResponse:
        user = uow.auth.get_user_by_email(data.email)

        # Mismo mensaje para email inexistente o contraseña incorrecta (no filtrar info)
        invalid_exc = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales inválidas.",
        )
        if not user or not verify_password(data.password, user.password_hash):
            raise invalid_exc

        roles = uow.auth.get_user_roles(user.id)
        access_token = create_access_token(
            {"sub": str(user.id), "email": user.email, "roles": roles}
        )

        # Refresh token: el cliente recibe plaintext, la DB guarda el hash
        refresh_plain = create_refresh_token()
        token_hash = hash_refresh_token(refresh_plain)
        expires_at = datetime.now(timezone.utc) + timedelta(
            days=settings.REFRESH_TOKEN_EXPIRE_DAYS
        )
        uow.auth.create_refresh_token(user.id, token_hash, expires_at)
        uow.commit()

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_plain,
            user={
                "id": user.id,
                "username": user.email.split("@")[0],
                "nombre": user.nombre,
                "apellido": user.apellido,
                "email": user.email,
                "rol": roles[0] if roles else "CLIENT"
            }
        )

    @staticmethod
    def refresh(uow: AuthUoW, refresh_token_plain: str) -> TokenResponse:
        token_hash = hash_refresh_token(refresh_token_plain)
        stored = uow.auth.get_refresh_token_by_hash(token_hash)

        if not stored:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Refresh token inválido o revocado.",
            )

        # Verificar expiración
        if datetime.now(timezone.utc) > stored.expires_at.replace(tzinfo=timezone.utc):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Refresh token expirado.",
            )

        # Rotación: revocar el actual y emitir uno nuevo
        uow.auth.revoke_refresh_token(stored)

        roles = uow.auth.get_user_roles(stored.usuario_id)
        user = stored.usuario
        access_token = create_access_token(
            {"sub": str(stored.usuario_id), "email": user.email, "roles": roles}
        )

        refresh_plain = create_refresh_token()
        new_hash = hash_refresh_token(refresh_plain)
        expires_at = datetime.now(timezone.utc) + timedelta(
            days=settings.REFRESH_TOKEN_EXPIRE_DAYS
        )
        uow.auth.create_refresh_token(stored.usuario_id, new_hash, expires_at)
        uow.commit()

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_plain,
            user={
                "id": user.id,
                "username": user.email.split("@")[0],
                "nombre": user.nombre,
                "apellido": user.apellido,
                "email": user.email,
                "rol": roles[0] if roles else "CLIENT"
            }
        )

    @staticmethod
    def logout(uow: AuthUoW, refresh_token_plain: str) -> None:
        token_hash = hash_refresh_token(refresh_token_plain)
        stored = uow.auth.get_refresh_token_by_hash(token_hash)

        if stored:
            uow.auth.revoke_refresh_token(stored)
            uow.commit()
