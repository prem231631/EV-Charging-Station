from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Vehicle, User
from app.schemas.vehicle import (
    VehicleCreate,
    VehicleResponse,
    VehicleUpdate,
)
from app.api.auth import get_current_user


router = APIRouter(
    prefix="/api/vehicles",
    tags=["Vehicles"],
)


# =========================================================
# GET MY VEHICLES
# =========================================================

@router.get(
    "",
    response_model=list[VehicleResponse],
)
def get_my_vehicles(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return (
        db.query(Vehicle)
        .filter(
            Vehicle.user_id == current_user.id
        )
        .order_by(Vehicle.created_at.desc())
        .all()
    )


# =========================================================
# ADD VEHICLE
# =========================================================

@router.post(
    "",
    response_model=VehicleResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_vehicle(
    data: VehicleCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    existing_vehicle = (
        db.query(Vehicle)
        .filter(
            Vehicle.registration_number
            == data.registration_number.strip()
        )
        .first()
    )

    if existing_vehicle:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="This vehicle registration number is already registered.",
        )

    vehicle = Vehicle(
        user_id=current_user.id,
        registration_number=data.registration_number.strip().upper(),
        brand=data.brand.strip(),
        model=data.model.strip(),
        vehicle_type=data.vehicle_type.strip(),
        battery_capacity=data.battery_capacity,
    )

    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)

    return vehicle


# =========================================================
# GET SINGLE VEHICLE
# =========================================================

@router.get(
    "/{vehicle_id}",
    response_model=VehicleResponse,
)
def get_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    vehicle = (
        db.query(Vehicle)
        .filter(
            Vehicle.id == vehicle_id,
            Vehicle.user_id == current_user.id,
        )
        .first()
    )

    if not vehicle:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vehicle not found.",
        )

    return vehicle


# =========================================================
# UPDATE VEHICLE
# =========================================================

@router.put(
    "/{vehicle_id}",
    response_model=VehicleResponse,
)
def update_vehicle(
    vehicle_id: int,
    data: VehicleUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    vehicle = (
        db.query(Vehicle)
        .filter(
            Vehicle.id == vehicle_id,
            Vehicle.user_id == current_user.id,
        )
        .first()
    )

    if not vehicle:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vehicle not found.",
        )

    if data.registration_number is not None:

        registration_number = (
            data.registration_number.strip().upper()
        )

        existing_vehicle = (
            db.query(Vehicle)
            .filter(
                Vehicle.registration_number
                == registration_number,
                Vehicle.id != vehicle_id,
            )
            .first()
        )

        if existing_vehicle:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="This vehicle registration number is already registered.",
            )

        vehicle.registration_number = registration_number

    if data.brand is not None:
        vehicle.brand = data.brand.strip()

    if data.model is not None:
        vehicle.model = data.model.strip()

    if data.vehicle_type is not None:
        vehicle.vehicle_type = data.vehicle_type.strip()

    if data.battery_capacity is not None:
        vehicle.battery_capacity = data.battery_capacity

    db.commit()
    db.refresh(vehicle)

    return vehicle


# =========================================================
# DELETE VEHICLE
# =========================================================

@router.delete(
    "/{vehicle_id}",
)
def delete_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    vehicle = (
        db.query(Vehicle)
        .filter(
            Vehicle.id == vehicle_id,
            Vehicle.user_id == current_user.id,
        )
        .first()
    )

    if not vehicle:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vehicle not found.",
        )

    db.delete(vehicle)
    db.commit()

    return {
        "message": "Vehicle deleted successfully."
    }