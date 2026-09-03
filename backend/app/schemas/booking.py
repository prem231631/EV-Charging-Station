from datetime import datetime

from pydantic import BaseModel, Field


class BookingCreate(BaseModel):
    station_id: int
    booking_date: datetime
    duration_minutes: int = Field(
        default=30,
        ge=15,
        le=240,
    )
    notes: str | None = None


class BookingResponse(BaseModel):
    id: int
    user_id: int
    station_id: int
    booking_date: datetime
    duration_minutes: int
    status: str
    notes: str | None = None
    created_at: datetime

    class Config:
        from_attributes = True