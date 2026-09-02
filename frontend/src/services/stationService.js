const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";


export async function getStations() {
    const response = await fetch(
        `${API_BASE_URL}/api/stations`
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch stations: ${response.status}`
        );
    }

    return response.json();
}