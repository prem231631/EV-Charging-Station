import api from "./api";


const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";


export async function registerUser(userData) {
    const response = await fetch(
        `${API_BASE_URL}/api/auth/register`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(userData),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Registration failed."
        );
    }

    return data;
}


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


/* ==========================================
   GET CURRENT LOGGED-IN USER
========================================== */

export async function getCurrentUser() {

    const token = localStorage.getItem("access_token");

    if (!token) {
        throw new Error("Not authenticated.");
    }

    try {

        const response = await api.get(
            "/api/auth/me",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;

    } catch (error) {

        const message =
            error.response?.data?.detail ||
            "Unable to load user information.";

        throw new Error(message);
    }
}