from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import (
    Boolean,
    DateTime,
    Float,
    Integer,
    JSON,
    String,
    Text,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


if TYPE_CHECKING:
    from app.models.charger import Charger


class Station(Base):
    __tablename__ = "stations"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    # Open Charge Map identifiers
    external_id: Mapped[int] = mapped_column(
        Integer,
        unique=True,
        nullable=False,
        index=True,
    )

    uuid: Mapped[str | None] = mapped_column(
        String(100),
        unique=True,
        nullable=True,
    )

    # Basic information
    name: Mapped[str] = mapped_column(
        String(200),
        nullable=False,
    )

    operator_name: Mapped[str | None] = mapped_column(
        String(200),
        nullable=True,
    )

    # Address
    address_line1: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    address_line2: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    city: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
        index=True,
    )

    province: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    postcode: Mapped[str | None] = mapped_column(
        String(30),
        nullable=True,
    )

    country: Mapped[str] = mapped_column(
        String(100),
        default="Nepal",
        nullable=False,
    )

    # Location
    latitude: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    longitude: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    # Contact
    contact_telephone: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )

    access_comments: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    general_comments: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    # Charging station information
    usage_type_id: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    usage_cost: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    number_of_points: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    # OCM status information
    status_type_id: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    is_recently_verified: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True,
    )

    date_last_verified: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    date_last_status_update: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    data_quality_level: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    # Keep original external data for future use
    raw_data: Mapped[dict | None] = mapped_column(
        JSON,
        nullable=True,
    )

    # Our application's timestamps
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    # Relationship
    chargers: Mapped[list["Charger"]] = relationship(
        "Charger",
        back_populates="station",
        cascade="all, delete-orphan",
    )