from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_user
from app.schemas.visit import Visit, VisitCreate, VisitUpdate
from app.crud import crud_visit
from app.models.user import User

router = APIRouter()

@router.post("/", response_model=Visit, status_code=status.HTTP_201_CREATED)
def create_visit(visit: VisitCreate, db: Session = Depends(get_db)):
    return crud_visit.create_visit(db=db, visit=visit)

@router.get("/", response_model=List[Visit])
def read_visits(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return crud_visit.get_visits(db=db, skip=skip, limit=limit)

@router.get("/{visit_id}", response_model=Visit)
def read_visit(visit_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_visit = crud_visit.get_visit(db=db, visit_id=visit_id)
    if db_visit is None:
        raise HTTPException(status_code=404, detail="Visit not found")
    return db_visit

@router.put("/{visit_id}", response_model=Visit)
def update_visit(visit_id: int, visit_update: VisitUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_visit = crud_visit.update_visit(db=db, visit_id=visit_id, visit_update=visit_update)
    if db_visit is None:
        raise HTTPException(status_code=404, detail="Visit not found")
    return db_visit

@router.delete("/{visit_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_visit(visit_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    success = crud_visit.delete_visit(db=db, visit_id=visit_id)
    if not success:
        raise HTTPException(status_code=404, detail="Visit not found")
