from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from ...core.db import get_db

router = APIRouter(prefix="/db", tags=["db"])

@router.get("/check")
async def db_check(db: AsyncSession = Depends(get_db)):
    result = await db.execute(text("SELECT NOW()"))
    current_time = result.scalar()
    return {"database_connected": True, "server_time": str(current_time)}
