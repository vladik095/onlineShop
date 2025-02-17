from sqlalchemy import JSON, Column, Integer, String

from app.database import Base


class Products(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    price = Column(Integer)
    decriptions = Column(String, nullable=False)
    specifications = Column(Integer, nullable=False)
    quantity = Column(Integer)