from fastapi import FastAPI
from sqlalchemy import text

from app.database import Base, engine
from app.models import User, Vehicle

from app.api.stations import router as stations_router

app = FastAPI(
    title="EV Charging Station API",
    description="Backend API for the EV Charging Station Platform",
    version="1.0.0",
)

app.include_router(stations_router)


@app.on_event("startup")
def create_tables():
    Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {
        "message": "EV Charging Station API is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


@app.get("/health/database")
def database_health_check():

    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "healthy",
            "database": "connected",
        }

    except Exception as error:

        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(error),
        }