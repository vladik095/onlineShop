from datetime import date

from pydantic import BaseModel


class SProducts(BaseModel):

    id:int
    price:int
    decriptions: str
    specifications: int
    quantity:int
