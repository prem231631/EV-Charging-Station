from datetime import timedelta, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Booking, Station
from app.schemas.booking import (
    BookingCreate,
    BookingResponse,
)
from app.api.auth import get_current_user


router = APIRouter(
    prefix="/api/bookings",
    tags=["Bookings"],
)


@router.post(
    "",
    response_model=BookingResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_booking(
    data: BookingCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    # Check whether station exists
    station = (
        db.query(Station)
        .filter(Station.id == data.station_id)
        .first()
    )

    if not station:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Charging station not found.",
        )

    

    # Calculate booking start time
    booking_start = data.booking_date

# Make the datetime timezone-aware
    if booking_start.tzinfo is None:
        booking_start = booking_start.replace(tzinfo=timezone.utc)

    # Check for overlapping active bookings
    existing_bookings = (
        db.query(Booking)
        .filter(
            Booking.station_id == data.station_id,
            Booking.status == "confirmed",
        )
        .all()
    )

    for existing in existing_bookings:

        existing_start = existing.booking_date

        if existing_start.tzinfo is None:
            existing_start = existing_start.replace(tzinfo=timezone.utc)

        existing_end =(
            existing_start + timedelta(
                minutes=existing.duration_minutes
            )
        )

        # Check overlap
        if (
            booking_start < existing_end
            and booking_end > existing_start
        ):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=(
                    "This station is already booked "
                    "during the selected time."
                ),
            )

    # Create booking
    booking = Booking(
        user_id=current_user.id,
        station_id=data.station_id,
        booking_date=data.booking_date,
        duration_minutes=data.duration_minutes,
        status="confirmed",
        notes=data.notes,
    )

    db.add(booking)
    db.commit()
    db.refresh(booking)

    return booking


@router.get(
    "/my",
    response_model=list[BookingResponse],
)
def get_my_bookings(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    bookings = (
        db.query(Booking)
        .filter(
            Booking.user_id == current_user.id
        )
        .order_by(
            Booking.booking_date.desc()
        )
        .all()
    )

    return bookings


@router.get(
    "/{booking_id}",
    response_model=BookingResponse,
)
def get_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    booking = (
        db.query(Booking)
        .filter(
            Booking.id == booking_id,
            Booking.user_id == current_user.id,
        )
        .first()
    )

    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found.",
        )

    return booking


@router.delete(
    "/{booking_id}",
)
def cancel_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    booking = (
        db.query(Booking)
        .filter(
            Booking.id == booking_id,
            Booking.user_id == current_user.id,
        )
        .first()
    )

    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found.",
        )

    if booking.status == "cancelled":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Booking is already cancelled.",
        )

    booking.status = "cancelled"

    db.commit()

    return {
        "message": "Booking cancelled successfully."
    }