from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class LeadBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    source: Optional[str] = "Website"
    property_id: Optional[int] = None

class LeadCreate(LeadBase):
    pass

class LeadUpdate(BaseModel):
    status: Optional[str] = None
    
class LeadInDBBase(LeadBase):
    id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class Lead(LeadInDBBase):
    pass
