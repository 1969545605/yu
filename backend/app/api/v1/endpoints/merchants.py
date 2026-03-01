from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.deps import get_db
from app.core.deps_auth import get_current_user_id
from app.models.merchant import Merchant

router = APIRouter(prefix='/merchants', tags=['merchants'])


class MerchantCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    address: str = Field(min_length=1, max_length=255)
    lat: float
    lng: float


class MerchantOut(MerchantCreate):
    id: int


@router.get('', response_model=list[MerchantOut])
def list_merchants(_: int = Depends(get_current_user_id), db: Session = Depends(get_db)):
    return list(db.scalars(select(Merchant).order_by(Merchant.id.desc())).all())


@router.post('', response_model=MerchantOut)
def create_merchant(
    payload: MerchantCreate,
    _: int = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    merchant = Merchant(**payload.model_dump())
    db.add(merchant)
    db.commit()
    db.refresh(merchant)
    return merchant
