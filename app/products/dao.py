from app.dao.base import BaseDAO
from app.products.models import Bookings


class ProductsDAO(BaseDAO):
    model = Bookings
