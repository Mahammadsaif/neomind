# backend/app/api/routes/auth.py

from typing import Optional
from fastapi import APIRouter, Depends, Header, HTTPException, status
from pydantic import BaseModel
from app.core import security

router = APIRouter(prefix="/auth", tags=["auth"])

class CurrentUser(BaseModel):
    sub: str
    email: Optional[str] = None
    aud: Optional[str] = None
    exp: Optional[int] = None
    iat: Optional[int] = None

async def get_current_user(authorization: Optional[str] = Header(None)) -> CurrentUser:
    """
    Extract and verify Supabase JWT from Authorization header.
    """
    if not authorization:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing Authorization header")
    if not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid auth scheme")

    token = authorization.split(" ", 1)[1].strip()
    claims = await security.verify_supabase_jwt(token)

    return CurrentUser(
        sub=claims.get("sub"),
        email=claims.get("email"),
        aud=claims.get("aud"),
        exp=claims.get("exp"),
        iat=claims.get("iat"),
    )

@router.get("/me", response_model=CurrentUser)
async def me(current_user: CurrentUser = Depends(get_current_user)):
    """
    Returns current Supabase user info (debug/test route)
    """
    return current_user
