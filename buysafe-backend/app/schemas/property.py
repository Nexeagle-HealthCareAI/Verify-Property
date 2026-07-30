from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PropertyBase(BaseModel):
    title: str
    type: str
    price: str
    address: str
    status: Optional[str] = "Available"
    image: Optional[str] = None
    bed: Optional[int] = None
    bath: Optional[int] = None
    sqft: Optional[int] = None
    is_featured: Optional[bool] = False

class PropertyCreate(PropertyBase):
    pass

class PropertyUpdate(PropertyBase):
    pass

class PropertyInDBBase(PropertyBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class Property(PropertyInDBBase):
    pass
