from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DB_HOST: str
    DB_PORT: str
    DB_USER: str
    DB_PASS: str
    DB_NAME: str

    @property
    def DATABASE_URL(self) -> str:
        return f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
    
    class Config:
        env_file = ".env"

settings = Settings()

print("DB_HOST:", settings.DB_HOST)
print("DB_PORT:", settings.DB_PORT)
print("DB_USER:", settings.DB_USER)
print("DB_PASS:", settings.DB_PASS)
print("DB_NAME:", settings.DB_NAME)