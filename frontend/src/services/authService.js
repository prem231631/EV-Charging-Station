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