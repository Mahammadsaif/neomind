# backend/create_tables.py

import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from app.core.db import Base
from app.models import content_model, embeddings_model
from app.core.config import settings

async def create_all_tables():
    print("Connecting to database...")
    engine = create_async_engine(settings.DATABASE_URL, echo=True)

    async with engine.begin() as conn:
        print("Creating tables (if not exist)...")
        await conn.run_sync(Base.metadata.create_all)

    await engine.dispose()
    print("All tables created successfully in Supabase!")

if __name__ == "__main__":
    asyncio.run(create_all_tables())