from datetime import datetime

from sqlalchemy.orm import Session

from app.models import Station, Charger
from app.services.open_charge_map import get_nepal_stations


def parse_datetime(value: str | None) -> datetime | None:
    if not value:
        return None

    return datetime.fromisoformat(
        value.replace("Z", "+00:00")
    )


def sync_nepal_stations(
    db: Session,
    max_results: int = 100,
) -> dict:

    external_stations = get_nepal_stations_sync(
        max_results=max_results
    )

    stations_created = 0
    stations_updated = 0
    chargers_created = 0
    chargers_updated = 0

    for data in external_stations:

        external_id = data.get("ID")

        if not external_id:
            continue

        address = data.get("AddressInfo") or {}

        station = (
            db.query(Station)
            .filter(
                Station.external_id == external_id
            )
            .first()
        )

        if station is None:

            station = Station(
                external_id=external_id,
            )

            db.add(station)

            stations_created += 1

        else:
            stations_updated += 1

        # --------------------------------------------------
        # Basic station information
        # --------------------------------------------------

        station.uuid = data.get("UUID")

        station.name = (
            address.get("Title")
            or "Unnamed Charging Station"
        )

        station.address_line1 = address.get(
            "AddressLine1"
        )

        station.address_line2 = address.get(
            "AddressLine2"
        )

        station.city = address.get("Town")

        station.province = address.get(
            "StateOrProvince"
        )

        station.postcode = address.get(
            "Postcode"
        )

        station.country = "Nepal"

        station.latitude = address.get(
            "Latitude"
        )

        station.longitude = address.get(
            "Longitude"
        )

        station.contact_telephone = address.get(
            "ContactTelephone1"
        )

        station.access_comments = address.get(
            "AccessComments"
        )

        station.general_comments = data.get(
            "GeneralComments"
        )

        # --------------------------------------------------
        # Usage information
        # --------------------------------------------------

        station.usage_type_id = data.get(
            "UsageTypeID"
        )

        station.usage_cost = data.get(
            "UsageCost"
        )

        station.number_of_points = data.get(
            "NumberOfPoints"
        )

        # --------------------------------------------------
        # Status information
        # --------------------------------------------------

        station.status_type_id = data.get(
            "StatusTypeID"
        )

        station.is_recently_verified = data.get(
            "IsRecentlyVerified"
        )

        station.date_last_verified = parse_datetime(
            data.get("DateLastVerified")
        )

        station.date_last_status_update = parse_datetime(
            data.get("DateLastStatusUpdate")
        )

        station.data_quality_level = data.get(
            "DataQualityLevel"
        )

        # --------------------------------------------------
        # Preserve original API response
        # --------------------------------------------------

        station.raw_data = data

        db.flush()

        # --------------------------------------------------
        # Chargers
        # --------------------------------------------------

        connections = data.get("Connections") or []

        for connection in connections:

            connection_id = connection.get("ID")

            if not connection_id:
                continue

            charger = (
                db.query(Charger)
                .filter(
                    Charger.external_id
                    == connection_id
                )
                .first()
            )

            if charger is None:

                charger = Charger(
                    station_id=station.id,
                    external_id=connection_id,
                )

                db.add(charger)

                chargers_created += 1

            else:
                chargers_updated += 1

            charger.station_id = station.id

            charger.connection_type_id = connection.get(
                "ConnectionTypeID"
            )

            charger.status_type_id = connection.get(
                "StatusTypeID"
            )

            charger.level_id = connection.get(
                "LevelID"
            )

            charger.current_type_id = connection.get(
                "CurrentTypeID"
            )

            charger.amps = connection.get(
                "Amps"
            )

            charger.voltage = connection.get(
                "Voltage"
            )

            charger.power_kw = connection.get(
                "PowerKW"
            )

            charger.quantity = connection.get(
                "Quantity"
            )

            charger.comments = connection.get(
                "Comments"
            )

    db.commit()

    return {
        "stations_created": stations_created,
        "stations_updated": stations_updated,
        "chargers_created": chargers_created,
        "chargers_updated": chargers_updated,
        "total_external_stations": len(
            external_stations
        ),
    }


def get_nepal_stations_sync(
    max_results: int = 100,
) -> list[dict]:

    import httpx

    from app.core.config import settings

    url = (
        "https://api.openchargemap.io/v3/poi/"
    )

    params = {
        "output": "json",
        "countrycode": "NP",
        "maxresults": max_results,
        "compact": "true",
        "verbose": "false",
        "key": settings.open_charge_map_api_key,
    }

    response = httpx.get(
        url,
        params=params,
        timeout=30,
    )

    response.raise_for_status()

    return response.json()