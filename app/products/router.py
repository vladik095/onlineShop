from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import async_session_maker
from app.products.dao import ProductsDAO
from app.products.schemas import SProducts, SProductsCreate, SProductsUpdate

router = APIRouter(
    prefix="/products",
    tags=["Продукты"],
)

@router.post("/", response_model=SProducts)
async def create_product(product_data: SProductsCreate):
    product = await ProductsDAO.add(**product_data.model_dump())
    if not product:
        raise HTTPException(status_code=400, detail="Не удалось создать продукт")
    return product

@router.get("/{product_id}", response_model=SProducts)
async def get_product(product_id: int):
    product = await ProductsDAO.find_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Продукт не найден")
    return product

@router.get("/", response_model=list[SProducts])
async def get_all_products():
    products = await ProductsDAO.find_all()
    return products

@router.put("/{product_id}", response_model=SProducts)
async def update_product(product_id: int, product_data: SProductsUpdate):
    updated_product = await ProductsDAO.update(product_id, **product_data.model_dump(exclude_unset=True))
    if not updated_product:
        raise HTTPException(status_code=404, detail="Продукт не найден")
    return updated_product

@router.delete("/{product_id}")
async def delete_product(product_id: int):
    await ProductsDAO.delete(product_id)
    return {"message": "Продукт успешно удален"}