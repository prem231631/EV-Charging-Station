from datetime import timedelta, timezone

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


def update_completed_bookings(db: Session):
    """
    Automatically mark confirmed bookings as completed
    when their booking time has finished.
    """

    now = datetime_now_utc()

    bookings = (
        db.query(Booking)
        .filter(Booking.status == "confirmed")
        .all()
    )

    changed = False

    for booking in bookings:

        booking_start = booking.booking_date

        if booking_start.tzinfo is None:
            booking_start = booking_start.replace(tzinfo=timezone.utc)

        booking_end = booking_start + timedelta(
            minutes=booking.duration_minutes
        )

        if now >= booking_end:
            booking.status = "completed"
            changed = True

    if changed:
        db.commit()


def datetime_now_utc():
    """
    Return current UTC datetime.
    """
    from datetime import datetime

    return datetime.now(timezone.utc)


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

    # First update any bookings that have already finished.
    update_completed_bookings(db)

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

    if booking_start.tzinfo is None:
        booking_start = booking_start.replace(
            tzinfo=timezone.utc
        )

    # Calculate booking end time
    booking_end = booking_start + timedelta(
        minutes=data.duration_minutes
    )

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
            existing_start = existing_start.replace(
                tzinfo=timezone.utc
            )

        existing_end = existing_start + timedelta(
            minutes=existing.duration_minutes
        )

        # Check whether the two bookings overlap
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

    # Automatically complete finished bookings
    update_completed_bookings(db)

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

    # Automatically complete finished bookings
    update_completed_bookings(db)

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

    # Update completed bookings first
    update_completed_bookings(db)

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

    # Already cancelled
    if booking.status == "cancelled":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Booking is already cancelled.",
        )

    # Already completed
    if booking.status == "completed":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Completed bookings cannot be cancelled.",
        )

    # Check whether booking has already started
    booking_start = booking.booking_date

    if booking_start.tzinfo is None:
        booking_start = booking_start.replace(
            tzinfo=timezone.utc
        )

    now = datetime_now_utc()

    if now >= booking_start:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bookings cannot be cancelled after they have started.",
        )

    # Cancel booking
    booking.status = "cancelled"

    db.commit()
    db.refresh(booking)

    return {
        "message": "Booking cancelled successfully.",
        "booking_id": booking.id,
        "status": booking.status,
    }