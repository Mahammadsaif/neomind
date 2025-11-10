from dotenv import load_dotenv
import os
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../../.env'))

from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DATABASE_URL: str
    SUPABASE_URL: str | None = None
    SUPABASE_AUD: str | None = None
    JWKS_CACHE_TTL: int | None = None

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
