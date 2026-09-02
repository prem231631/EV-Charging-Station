from pydantic import BaseModel, ConfigDict


class ChargerResponse(BaseModel):
    id: int
    external_id: int

    connection_type_id: int | None = None
    status_type_id: int | None = None
    level_id: int | None = None
    current_type_id: int | None = None

    amps: float | None = None
    voltage: float | None = None
    power_kw: float | None = None
    quantity: int | None = None

    comments: str | None = None

    model_config = ConfigDict(
        from_attributes=True
    )


class StationResponse(BaseModel):
    id: int
    external_id: int
    uuid: str | None = None

    name: str
    operator_name: str | None = None

    address_line1: str | None = None
    address_line2: str | None = None

    city: str | None = None
    province: str | None = None
    postcode: str | None = None
    country: str

    latitude: float
    longitude: float

    contact_telephone: str | None = None

    access_comments: str | None = None
    general_comments: str | None = None

    usage_type_id: int | None = None
    usage_cost: str | None = None

    number_of_points: int | None = None

    status_type_id: int | None = None

    is_recently_verified: bool | None = None

    chargers: list[ChargerResponse] = []

    model_config = ConfigDict(
        from_attributes=True
    )