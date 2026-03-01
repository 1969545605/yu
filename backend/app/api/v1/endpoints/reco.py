from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.deps import get_db
from app.core.deps_auth import get_current_user_id
from app.models.behavior import Behavior
from app.models.service import Service

router = APIRouter(prefix='/reco', tags=['reco'])


class ServiceOut(BaseModel):
    id: int
    merchant_id: int
    title: str
    category: str
    tags: str
    price: float


@router.get('/user-topn', response_model=list[ServiceOut])
def user_topn(
    n: int = Query(default=5, ge=1, le=20),
    user_id: int | None = Query(default=None),
    token_user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    uid = user_id or token_user_id
    top_category = db.execute(
        select(Service.category, func.count(Behavior.id).label('cnt'))
        .join(Behavior, Behavior.service_id == Service.id)
        .where(Behavior.user_id == uid)
        .group_by(Service.category)
        .order_by(func.count(Behavior.id).desc())
        .limit(1)
    ).first()

    if top_category:
        category = top_category[0]
        stmt = select(Service).where(Service.category == category).order_by(Service.id.desc()).limit(n)
    else:
        stmt = select(Service).order_by(Service.id.desc()).limit(n)

    return list(db.scalars(stmt).all())
