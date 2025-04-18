from sqlalchemy import Column, Integer, String

from app.database import Base


class Products(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    price = Column(Integer)
    descriptions = Column(String, nullable=False) 
    specifications = Column(String, nullable=False)
    quantity = Column(Integer)