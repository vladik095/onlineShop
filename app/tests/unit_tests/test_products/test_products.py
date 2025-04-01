from unittest.mock import AsyncMock, patch

import pytest
from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.products.dao import ProductsDAO
from app.products.models import Products
from app.products.router import router
from app.products.schemas import SProducts, SProductsCreate, SProductsUpdate


# Фикстуры
@pytest.fixture
def test_app():
    app = FastAPI()
    app.include_router(router)
    return app


@pytest.fixture
def client(test_app):
    return TestClient(test_app)


@pytest.fixture
def product_data():
    return {
        "price": 1000,
        "descriptions": "Test product description",
        "specifications": "Test specifications",
        "quantity": 10
    }


@pytest.fixture
def sample_product():
    return Products(
        id=1,
        price=1000,
        descriptions="Test product",
        specifications="Test specs",
        quantity=5
    )


def test_create_product_failure(client, product_data):
    with patch.object(ProductsDAO, "add", return_value=None):
        response = client.post("/products/", json=product_data)
        
        assert response.status_code == 400
        assert response.json()["detail"] == "Не удалось создать продукт"


def test_get_product_success(client, sample_product):
    with patch.object(ProductsDAO, "find_by_id", return_value=sample_product):
        response = client.get("/products/1")
        
        assert response.status_code == 200
        assert response.json()["id"] == 1
        ProductsDAO.find_by_id.assert_called_once_with(1)


def test_get_product_not_found(client):
    with patch.object(ProductsDAO, "find_by_id", return_value=None):
        response = client.get("/products/999")
        
        assert response.status_code == 404
        assert response.json()["detail"] == "Продукт не найден"


def test_get_all_products(client, sample_product):
    with patch.object(ProductsDAO, "find_all", return_value=[sample_product]):
        response = client.get("/products/")
        
        assert response.status_code == 200
        assert len(response.json()) == 1
        assert response.json()[0]["id"] == 1


def test_update_product_success(client, sample_product):
    update_data = {"price": 1200, "quantity": 8}
    updated_product = sample_product
    updated_product.price = 1200
    updated_product.quantity = 8
    
    with patch.object(ProductsDAO, "update", return_value=updated_product):
        response = client.put("/products/1", json=update_data)
        
        assert response.status_code == 200
        assert response.json()["price"] == 1200
        assert response.json()["quantity"] == 8


def test_update_product_not_found(client):
    update_data = {"price": 1200}
    
    with patch.object(ProductsDAO, "update", return_value=None):
        response = client.put("/products/999", json=update_data)
        
        assert response.status_code == 404
        assert response.json()["detail"] == "Продукт не найден"


def test_delete_product_success(client):
    with patch.object(ProductsDAO, "delete") as mock_delete:
        response = client.delete("/products/1")
        
        assert response.status_code == 200
        assert response.json()["message"] == "Продукт успешно удален"
        mock_delete.assert_called_once_with(1)


# Тесты для моделей
def test_product_model(sample_product):
    assert sample_product.id == 1
    assert sample_product.price == 1000
    assert sample_product.descriptions == "Test product"
    assert sample_product.specifications == "Test specs"
    assert sample_product.quantity == 5


# Тесты для схем
def test_sproducts_schema():
    product_schema = SProducts(
        id=1,
        price=1000,
        descriptions="Test",
        specifications="Specs",
        quantity=5
    )
    
    assert product_schema.id == 1
    assert product_schema.price == 1000
    assert product_schema.descriptions == "Test"


def test_sproducts_create_schema():
    create_schema = SProductsCreate(
        price=1500,
        descriptions="New",
        specifications="New specs",
        quantity=10
    )
    
    assert create_schema.price == 1500
    assert create_schema.quantity == 10


def test_sproducts_update_schema():
    update_schema = SProductsUpdate(
        price=2000,
        quantity=3
    )
    
    assert update_schema.price == 2000
    assert update_schema.quantity == 3
    assert update_schema.descriptions is None