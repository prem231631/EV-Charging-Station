from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class VehicleCreate(BaseModel):
    registration_number: str = Field(
        min_length=2,
        max_length=50,
    )

    brand: str = Field(
        min_length=1,
        max_length=100,
    )

    model: str = Field(
        min_length=1,
        max_length=100,
    )

    vehicle_type: str = Field(
        default="EV",
        max_length=50,
    )

    battery_capacity: float | None = Field(
        default=None,
        gt=0,
    )


class VehicleUpdate(BaseModel):
    registration_number: str | None = Field(
        default=None,
        min_length=2,
        max_length=50,
    )

    brand: str | None = Field(
        default=None,
        min_length=1,
        max_length=100,
    )

    model: str | None = Field(
        default=None,
        min_length=1,
        max_length=100,
    )

    vehicle_type: str | None = Field(
        default=None,
        max_length=50,
    )

    battery_capacity: float | None = Field(
        default=None,
        gt=0,
    )


class VehicleResponse(BaseModel):
    id: int
    user_id: int
    registration_number: str
    brand: str
    model: str
    vehicle_type: str
    battery_capacity: float | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )