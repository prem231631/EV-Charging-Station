from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Vehicle
from app.schemas.vehicle import (
    VehicleCreate,
    VehicleResponse,
    VehicleUpdate,
)
from app.core.security import decode_access_token


router = APIRouter(
    prefix="/api/vehicles",
    tags=["Vehicles"],
)


# =========================================================
# CURRENT USER
# =========================================================

def get_current_user_id(
    authorization: str = Depends(
        lambda: None
    ),
):
    pass