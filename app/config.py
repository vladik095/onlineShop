from pydantic_settings import BaseSettings


class Settings(BaseSettings):
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
    class Config:
        env_file = ".env"

settings = Settings()
print(settings)
