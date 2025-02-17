from fastapi import APIRouter, Depends

router = APIRouter(
    prefix="/products",
    tags=["Продукты"],
)
 

@router.get("")
def d():
    return "dsdsd"

