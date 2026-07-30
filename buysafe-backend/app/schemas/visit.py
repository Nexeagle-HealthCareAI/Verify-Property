from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class VisitBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    scheduled_date: datetime
    property_id: int

class VisitCreate(VisitBase):
    pass

class VisitUpdate(BaseModel):
    status: Optional[str] = None
    scheduled_date: Optional[datetime] = None

class VisitInDBBase(VisitBase):
    id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class Visit(VisitInDBBase):
    pass
