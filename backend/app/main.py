from fastapi import FastAPI

app = FastAPI(
    title="EV Charging Station API",
    description="Backend API for the EV Charging Station Platform",
    version="1.0.0",
)


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