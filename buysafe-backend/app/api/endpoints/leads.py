from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_user
from app.schemas.lead import Lead, LeadCreate, LeadUpdate
from app.crud import crud_lead
from app.models.user import User

router = APIRouter()

@router.post("/", response_model=Lead, status_code=status.HTTP_201_CREATED)
def create_lead(lead: LeadCreate, db: Session = Depends(get_db)):
    return crud_lead.create_lead(db=db, lead=lead)

@router.get("/", response_model=List[Lead])
def read_leads(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return crud_lead.get_leads(db=db, skip=skip, limit=limit)

@router.get("/{lead_id}", response_model=Lead)
def read_lead(lead_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_lead = crud_lead.get_lead(db=db, lead_id=lead_id)
    if db_lead is None:
        raise HTTPException(status_code=404, detail="Lead not found")
    return db_lead

@router.put("/{lead_id}", response_model=Lead)
def update_lead(lead_id: int, lead_update: LeadUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_lead = crud_lead.update_lead(db=db, lead_id=lead_id, lead_update=lead_update)
    if db_lead is None:
        raise HTTPException(status_code=404, detail="Lead not found")
    return db_lead

@router.delete("/{lead_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_lead(lead_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    success = crud_lead.delete_lead(db=db, lead_id=lead_id)
    if not success:
        raise HTTPException(status_code=404, detail="Lead not found")
