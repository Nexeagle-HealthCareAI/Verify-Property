from typing import List, Optional, Tuple
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.analytics import ActivityLog
from app.schemas.analytics import ActivityLogCreate
from app.models.user import User

def create_activity_log(db: Session, log_in: ActivityLogCreate) -> ActivityLog:
    db_log = ActivityLog(
        session_id=log_in.session_id,
        action=log_in.action,
        details=log_in.details,
        ip_address=log_in.ip_address,
        user_agent=log_in.user_agent,
        user_id=log_in.user_id
    )
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log

def get_dashboard_metrics(db: Session) -> dict:
    total_users = db.query(func.count(User.id)).scalar() or 0
    total_sessions = db.query(func.count(func.distinct(ActivityLog.session_id))).scalar() or 0
    total_page_views = db.query(func.count(ActivityLog.id)).filter(ActivityLog.action == "PAGE_VIEW").scalar() or 0
    
    recent_activity = db.query(ActivityLog).order_by(ActivityLog.created_at.desc()).limit(20).all()
    
    return {
        "total_users": total_users,
        "total_sessions": total_sessions,
        "total_page_views": total_page_views,
        "recent_activity": recent_activity
    }
