from fastapi import APIRouter

from app.api.v1.endpoints import ai_copy, auth, merchants, orders, reco, services

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(merchants.router)
api_router.include_router(services.router)
api_router.include_router(orders.router)
api_router.include_router(reco.router)
api_router.include_router(ai_copy.router)
