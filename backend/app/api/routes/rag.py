from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.db import get_db
from app.models.embeddings_model import Embedding
from sentence_transformers import SentenceTransformer
import numpy as np
import google.generativeai as genai
import os

router = APIRouter()

# Configure Gemini API key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Load the embedding model once globally
model = SentenceTransformer("all-MiniLM-L6-v2")


def cosine_similarity(vec1, vec2):
    """Compute cosine similarity between two numpy arrays."""
    vec1 = np.array(vec1)
    vec2 = np.array(vec2)
    return np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))


@router.post("/query")
async def semantic_query(payload: dict, db: AsyncSession = Depends(get_db)):
    """
    Given a user query, find the most semantically similar chunks.
    """
    try:
        query = payload.get("query")
        if not query:
            raise HTTPException(status_code=400, detail="Missing 'query' field in body")

        query_vector = model.encode(query, convert_to_numpy=True)

        result = await db.execute(select(Embedding))
        embeddings = result.scalars().all()

        if not embeddings:
            raise HTTPException(status_code=404, detail="No embeddings found in database")

        scored_chunks = []
        for emb in embeddings:
            sim = cosine_similarity(query_vector, emb.embedding)
            scored_chunks.append({
                "chunk_text": emb.chunk_text,
                "similarity": float(sim)
            })

        top_matches = sorted(scored_chunks, key=lambda x: x["similarity"], reverse=True)[:3]

        return {"query": query, "top_matches": top_matches}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/generate")
async def generate_answer(payload: dict, db: AsyncSession = Depends(get_db)):
    """
    Retrieves top chunks using semantic search and generates an answer using Gemini.
    """
    try:
        query = payload.get("query")
        if not query:
            raise HTTPException(status_code=400, detail="Missing 'query' field in body")

        # Step 1: Encode query and retrieve embeddings
        query_vector = model.encode(query, convert_to_numpy=True)
        result = await db.execute(select(Embedding))
        embeddings = result.scalars().all()

        if not embeddings:
            raise HTTPException(status_code=404, detail="No embeddings found")

        # Step 2: Compute cosine similarities
        scored_chunks = []
        for emb in embeddings:
            sim = cosine_similarity(query_vector, emb.embedding)
            scored_chunks.append({
                "chunk_text": emb.chunk_text,
                "similarity": float(sim)
            })

        # Step 3: Select top 3 most similar chunks
        top_chunks = sorted(scored_chunks, key=lambda x: x["similarity"], reverse=True)[:3]
        context = "\n\n".join([chunk["chunk_text"] for chunk in top_chunks])

        # Step 4: Create prompt for Gemini
        prompt = f"""
You are a helpful assistant. Use the context below to answer the question clearly and concisely.

Context:
{context}

Question: {query}

Answer:
"""

        # Step 5: Generate response using Gemini
        model_gemini = genai.GenerativeModel("gemini-1.5-pro-latest")
        response = model_gemini.generate_content(prompt)

        return {
            "query": query,
            "context_used": top_chunks,
            "answer": response.text
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))