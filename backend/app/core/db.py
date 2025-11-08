# backend/app/core/db.py

import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set in .env")

# ✅ Ensure async driver prefix
if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://")

# ✅ Create async engine (disable statement caching via connect_args)
engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    future=True,
    connect_args={
        "statement_cache_size": 0,  # 🔥 disable prepared statement caching properly
        "prepared_statement_cache_size": 0  # double safety for asyncpg
    }
)

# ✅ Session factory
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()


# ✅ Dependency for FastAPI routes
async def get_db():
    async with async_session() as session:
        yield session
