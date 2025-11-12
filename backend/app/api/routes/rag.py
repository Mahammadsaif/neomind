from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.core.db import get_db
from app.models.embeddings_model import Embedding
from sentence_transformers import SentenceTransformer
import numpy as np
import google.generativeai as genai
import os

router = APIRouter()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Load embedding model once globally
model = SentenceTransformer("all-MiniLM-L6-v2")


def cosine_similarity(vec1, vec2):
    vec1 = np.array(vec1)
    vec2 = np.array(vec2)
    return np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))


@router.post("/query")
def semantic_query(payload: dict, db: Session = Depends(get_db)):
    try:
        query = payload.get("query")
        if not query:
            raise HTTPException(status_code=400, detail="Missing 'query' field")

        query_vector = model.encode(query, convert_to_numpy=True)
        result = db.execute(select(Embedding))
        embeddings = result.scalars().all()

        if not embeddings:
            raise HTTPException(status_code=404, detail="No embeddings found")

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
def generate_answer(payload: dict, db: Session = Depends(get_db)):
    try:
        query = payload.get("query")
        if not query:
            raise HTTPException(status_code=400, detail="Missing 'query' field")

        query_vector = model.encode(query, convert_to_numpy=True)
        result = db.execute(select(Embedding))
        embeddings = result.scalars().all()

        if not embeddings:
            raise HTTPException(status_code=404, detail="No embeddings found")

        # Compute similarities
        scored_chunks = []
        for emb in embeddings:
            sim = cosine_similarity(query_vector, emb.embedding)
            scored_chunks.append({
                "chunk_text": emb.chunk_text,
                "similarity": float(sim)
            })

        # Get top 3 relevant chunks
        top_chunks = sorted(scored_chunks, key=lambda x: x["similarity"], reverse=True)[:3]
        context = "\n\n".join([chunk["chunk_text"] for chunk in top_chunks])

        prompt = f"""
        You are a helpful assistant. Use the context below to answer the question clearly and concisely.

        Context:
        {context}

        Question: {query}

        Answer:
        """

        # Generate answer with Gemini
        model_gemini = genai.GenerativeModel("models/gemini-2.5-pro")
        response = model_gemini.generate_content([prompt])

        return {
            "query": query,
            "context_used": top_chunks,
            "answer": response.text
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))