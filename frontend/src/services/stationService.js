import api from "./api";


export async function getStations() {

    try {

        const response = await api.get(
            "/api/stations"
        );

        return response.data;

    } catch (error) {

        const message =
            error.response?.data?.detail ||
            "Unable to load charging stations.";

        throw new Error(message);
    }
}