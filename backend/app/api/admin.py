from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User, Station, Booking
from app.api.auth import get_current_admin


router = APIRouter(
    prefix="/api/admin",
    tags=["Admin"],
)


# =========================================================
# DASHBOARD STATISTICS
# =========================================================

@router.get("/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_admin=Depends(get_current_admin),
):
    total_users = db.query(User).count()

    active_users = (
        db.query(User)
        .filter(User.is_active == True)
        .count()
    )

    total_stations = db.query(Station).count()

    total_bookings = db.query(Booking).count()

    confirmed_bookings = (
        db.query(Booking)
        .filter(Booking.status == "confirmed")
        .count()
    )

    cancelled_bookings = (
        db.query(Booking)
        .filter(Booking.status == "cancelled")
        .count()
    )

    return {
        "total_users": total_users,
        "active_users": active_users,
        "total_stations": total_stations,
        "total_bookings": total_bookings,
        "confirmed_bookings": confirmed_bookings,
        "cancelled_bookings": cancelled_bookings,
    }


# =========================================================
# USERS
# =========================================================

@router.get("/users")
def get_all_users(
    db: Session = Depends(get_db),
    current_admin=Depends(get_current_admin),
):
    users = (
        db.query(User)
        .order_by(User.created_at.desc())
        .all()
    )

    return [
        {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "phone": user.phone,
            "role": user.role,
            "is_active": user.is_active,
            "created_at": user.created_at,
        }
        for user in users
    ]


# =========================================================
# ACTIVATE / DEACTIVATE USER
# =========================================================

@router.patch("/users/{user_id}/status")
def update_user_status(
    user_id: int,
    db: Session = Depends(get_db),
    current_admin=Depends(get_current_admin),
):
    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found.",
        )

    if user.id == current_admin.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You cannot change your own account status.",
        )

    user.is_active = not user.is_active

    db.commit()
    db.refresh(user)

    return {
        "message": (
            "User activated successfully."
            if user.is_active
            else "User deactivated successfully."
        ),
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "is_active": user.is_active,
        },
    }


# =========================================================
# STATIONS
# =========================================================

@router.get("/stations")
def get_all_stations(
    db: Session = Depends(get_db),
    current_admin=Depends(get_current_admin),
):
    stations = (
        db.query(Station)
        .order_by(Station.name)
        .all()
    )

    return [
        {
            "id": station.id,
            "external_id": station.external_id,
            "name": station.name,
            "operator_name": station.operator_name,
            "city": station.city,
            "province": station.province,
            "country": station.country,
            "latitude": station.latitude,
            "longitude": station.longitude,
            "number_of_points": station.number_of_points,
            "usage_cost": station.usage_cost,
            "is_recently_verified": station.is_recently_verified,
        }
        for station in stations
    ]


# =========================================================
# BOOKINGS
# =========================================================

@router.get("/bookings")
def get_all_bookings(
    db: Session = Depends(get_db),
    current_admin=Depends(get_current_admin),
):
    bookings = (
        db.query(Booking)
        .order_by(Booking.booking_date.desc())
        .all()
    )

    results = []

    for booking in bookings:
        user = (
            db.query(User)
            .filter(User.id == booking.user_id)
            .first()
        )

        station = (
            db.query(Station)
            .filter(Station.id == booking.station_id)
            .first()
        )

        results.append(
            {
                "id": booking.id,
                "user_id": booking.user_id,
                "user_name": user.full_name if user else "Unknown User",
                "user_email": user.email if user else None,
                "station_id": booking.station_id,
                "station_name": (
                    station.name
                    if station
                    else "Unknown Station"
                ),
                "city": station.city if station else None,
                "booking_date": booking.booking_date,
                "duration_minutes": booking.duration_minutes,
                "status": booking.status,
                "notes": booking.notes,
                "created_at": booking.created_at,
            }
        )

    return results