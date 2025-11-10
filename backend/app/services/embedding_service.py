# backend/app/services/embedding_service.py
from sentence_transformers import SentenceTransformer

# lightweight all-rounder embedding model
_model = SentenceTransformer("all-MiniLM-L6-v2")

def generate_embeddings(chunks: list[str]) -> list[list[float]]:
    """Generate vector embeddings for each chunk."""
    return _model.encode(chunks, convert_to_numpy=True).tolist()