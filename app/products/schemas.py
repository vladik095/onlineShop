from pydantic import BaseModel


class SProducts(BaseModel):
    id: int
    price: int
    descriptions: str
    specifications: str
    quantity: int

class SProductsCreate(BaseModel):
    price: int
    descriptions: str
    specifications: str
    quantity: int

class SProductsUpdate(BaseModel):
    price: int | None = None
    descriptions: str | None = None
    specifications: str | None = None
    quantity: int | None = None