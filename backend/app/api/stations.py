from fastapi import APIRouter, HTTPException, Query

from app.services.open_charge_map import get_nepal_stations


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
            detail=f"Unable to retrieve charging stations: {str(error)}",
        )