from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.schemas.content_schema import ContentCreate, ContentResponse
from app.models.content_model import Content
from app.api.routes.auth import get_current_user, CurrentUser
import uuid

router = APIRouter()

@router.post("/content", response_model=ContentResponse, status_code=201)
def create_content(
    payload: ContentCreate,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user)
):
    try:
        new_content = Content(
            id=str(uuid.uuid4()),
            user_id=current_user.sub,
            title=payload.title,
            url=payload.url,
            source_type=payload.source_type,
            raw_text_path=payload.raw_text_path,
            meta=payload.meta,
            processing_status="pending",
        )
        db.add(new_content)
        db.commit()
        return {"id": new_content.id, "message": "Content saved successfully"}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))