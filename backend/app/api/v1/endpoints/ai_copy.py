from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.core.deps import get_db
from app.core.deps_auth import get_current_user_id
from app.models.service import Service
from app.services.ai_client import AIClient

router = APIRouter(prefix='/ai', tags=['ai'])


class CopyInput(BaseModel):
    service_id: int
    scene: str = Field(pattern='^(detail|banner|short|seo)$')
    tone: str = Field(pattern='^(friendly|formal|trendy)$')
    length: str = Field(pattern='^(short|medium|long)$')
    extra: str = ''


class CopyOutput(BaseModel):
    prompt: str
    copywriting: str


@router.post('/copywriting', response_model=CopyOutput)
def generate_copy(
    payload: CopyInput,
    _: int = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    service = db.get(Service, payload.service_id)
    if not service:
        title = '未知服务'
        category = '未知分类'
        price = '未知价格'
    else:
        title = service.title
        category = service.category
        price = f'{service.price:.2f}'

    prompt = (
        f'请为本地生活服务生成营销文案。场景：{payload.scene}；语气：{payload.tone}；长度：{payload.length}。'
        f'服务标题：{title}；分类：{category}；价格：{price}。补充信息：{payload.extra}'
    )
    ai_client = AIClient()
    copywriting = ai_client.generate(prompt)
    return CopyOutput(prompt=prompt, copywriting=copywriting)
