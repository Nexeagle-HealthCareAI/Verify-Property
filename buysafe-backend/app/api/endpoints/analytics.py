from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_user
from app.schemas.analytics import ActivityLogCreate, ActivityLog, AnalyticsDashboard
from app.crud import analytics as crud_analytics
from app.models.user import User

router = APIRouter()

@router.post("/track", response_model=ActivityLog, status_code=status.HTTP_201_CREATED)
def track_activity(log_in: ActivityLogCreate, request: Request, db: Session = Depends(get_db)):
    # Auto-fill IP if not provided
    if not log_in.ip_address:
        log_in.ip_address = request.client.host if request.client else None
    
    # Auto-fill User Agent if not provided
    if not log_in.user_agent:
        log_in.user_agent = request.headers.get("user-agent")

    return crud_analytics.create_activity_log(db=db, log_in=log_in)

@router.get("/dashboard", response_model=AnalyticsDashboard)
def get_dashboard(db: Session = Depends(get_db)):
    return crud_analytics.get_dashboard_metrics(db=db)
