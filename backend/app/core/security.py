# backend/app/core/security.py
from jose import jwt, JWTError
from fastapi import HTTPException, status
import os

SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET", "")  # ✅ Add this env var in .env

async def verify_supabase_jwt(token: str):
    """
    Simplified local JWT verification using Supabase JWT secret (HS256)
    """
    try:
        payload = jwt.decode(
            token,
            SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            audience="authenticated"
        )


        return payload
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid token: {str(e)}"
        )
