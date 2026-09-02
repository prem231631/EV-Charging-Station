from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload

from app.database import get_db
from app.services.open_charge_map import get_nepal_stations
from app.services.station_sync import sync_nepal_stations

from app.models import Station
from app.schemas.station import StationResponse

router = APIRouter(
    prefix="/api/stations",
    tags=["Stations"],
)


@router.get("/real")
async def get_real_stations(
    limit: int = Query(
        default=20,
        ge=1,
        le=100,
    ),
):
    try:
        stations = await get_nepal_stations(
            max_results=limit
        )

        return {
            "count": len(stations),
            "source": "Open Charge Map",
            "country": "Nepal",
            "stations": stations,
        }

    except Exception as error:
        raise HTTPException(
            status_code=502,
            detail=(
                "Unable to retrieve charging stations: "
                f"{str(error)}"
            ),
        )


@router.post("/sync")
def synchronize_stations(
    limit: int = Query(
        default=100,
        ge=1,
        le=100,
    ),
    db: Session = Depends(get_db),
):
    try:

        result = sync_nepal_stations(
            db=db,
            max_results=limit,
        )

        return {
            "message": (
                "Charging stations synchronized successfully"
            ),
            **result,
        }

    except Exception as error:

        db.rollback()

        raise HTTPException(
            status_code=502,
            detail=(
                "Unable to synchronize charging stations: "
                f"{str(error)}"
            ),
        )


@router.get(
    "",
    response_model=list[StationResponse],
)
def get_stations(
    db: Session = Depends(get_db),
):
    stations = (
        db.query(Station)
        .options(
            joinedload(Station.chargers)
        )
        .order_by(Station.name)
        .all()
    )

    return stations