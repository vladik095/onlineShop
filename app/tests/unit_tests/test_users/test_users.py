from datetime import datetime, timedelta, timezone
from unittest.mock import AsyncMock, patch

import pytest
from fastapi import Depends, FastAPI, HTTPException, Request, status
from fastapi.testclient import TestClient
from jose import jwt
from passlib.context import CryptContext
from pydantic import EmailStr

from app.config import settings
from app.users.auth import (
    authenticate_user,
    create_access_token,
    get_password_hash,
    verify_password,
)
from app.users.dao import UsersDAO
from app.users.dependencies import get_current_user, get_token
from app.users.router import router
from app.users.schemas import SUserAuth


# Фикстуры
@pytest.fixture
def user_data():
    return SUserAuth(email="test@example.com", password="password123")


@pytest.fixture
def hashed_password():
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    return pwd_context.hash("password123")


@pytest.fixture
def test_app():
    app = FastAPI()
    app.include_router(router)
    return app


@pytest.fixture
def client(test_app):
    return TestClient(test_app)


# Тесты для auth.py
def test_get_password_hash():
    password = "testpassword"
    hashed = get_password_hash(password)
    assert isinstance(hashed, str)
    assert hashed != password


def test_verify_password_success(hashed_password):
    assert verify_password("password123", hashed_password) is True


def test_verify_password_failure(hashed_password):
    assert verify_password("wrongpassword", hashed_password) is False


def test_create_access_token():
    test_data = {"sub": "123"}
    token = create_access_token(test_data)
    
    assert isinstance(token, str)
    
    decoded = jwt.decode(
        token, 
        settings.SECRET_KEY, 
        algorithms=[settings.ALGORITHM]
    )
    assert decoded["sub"] == "123"
    assert "exp" in decoded


# Тесты для аутентификации
@pytest.mark.asyncio
async def test_authenticate_user_success(user_data, hashed_password):
    mock_user = AsyncMock()
    mock_user.hashed_password = hashed_password
    
    with patch.object(UsersDAO, "find_one_or_none", return_value=mock_user):
        user = await authenticate_user(user_data.email, user_data.password)
        assert user is mock_user


@pytest.mark.asyncio
async def test_authenticate_user_not_found(user_data):
    with patch.object(UsersDAO, "find_one_or_none", return_value=None):
        user = await authenticate_user(user_data.email, user_data.password)
        assert user is None


@pytest.mark.asyncio
async def test_authenticate_user_wrong_password(user_data, hashed_password):
    mock_user = AsyncMock()
    mock_user.hashed_password = hashed_password
    
    with patch.object(UsersDAO, "find_one_or_none", return_value=mock_user):
        user = await authenticate_user(user_data.email, "wrongpassword")
        assert user is None


# Тесты для роутера
def test_register_user_success(client, user_data):
    with patch.object(UsersDAO, "find_one_or_none", return_value=None), \
         patch.object(UsersDAO, "add") as mock_add:
        
        response = client.post("/auth/register", json=user_data.dict())
        
        assert response.status_code == 200
        assert response.json() == {"message": "Пользователь успешно зарегистрирован"}
        mock_add.assert_called_once()


def test_register_user_already_exists(client, user_data):
    mock_user = AsyncMock()
    
    with patch.object(UsersDAO, "find_one_or_none", return_value=mock_user):
        response = client.post("/auth/register", json=user_data.dict())
        
        assert response.status_code == 400
        assert response.json()["detail"] == "Пользователь уже существует"


def test_login_user_success(client, user_data, hashed_password):
    mock_user = AsyncMock()
    mock_user.id = 1
    mock_user.hashed_password = hashed_password
    
    with patch.object(UsersDAO, "find_one_or_none", return_value=mock_user):
        response = client.post("/auth/login", json=user_data.dict())
        
        assert response.status_code == 200
        assert "access_token" in response.json()
        assert "user_access_token" in response.cookies


def test_login_user_not_found(client, user_data):
    with patch.object(UsersDAO, "find_one_or_none", return_value=None):
        response = client.post("/auth/login", json=user_data.dict())
        
        assert response.status_code == 401
        assert response.json()["detail"] == "Неверная почта или пароль"


def test_login_user_wrong_password(client, user_data, hashed_password):
    mock_user = AsyncMock()
    mock_user.hashed_password = hashed_password
    
    with patch.object(UsersDAO, "find_one_or_none", return_value=mock_user):
        response = client.post("/auth/login", json={
            "email": user_data.email,
            "password": "wrongpassword"
        })
        
        assert response.status_code == 401
        assert response.json()["detail"] == "Неверная почта или пароль"


# Тесты для зависимостей
def test_get_token_success():
    request = Request(scope={
        "type": "http", 
        "headers": [(b"cookie", b"booking_access_token=testtoken")]
    })
    token = get_token(request)
    assert token == "testtoken"


def test_get_token_missing():
    request = Request(scope={"type": "http", "headers": []})
    with pytest.raises(HTTPException) as exc_info:
        get_token(request)
    assert exc_info.value.status_code == 401


def test_get_current_user():
    result = get_current_user(token="testtoken")
    assert result == "user"