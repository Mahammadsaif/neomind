# backend/app/main.py
from fastapi import FastAPI
from app.api.routes import db_test, content, auth

app = FastAPI(title="MindGrind Backend")

app.include_router(db_test.router, prefix="/api/v1/db", tags=["Database"])
app.include_router(auth.router, prefix="/api/v1", tags=["Auth"]) 
app.include_router(content.router, prefix="/api/v1", tags=["Content"])

@app.get("/health")
async def health():
    return {"status": "ok"}
