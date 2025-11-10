# backend/app/api/routes/rag.py

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.db import get_db
from app.models.content_model import Content
from app.models.embeddings_model import Embedding
from sentence_transformers import SentenceTransformer
import uuid

router = APIRouter()

# Load embedding model once globally
model = SentenceTransformer("all-MiniLM-L6-v2")

@router.post("/embed/{content_id}")
async def generate_embeddings(content_id: str, payload: dict, db: AsyncSession = Depends(get_db)):
    try:
        text = payload.get("text")
        if not text:
            raise HTTPException(status_code=400, detail="Missing 'text' field in body")

        # check content exists
        result = await db.execute(select(Content).where(Content.id == content_id))
        content = result.scalars().first()
        if not content:
            raise HTTPException(status_code=404, detail="Content not found")

        # Split text into smaller chunks
        chunks = [chunk.strip() for chunk in text.split(".") if chunk.strip()]

        # Generate embeddings
        embeddings = model.encode(chunks, convert_to_numpy=True).tolist()

        # Save to DB
        for chunk, emb in zip(chunks, embeddings):
            new_emb = Embedding(
                id=uuid.uuid4(),
                content_id=content_id,
                chunk_text=chunk,
                embedding=emb
            )
            db.add(new_emb)

        await db.commit()
        return {"message": "Embeddings generated and saved successfully", "chunks_created": len(chunks)}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))