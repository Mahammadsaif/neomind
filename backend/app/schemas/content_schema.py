from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
import uuid

class ContentCreate(BaseModel):
    user_id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4)
    title: Optional[str] = None
    url: Optional[str] = None
    source_type: Optional[str] = None
    raw_text_path: Optional[str] = None
    text: Optional[str] = None
    meta: Optional[Dict[str, Any]] = Field(default_factory=dict)

class ContentResponse(BaseModel):
    id: str
    message: str = "Content saved successfully"
