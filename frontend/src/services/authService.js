import api from "./api";


// ========================================
// REGISTER USER
// ========================================

export async function registerUser(userData) {
    try {
        const response = await api.post(
            "/api/auth/register",
            userData
        );

        return response.data;

    } catch (error) {
        const message =
            error.response?.data?.detail ||
            "Registration failed.";

        throw new Error(message);
    }
}


// ========================================
// LOGIN USER
// ========================================

export async function loginUser(credentials) {
    try {
        const response = await api.post(
            "/api/auth/login",
            credentials
        );

        return response.data;

    } catch (error) {
        const message =
            error.response?.data?.detail ||
            "Login failed. Please check your email and password.";

        throw new Error(message);
    }
}