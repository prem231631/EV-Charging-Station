import api from "./api";


// ========================================
// REGISTER
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
// LOGIN
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


// ========================================
// CURRENT USER
// ========================================

export async function getCurrentUser() {
    try {
        const response = await api.get(
            "/api/auth/me"
        );

        return response.data;

    } catch (error) {
        const message =
            error.response?.data?.detail ||
            "Unable to get current user.";

        throw new Error(message);
    }
}