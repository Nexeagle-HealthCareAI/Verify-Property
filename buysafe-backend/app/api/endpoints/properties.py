from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.api import deps
from app.schemas.property import Property, PropertyCreate, PropertyUpdate
from app.crud import property as crud_property
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[Property])
async def read_properties(
    db: AsyncSession = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve properties.
    """
    properties = await crud_property.get_properties(db, skip=skip, limit=limit)
    return properties

@router.get("/{id}", response_model=Property)
async def read_property(
    id: int,
    db: AsyncSession = Depends(deps.get_db),
) -> Any:
    """
    Get property by ID.
    """
    prop = await crud_property.get_property(db, property_id=id)
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    return prop

@router.post("/", response_model=Property)
async def create_property(
    *,
    db: AsyncSession = Depends(deps.get_db),
    property_in: PropertyCreate,
    current_user: User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Create new property. Only superusers can create properties.
    """
    prop = await crud_property.create_property(db=db, property_in=property_in)
    return prop

@router.put("/{id}", response_model=Property)
async def update_property(
    *,
    db: AsyncSession = Depends(deps.get_db),
    id: int,
    property_in: PropertyUpdate,
    current_user: User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Update a property. Only superusers can update.
    """
    prop = await crud_property.get_property(db, property_id=id)
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    prop = await crud_property.update_property(db=db, db_obj=prop, property_in=property_in)
    return prop

@router.delete("/{id}", response_model=Property)
async def delete_property(
    *,
    db: AsyncSession = Depends(deps.get_db),
    id: int,
    current_user: User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Delete a property. Only superusers can delete.
    """
    prop = await crud_property.delete_property(db=db, property_id=id)
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    return prop
