import api from "./api";


// Get logged-in user's bookings
export async function getMyBookings() {
    try {
        const response = await api.get(
            "/api/bookings/my"
        );

        return response.data;

    } catch (error) {

        const message =
            error.response?.data?.detail ||
            "Failed to load bookings.";

        throw new Error(message);
    }
}


// Create booking
export async function createBooking(bookingData) {
    try {
        const response = await api.post(
            "/api/bookings",
            bookingData
        );

        return response.data;

    } catch (error) {

        const message =
            error.response?.data?.detail ||
            "Failed to create booking.";

        throw new Error(message);
    }
}


// Cancel booking
export async function cancelBooking(bookingId) {
    try {
        const response = await api.delete(
            `/api/bookings/${bookingId}`
        );

        return response.data;

    } catch (error) {

        const message =
            error.response?.data?.detail ||
            "Failed to cancel booking.";

        throw new Error(message);
    }
}