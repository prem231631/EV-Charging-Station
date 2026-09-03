import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/myBookings.css";

function MyBookings() {
    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        /*
         * Temporary booking data.
         * Later we will replace this with your FastAPI
         * /api/bookings endpoint.
         */
        const savedBookings = JSON.parse(
            localStorage.getItem("bookings") || "[]"
        );

        setBookings(savedBookings);
        setLoading(false);
    }, []);

    function formatDate(dateString) {
        if (!dateString) {
            return "Not specified";
        }

        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return dateString;
        }

        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

    function formatTime(dateString) {
        if (!dateString) {
            return "Not specified";
        }

        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return dateString;
        }

        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        });
    }

    function getStatusClass(status) {
        const normalizedStatus =
            String(status || "confirmed").toLowerCase();

        if (normalizedStatus === "cancelled") {
            return "status-cancelled";
        }

        if (normalizedStatus === "completed") {
            return "status-completed";
        }

        return "status-confirmed";
    }

    function getStatusText(status) {
        const normalizedStatus =
            String(status || "confirmed").toLowerCase();

        if (normalizedStatus === "cancelled") {
            return "Cancelled";
        }

        if (normalizedStatus === "completed") {
            return "Completed";
        }

        return "Confirmed";
    }

    if (loading) {
        return (
            <div className="my-bookings-page">
                <div className="my-bookings-container">
                    <div className="bookings-loading">
                        Loading your bookings...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="my-bookings-page">
            <div className="my-bookings-container">

                {/* Back Button */}
                <button
                    className="bookings-back-button"
                    onClick={() => navigate("/dashboard")}
                >
                    ← Dashboard
                </button>

                {/* Header */}
                <header className="my-bookings-header">
                    <span>EV CHARGING NETWORK</span>

                    <h1>My Bookings</h1>

                    <p>
                        View and manage your charging station
                        reservations.
                    </p>
                </header>

                {/* Empty State */}
                {bookings.length === 0 ? (
                    <div className="bookings-empty">

                        <div className="empty-icon">
                            ⚡
                        </div>

                        <h2>No bookings yet</h2>

                        <p>
                            You haven't made any charging
                            reservations yet.
                        </p>

                        <button
                            className="explore-stations-button"
                            onClick={() =>
                                navigate("/stations")
                            }
                        >
                            Explore Stations →
                        </button>

                    </div>
                ) : (
                    <div className="bookings-list">

                        {bookings.map((booking, index) => (
                            <div
                                className="booking-item"
                                key={
                                    booking.id ||
                                    booking.booking_id ||
                                    index
                                }
                            >

                                {/* Booking Top */}
                                <div className="booking-item-top">

                                    <div className="booking-station-info">

                                        <div className="booking-icon">
                                            ⚡
                                        </div>

                                        <div>
                                            <h2>
                                                {booking.station_name ||
                                                    booking.stationName ||
                                                    "Charging Station"}
                                            </h2>

                                            <p>
                                                📍{" "}
                                                {booking.location ||
                                                    booking.station_location ||
                                                    "Nepal"}
                                            </p>
                                        </div>

                                    </div>

                                    <span
                                        className={`booking-status ${getStatusClass(
                                            booking.status
                                        )}`}
                                    >
                                        {getStatusText(
                                            booking.status
                                        )}
                                    </span>

                                </div>

                                {/* Booking Details */}
                                <div className="booking-details">

                                    <div className="booking-detail">
                                        <span>Date</span>

                                        <strong>
                                            {formatDate(
                                                booking.date ||
                                                    booking.start_time ||
                                                    booking.startTime
                                            )}
                                        </strong>
                                    </div>

                                    <div className="booking-detail">
                                        <span>Time</span>

                                        <strong>
                                            {formatTime(
                                                booking.start_time ||
                                                    booking.startTime ||
                                                    booking.date
                                            )}
                                        </strong>
                                    </div>

                                    <div className="booking-detail">
                                        <span>Duration</span>

                                        <strong>
                                            {booking.duration ||
                                                booking.duration_minutes
                                                    ? `${booking.duration ||
                                                          booking.duration_minutes} minutes`
                                                    : "30 minutes"}
                                        </strong>
                                    </div>

                                </div>

                                {/* Notes */}
                                {booking.notes && (
                                    <div className="booking-notes">
                                        <span>Additional Notes</span>

                                        <p>
                                            {booking.notes}
                                        </p>
                                    </div>
                                )}

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
}

export default MyBookings;