import api from "./api";

export async function getAdminStats() {
    try {
        const response = await api.get("/api/admin/stats");
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.detail ||
            "Failed to load dashboard statistics."
        );
    }
}

export async function getAdminUsers() {
    try {
        const response = await api.get("/api/admin/users");
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.detail ||
            "Failed to load users."
        );
    }
}

export async function updateUserStatus(userId) {
    try {
        const response = await api.patch(
            `/api/admin/users/${userId}/status`
        );

        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.detail ||
            "Failed to update user status."
        );
    }
}

export async function getAdminStations() {
    try {
        const response = await api.get("/api/admin/stations");
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.detail ||
            "Failed to load stations."
        );
    }
}

export async function getAdminBookings() {
    try {
        const response = await api.get("/api/admin/bookings");
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.detail ||
            "Failed to load bookings."
        );
    }
}