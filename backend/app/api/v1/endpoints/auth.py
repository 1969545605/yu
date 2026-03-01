from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.deps import get_db
from app.core.security import create_access_token, hash_password, verify_password
from app.models.user import User

router = APIRouter(prefix='/auth', tags=['auth'])


class AuthPayload(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    password: str = Field(min_length=6, max_length=100)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = 'bearer'


@router.post('/register', response_model=TokenResponse)
def register(payload: AuthPayload, db: Session = Depends(get_db)):
    exists = db.scalar(select(User).where(User.username == payload.username))
    if exists:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Username already exists')
    user = User(username=payload.username, hashed_password=hash_password(payload.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    token = create_access_token(user_id=user.id)
    return TokenResponse(access_token=token)


@router.post('/login', response_model=TokenResponse)
def login(payload: AuthPayload, db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(User.username == payload.username))
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid username or password')
    token = create_access_token(user_id=user.id)
    return TokenResponse(access_token=token)
