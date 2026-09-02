import httpx

from app.core.config import settings


OCM_API_URL = "https://api.openchargemap.io/v3/poi/"


async def get_nepal_stations(
    max_results: int = 100,
) -> list[dict]:

    params = {
        "output": "json",
        "countrycode": "NP",
        "maxresults": max_results,
        "compact": "true",
        "verbose": "false",
        "key": settings.open_charge_map_api_key,
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.get(
            OCM_API_URL,
            params=params,
        )

        response.raise_for_status()

        return response.json()