import api from "./api";


export async function getVehicles() {
    try {
        const response = await api.get(
            "/api/vehicles"
        );

        return response.data;

    } catch (error) {

        const message =
            error.response?.data?.detail ||
            "Failed to load vehicles.";

        throw new Error(message);
    }
}


export async function createVehicle(vehicleData) {
    try {
        const response = await api.post(
            "/api/vehicles",
            vehicleData
        );

        return response.data;

    } catch (error) {

        const message =
            error.response?.data?.detail ||
            "Failed to add vehicle.";

        throw new Error(message);
    }
}


export async function updateVehicle(
    vehicleId,
    vehicleData
) {
    try {
        const response = await api.put(
            `/api/vehicles/${vehicleId}`,
            vehicleData
        );

        return response.data;

    } catch (error) {

        const message =
            error.response?.data?.detail ||
            "Failed to update vehicle.";

        throw new Error(message);
    }
}


export async function deleteVehicle(vehicleId) {
    try {
        const response = await api.delete(
            `/api/vehicles/${vehicleId}`
        );

        return response.data;

    } catch (error) {

        const message =
            error.response?.data?.detail ||
            "Failed to delete vehicle.";

        throw new Error(message);
    }
}