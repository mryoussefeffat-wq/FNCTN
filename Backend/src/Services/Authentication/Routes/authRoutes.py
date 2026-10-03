"""Authentication routes.

Thin FastAPI routes that validate input and delegate to Controllers.
Each route includes detailed documentation and example bodies.
"""

from fastapi import APIRouter, Depends, status

from Authentication.Schemas.authSchemas import (
    SignUpRequest,
    SignUpResponse,
    LoginRequest,
    LoginResponse,
    UserMeResponse,
    LogoutResponse,
)
from Authentication.Controllers.authControllers import (
    register_user,
    login_user,
    get_current_user_profile,
    logout_user,
)
from Authentication.dependencies import get_auth_repo, get_current_user
from Authentication.Repositories.Interfaces.authInterface import AuthRepositoryInterface


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post(
    "/signup",
    response_model=SignUpResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new user account",
    description="Register a new user with `email`, `password`, `full_name`, and optional `role` and `university_id`.",
)
async def signup(payload: SignUpRequest, repo: AuthRepositoryInterface = Depends(get_auth_repo)):
    """Register a new user account."""
    return register_user(payload, repo)


@router.post(
    "/login",
    response_model=LoginResponse,
    status_code=status.HTTP_200_OK,
    summary="Login and receive a JWT",
    description="Authenticate with `email` and `password`. Returns a signed JWT access token on success.",
)
async def login(payload: LoginRequest, repo: AuthRepositoryInterface = Depends(get_auth_repo)):
    """Authenticate user with email and password."""
    return login_user(payload, repo)


@router.get(
    "/me",
    response_model=UserMeResponse,
    status_code=status.HTTP_200_OK,
    summary="Get current user profile",
    description="Returns the profile information of the currently authenticated user using Bearer token.",
)
async def me(
    current_user_id: int = Depends(get_current_user),
    repo: AuthRepositoryInterface = Depends(get_auth_repo),
):
    """Retrieve profile of the currently logged-in user."""
    return get_current_user_profile(current_user_id, repo)


@router.post(
    "/logout",
    response_model=LogoutResponse,
    status_code=status.HTTP_200_OK,
    summary="Logout user",
    description="Logout the current user. Since tokens are stateless, the client should discard the token locally.",
)
async def logout():
    """Logout endpoint."""
    return logout_user()
