from fastapi import APIRouter, Depends

from app.database import async_session_maker

router = APIRouter(
    prefix="/products",
    tags=["Продукты"],
)
 

@router.get("")
def d():
    return "dsdsd"

