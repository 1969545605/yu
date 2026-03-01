from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.deps import get_db
from app.core.deps_auth import get_current_user_id
from app.models.behavior import Behavior
from app.models.order import Order
from app.models.service import Service

router = APIRouter(prefix='/orders', tags=['orders'])


class OrderCreate(BaseModel):
    service_id: int
    amount: float


class OrderOut(BaseModel):
    id: int
    user_id: int
    service_id: int
    amount: float
    status: str


@router.get('', response_model=list[OrderOut])
def list_orders(user_id: int = Depends(get_current_user_id), db: Session = Depends(get_db)):
    return list(db.scalars(select(Order).where(Order.user_id == user_id).order_by(Order.id.desc())).all())


@router.post('', response_model=OrderOut)
def create_order(
    payload: OrderCreate,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    service = db.get(Service, payload.service_id)
    if not service:
        raise HTTPException(status_code=404, detail='Service not found')
    order = Order(user_id=user_id, service_id=payload.service_id, amount=payload.amount, status='CREATED')
    db.add(order)
    db.add(Behavior(user_id=user_id, service_id=payload.service_id, action='BUY'))
    db.commit()
    db.refresh(order)
    return order
