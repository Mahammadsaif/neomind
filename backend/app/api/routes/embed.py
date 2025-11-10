# backend/app/api/routes/embed.py

from fastapi import APIRouter, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import insert
from app.core.db import get_db
from app.models.content_model import Content
from app.models.embeddings_model import Embedding  # we’ll create this model next
from sentence_transformers import SentenceTransformer
import uuid

router = APIRouter()
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

# Simple chunking function
def chunk_text(text, chunk_size=500):
    words = text.split()
    for i in range(0, len(words), chunk_size):
        yield " ".join(words[i:i + chunk_size])

@router.post("/embed/{content_id}")
async def create_embeddings(content_id: str, db: AsyncSession = Depends(get_db)):
    try:
        # Step 1: get content text from DB
        result = await db.execute(select(Content).filter(Content.id == content_id))
        content = result.scalar_one_or_none()
        if not content or not content.text:
            raise HTTPException(status_code=404, detail="Content text not found")

        # Step 2: chunk the text
        chunks = list(chunk_text(content.text))

        # Step 3: create embeddings
        vectors = model.encode(chunks, show_progress_bar=True)

        # Step 4: save to DB
        for chunk, vector in zip(chunks, vectors):
            new_embedding = Embedding(
                id=str(uuid.uuid4()),
                content_id=content.id,
                chunk_text=chunk,
                embedding=vector.tolist()  # convert numpy array to JSON list
            )
            db.add(new_embedding)

        await db.commit()
        return {"status": "success", "chunks": len(chunks)}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))