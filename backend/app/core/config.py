from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8')

    DATABASE_URL: str
    SECRET_KEY: str = 'change-me'
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    ALGORITHM: str = 'HS256'
    AI_API_BASE: str = ''
    AI_API_KEY: str = ''
    AI_MODEL: str = ''


settings = Settings()
