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


# Improved chunking helper function
def smart_chunk_text(text: str, max_words: int = 120, overlap: int = 20):
    """
    Splits long text into overlapping chunks for better context.
    Example: 120 words per chunk, 20 words overlap.
    """
    words = text.split()
    chunks = []
    start = 0

    while start < len(words):
        end = start + max_words
        chunk = " ".join(words[start:end])
        chunks.append(chunk)
        start += max_words - overlap  # slide window with overlap

    return chunks


# Embedding generator route
@router.post("/embed/{content_id}")
async def generate_embeddings(content_id: str, payload: dict, db: AsyncSession = Depends(get_db)):
    try:
        text = payload.get("text")
        if not text:
            raise HTTPException(status_code=400, detail="Missing 'text' field in body")

        # Check if content exists
        result = await db.execute(select(Content).where(Content.id == content_id))
        content = result.scalars().first()
        if not content:
            raise HTTPException(status_code=404, detail="Content not found")

        # Use improved chunking instead of simple sentence split
        chunks = smart_chunk_text(text)

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
        return {
            "message": "Embeddings generated and saved successfully",
            "chunks_created": len(chunks)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))