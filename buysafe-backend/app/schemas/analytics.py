from pydantic import BaseModel
from typing import Optional, Any, Dict
from datetime import datetime

class ActivityLogBase(BaseModel):
    session_id: str
    action: str
    details: Optional[Dict[str, Any]] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    user_id: Optional[int] = None

class ActivityLogCreate(ActivityLogBase):
    pass

class ActivityLog(ActivityLogBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class AnalyticsDashboard(BaseModel):
    total_users: int
    total_sessions: int
    total_page_views: int
    recent_activity: list[ActivityLog]
