from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ArticleBase(BaseModel):
    title: str
    slug: str
    category: str
    emoji: Optional[str] = None
    excerpt: Optional[str] = None
    content: str
    read_time: Optional[str] = None
    is_featured: bool = False
    is_published: bool = False

class ArticleCreate(ArticleBase):
    pass

class ArticleUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    category: Optional[str] = None
    emoji: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    read_time: Optional[str] = None
    is_featured: Optional[bool] = None
    is_published: Optional[bool] = None

class ArticleResponse(ArticleBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
