# backend/app/api/routes/ingest.py
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.db import get_db
from app.services.text_ingestion import extract_text_from_url, chunk_text
from app.services.embedding_service import generate_embeddings
from app.models.embeddings_model import Embedding
from app.models.content_model import Content
import uuid

router = APIRouter()

@router.post("/ingest/article")
async def ingest_article(
    url: str,
    user_id: str,
    db: AsyncSession = Depends(get_db)
):
    try:
        text = extract_text_from_url(url)
        if not text:
            raise HTTPException(status_code=400, detail="No text extracted from URL")

        chunks = chunk_text(text)
        vectors = generate_embeddings(chunks)

        # create content entry
        new_content = Content(
            id=uuid.uuid4(),
            user_id=user_id,
            title="Web Article",
            url=url,
            source_type="web",
            raw_text_path=None,
            meta={"chunks": len(chunks)},
            processing_status="processed",
        )
        db.add(new_content)
        await db.commit()

        # insert embeddings
        for chunk, vector in zip(chunks, vectors):
            emb = Embedding(
                content_id=new_content.id,
                chunk_text=chunk,
                embedding=vector
            )
            db.add(emb)

        await db.commit()
        return {"content_id": str(new_content.id), "chunks": len(chunks)}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))