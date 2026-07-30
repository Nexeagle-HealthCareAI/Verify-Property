from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, Numeric, Boolean, DateTime
from datetime import datetime, timezone
from app.db.base import Base

class Property(Base):
    __tablename__ = "properties"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    type: Mapped[str] = mapped_column(String(50), nullable=False)  # "buy" or "rent"
    price: Mapped[str] = mapped_column(String(50), nullable=False) # e.g. "₹50.0 L", or can be Numeric
    address: Mapped[str] = mapped_column(String(500), nullable=False)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="Available")
    image: Mapped[str] = mapped_column(String(500), nullable=True)
    bed: Mapped[int] = mapped_column(Integer, nullable=True)
    bath: Mapped[int] = mapped_column(Integer, nullable=True)
    sqft: Mapped[int] = mapped_column(Integer, nullable=True)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
