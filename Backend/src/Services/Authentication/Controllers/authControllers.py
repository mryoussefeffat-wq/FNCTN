"""Authentication controllers: business logic for register/login/session verification.

Controllers do not talk directly to the database; they call repository
interfaces and raise HTTPExceptions on errors.
"""

from datetime import datetime, timedelta, timezone
from typing import Dict, Any, Optional

from fastapi import HTTPException, status
from jose import jwt
import bcrypt
import hashlib

from config import JWT_SECRET, ACCESS_TOKEN_EXPIRE_MINUTES
from Authentication.Schemas.authSchemas import (
    SignUpRequest,
    SignUpResponse,
    LoginRequest,
    LoginResponse,
    UserMeResponse,
    LogoutResponse,
)
from Authentication.Repositories.Interfaces.authInterface import AuthRepositoryInterface


ALGORITHM = "HS256"


def _hash_password(password: str) -> str:
    # Pre-hash with SHA-256 to avoid bcrypt 72-byte limit, then bcrypt the digest
    digest = hashlib.sha256(password.encode("utf-8")).digest()
    hashed = bcrypt.hashpw(digest, bcrypt.gensalt())
    return hashed.decode("utf-8")


def _verify_password(password: str, hashed: str) -> bool:
    digest = hashlib.sha256(password.encode("utf-8")).digest()
    try:
        return bcrypt.checkpw(digest, hashed.encode("utf-8"))
    except Exception:
        return False


def _create_access_token(subject: Any, role: str, expires_minutes: Optional[int] = None) -> str:
    if expires_minutes is None:
        expires_minutes = ACCESS_TOKEN_EXPIRE_MINUTES
    expire = datetime.now(timezone.utc) + timedelta(minutes=expires_minutes)
    payload = {
        "sub": str(subject),
        "role": role,
        "exp": expire,
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=ALGORITHM)
    return token


def register_user(payload: SignUpRequest, repo: AuthRepositoryInterface) -> SignUpResponse:
    if len(payload.password) < 8:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters long",
        )

    # Check uniqueness of email
    if repo.get_user_by_email(payload.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already in use",
        )

    hashed = _hash_password(payload.password)
    user_payload: Dict[str, Any] = {
        "email": payload.email,
        "password_hash": hashed,
        "full_name": payload.full_name,
        "role": payload.role or "participant",
    }
    if payload.university_id is not None:
        user_payload["university_id"] = payload.university_id

    try:
        created = repo.create_user(user_payload)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))

    return SignUpResponse(
        id=int(created["id"]),
        email=created["email"],
        full_name=created["full_name"],
        role=created["role"],
        university_id=created.get("university_id"),
        created_at=created.get("created_at"),
    )


def login_user(payload: LoginRequest, repo: AuthRepositoryInterface) -> LoginResponse:
    user = repo.get_user_by_email(payload.email)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    hashed = user.get("password_hash")
    if not hashed or not _verify_password(payload.password, hashed):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = _create_access_token(subject=user["id"], role=user.get("role", "participant"))
    return LoginResponse(access_token=token, token_type="bearer")


def get_current_user_profile(user_id: int, repo: AuthRepositoryInterface) -> UserMeResponse:
    user = repo.get_user_by_id(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return UserMeResponse(
        id=int(user["id"]),
        email=user["email"],
        full_name=user["full_name"],
        role=user["role"],
        university_id=user.get("university_id"),
        created_at=user.get("created_at"),
    )


def logout_user() -> LogoutResponse:
    return LogoutResponse(message="Successfully logged out")
