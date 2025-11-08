# backend/app/models/content_model.py

import uuid
from sqlalchemy import Column, String, Text, JSON, ForeignKey, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app.core.db import Base


class Content(Base):
    __tablename__ = "content"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), nullable=False, default=uuid.uuid4)  # ✅ auto UUID if not provided
    title = Column(String)
    url = Column(String)
    source_type = Column(String)  # web | pdf | yt | upload
    raw_text_path = Column(String)
    meta = Column(JSON, default=dict)
    processing_status = Column(String, default="pending")
    error_message = Column(Text, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())
