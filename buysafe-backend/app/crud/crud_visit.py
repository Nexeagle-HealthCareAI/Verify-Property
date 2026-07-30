from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.visit import Visit
from app.schemas.visit import VisitCreate, VisitUpdate

def get_visit(db: Session, visit_id: int) -> Optional[Visit]:
    return db.query(Visit).filter(Visit.id == visit_id).first()

def get_visits(db: Session, skip: int = 0, limit: int = 100) -> List[Visit]:
    return db.query(Visit).offset(skip).limit(limit).all()

def create_visit(db: Session, visit: VisitCreate) -> Visit:
    db_visit = Visit(
        name=visit.name,
        email=visit.email,
        phone=visit.phone,
        scheduled_date=visit.scheduled_date,
        property_id=visit.property_id
    )
    db.add(db_visit)
    db.commit()
    db.refresh(db_visit)
    return db_visit

def update_visit(db: Session, visit_id: int, visit_update: VisitUpdate) -> Optional[Visit]:
    db_visit = get_visit(db, visit_id)
    if not db_visit:
        return None
    if visit_update.status is not None:
        db_visit.status = visit_update.status
    if visit_update.scheduled_date is not None:
        db_visit.scheduled_date = visit_update.scheduled_date
    db.commit()
    db.refresh(db_visit)
    return db_visit

def delete_visit(db: Session, visit_id: int) -> bool:
    db_visit = get_visit(db, visit_id)
    if not db_visit:
        return False
    db.delete(db_visit)
    db.commit()
    return True
