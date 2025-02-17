from pydantic import Json
from sqlalchemy import Column, Integer, String

from app.database import Base


class Bookings(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    price = Column(Integer)
    decriptions = Column(String, nullable=False)
    specifications = Column(Json)
    quantity = Column(Integer)