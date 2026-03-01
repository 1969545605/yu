from sqlalchemy import Float, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Service(Base):
    __tablename__ = 'services'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    merchant_id: Mapped[int] = mapped_column(ForeignKey('merchants.id'), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    category: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    tags: Mapped[str] = mapped_column(Text, default='', nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False)
