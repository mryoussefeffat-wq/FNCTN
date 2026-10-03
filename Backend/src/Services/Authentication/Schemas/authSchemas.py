"""Pydantic schemas for Authentication."""

from typing import Optional, Literal
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field


UserRole = Literal["participant", "organizer", "scouter", "admin"]


class SignUpRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, description="Password (minimum 8 characters)")
    full_name: str = Field(..., min_length=2, max_length=100, description="Full name of user")
    role: Optional[UserRole] = Field(default="participant", description="User role in the system")
    university_id: Optional[int] = Field(default=None, description="Optional university ID")

    model_config = {
        "json_schema_extra": {
            "example": {
                "email": "athlete@example.com",
                "password": "strong_password_123",
                "full_name": "Karim Hassan",
                "role": "participant",
                "university_id": 1,
            }
        }
    }


class SignUpResponse(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: str
    university_id: Optional[int] = None
    created_at: Optional[datetime] = None

    model_config = {
        "json_schema_extra": {
            "example": {
                "id": 1,
                "email": "athlete@example.com",
                "full_name": "Karim Hassan",
                "role": "participant",
                "university_id": 1,
                "created_at": "2026-10-03T12:00:00Z",
            }
        }
    }


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, description="User password")

    model_config = {
        "json_schema_extra": {
            "example": {
                "email": "athlete@example.com",
                "password": "strong_password_123",
            }
        }
    }


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

    model_config = {
        "json_schema_extra": {
            "example": {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "token_type": "bearer",
            }
        }
    }


class UserMeResponse(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: str
    university_id: Optional[int] = None
    created_at: Optional[datetime] = None

    model_config = {
        "json_schema_extra": {
            "example": {
                "id": 1,
                "email": "athlete@example.com",
                "full_name": "Karim Hassan",
                "role": "participant",
                "university_id": 1,
                "created_at": "2026-10-03T12:00:00Z",
            }
        }
    }


class LogoutResponse(BaseModel):
    message: str

    model_config = {
        "json_schema_extra": {
            "example": {
                "message": "Successfully logged out"
            }
        }
    }
