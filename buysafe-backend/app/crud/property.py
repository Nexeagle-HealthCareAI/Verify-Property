from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func

from app.models.property import Property
from app.schemas.property import PropertyCreate, PropertyUpdate

async def get_property(db: AsyncSession, property_id: int) -> Optional[Property]:
    result = await db.execute(select(Property).where(Property.id == property_id))
    return result.scalars().first()

async def get_properties(
    db: AsyncSession, skip: int = 0, limit: int = 100
) -> List[Property]:
    result = await db.execute(select(Property).offset(skip).limit(limit))
    return list(result.scalars().all())

async def create_property(db: AsyncSession, property_in: PropertyCreate) -> Property:
    db_obj = Property(**property_in.model_dump())
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

async def update_property(
    db: AsyncSession, db_obj: Property, property_in: PropertyUpdate
) -> Property:
    update_data = property_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_obj, field, value)
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

async def delete_property(db: AsyncSession, property_id: int) -> Optional[Property]:
    db_obj = await get_property(db, property_id)
    if db_obj:
        await db.delete(db_obj)
        await db.commit()
    return db_obj
