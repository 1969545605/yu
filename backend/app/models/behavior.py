from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Behavior(Base):
    __tablename__ = 'behaviors'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False, index=True)
    service_id: Mapped[int] = mapped_column(ForeignKey('services.id'), nullable=False, index=True)
    action: Mapped[str] = mapped_column(String(10), nullable=False)  # VIEW / BUY
