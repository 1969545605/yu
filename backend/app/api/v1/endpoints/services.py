from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel, Field
from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from app.core.deps import get_db
from app.core.deps_auth import get_current_user_id
from app.models.behavior import Behavior
from app.models.service import Service

router = APIRouter(prefix='/services', tags=['services'])


class ServiceCreate(BaseModel):
    merchant_id: int
    title: str = Field(min_length=1, max_length=120)
    category: str = Field(min_length=1, max_length=50)
    tags: str = ''
    price: float


class ServiceOut(ServiceCreate):
    id: int


@router.get('', response_model=list[ServiceOut])
def list_services(
    category: str = '',
    q: str = '',
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=20, ge=1, le=100),
    _: int = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    stmt = select(Service)
    if category:
        stmt = stmt.where(Service.category == category)
    if q:
        stmt = stmt.where(or_(Service.title.like(f'%{q}%'), Service.tags.like(f'%{q}%')))
    stmt = stmt.order_by(Service.id.desc()).offset(skip).limit(limit)
    return list(db.scalars(stmt).all())


@router.post('', response_model=ServiceOut)
def create_service(
    payload: ServiceCreate,
    _: int = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    service = Service(**payload.model_dump())
    db.add(service)
    db.commit()
    db.refresh(service)
    return service


@router.get('/{service_id}', response_model=ServiceOut)
def get_service(service_id: int, user_id: int = Depends(get_current_user_id), db: Session = Depends(get_db)):
    service = db.get(Service, service_id)
    if not service:
        raise HTTPException(status_code=404, detail='Service not found')
    db.add(Behavior(user_id=user_id, service_id=service_id, action='VIEW'))
    db.commit()
    return service
