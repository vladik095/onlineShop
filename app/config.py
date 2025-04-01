from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    MODE: Literal["DEV", "TEST", "PROD"]

    DB_PORT: str
    DB_USER: str
    DB_HOST: str
    DB_PASS: str
    DB_NAME: str

    @property
    def DATABASE_URL(self) -> str:
        return f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
    
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1
    SECRET_KEY: str
    ALGORITHM: str

    TEST_DB_PORT: str
    TEST_DB_USER: str
    TEST_DB_HOST: str
    TEST_DB_PASS: str
    TEST_DB_NAME: str

    @property
    def TEST_DATABASE_URL(self) -> str:
        return f"postgresql+asyncpg://{self.TEST_DB_USER}:{self.TEST_DB_PASS}@{self.TEST_DB_HOST}:{self.TEST_DB_PORT}/{self.TEST_DB_NAME}"
   
    # Заменяем вложенный класс Config на model_config
    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()