from sqlalchemy import Column, String, Boolean, DateTime, Text, text
from app.db.base import Base
from datetime import datetime, timezone

class Article(Base):
    __tablename__ = "articles"

    id = Column(String, primary_key=True, index=True)
    slug = Column(String, unique=True, index=True, nullable=False)
    title = Column(String, nullable=False)
    category = Column(String, nullable=False)
    emoji = Column(String, nullable=True)
    excerpt = Column(Text, nullable=True)
    content = Column(Text, nullable=False) # HTML content
    read_time = Column(String, nullable=True) # e.g. "8 min"
    is_featured = Column(Boolean, default=False)
    is_published = Column(Boolean, default=False)
    
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
