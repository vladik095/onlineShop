import asyncio
import json
import os

import pytest
from sqlalchemy import insert

from app.config import settings
from app.database import Base, async_session_maker, engine
from app.products.models import Products
from app.users.models import Users


@pytest.fixture(scope="session", autouse=True)
async def prepare_database():
    assert settings.MODE == "TEST"

    # Очищаем и создаем таблицы
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

    def open_mock_json(model: str):
        # Используем f-строку для подстановки имени модели
        file_path = f"app/tests/mock_{model}.json"
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"Mock file not found: {file_path}")
        
        with open(file_path, "r", encoding="utf-8") as file:
            return json.load(file)
    
    try:
        users = open_mock_json("users")
        products = open_mock_json("products")

        async with async_session_maker() as session:
            # Используем .values() вместо .value() и передаем список
            if users:
                await session.execute(insert(Users).values(users))
            if products:
                await session.execute(insert(Products).values(products))
            
            await session.commit()
    except Exception as e:
        pytest.fail(f"Failed to prepare test database: {str(e)}")


@pytest.fixture(scope="session")
def event_loop(request):
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()