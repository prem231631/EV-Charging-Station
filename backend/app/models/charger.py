from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import (
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


if TYPE_CHECKING:
    from app.models.station import Station


class Charger(Base):
    __tablename__ = "chargers"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    station_id: Mapped[int] = mapped_column(
        ForeignKey("stations.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # Open Charge Map connection identifier
    external_id: Mapped[int] = mapped_column(
        Integer,
        unique=True,
        nullable=False,
        index=True,
    )

    # Connector information
    connection_type_id: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    status_type_id: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    level_id: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    current_type_id: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    # Electrical information
    amps: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    voltage: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    power_kw: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    quantity: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    comments: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

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
    station: Mapped["Station"] = relationship(
        "Station",
        back_populates="chargers",
    )