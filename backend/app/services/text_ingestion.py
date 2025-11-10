# backend/app/services/text_ingestion.py
import re
from bs4 import BeautifulSoup
import requests
from typing import List

def clean_text(text: str) -> str:
    """Remove extra whitespace, line breaks."""
    return re.sub(r'\s+', ' ', text).strip()

def extract_text_from_url(url: str) -> str:
    """Fetch webpage and extract main text."""
    resp = requests.get(url, timeout=10)
    soup = BeautifulSoup(resp.text, "html.parser")

    # try to get only main content
    paragraphs = soup.find_all("p")
    text = " ".join([p.get_text() for p in paragraphs])
    return clean_text(text)

def chunk_text(text: str, chunk_size: int = 500) -> List[str]:
    """Split text into smaller chunks for embedding."""
    sentences = re.split(r'(?<=[.!?]) +', text)
    chunks, current_chunk = [], ""

    for sentence in sentences:
        if len(current_chunk) + len(sentence) <= chunk_size:
            current_chunk += " " + sentence
        else:
            chunks.append(current_chunk.strip())
            current_chunk = sentence
    if current_chunk:
        chunks.append(current_chunk.strip())

    return chunks