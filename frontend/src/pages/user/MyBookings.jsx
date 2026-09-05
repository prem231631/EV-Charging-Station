import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import "../../styles/myBookings.css";


function MyBookings() {

    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =========================================================
    // LOAD BOOKINGS FROM FASTAPI
    // =========================================================

    useEffect(() => {

        async function loadBookings() {

            try {

                setLoading(true);
                setError("");

                const response = await api.get(
                    "/api/bookings/my"
                );

                setBookings(response.data);

            } catch (err) {

                console.error(
                    "Failed to load bookings:",
                    err
                );

                setError(
                    err.response?.data?.detail ||
                    "Failed to load your bookings."
                );

            } finally {

                setLoading(false);

            }
        }

        loadBookings();

    }, []);


    // =========================================================
    // FORMAT DATE
    // =========================================================

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


    // =========================================================
    // FORMAT TIME
    // =========================================================

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


    // =========================================================
    // STATUS CLASS
    // =========================================================

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


    // =========================================================
    // STATUS TEXT
    // =========================================================

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


    // =========================================================
    // LOADING
    // =========================================================

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


    // =========================================================
    // PAGE
    // =========================================================

    return (

        <div className="my-bookings-page">

            <div className="my-bookings-container">


                {/* Back Button */}

                <button
                    className="bookings-back-button"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    ← Dashboard
                </button>


                {/* Header */}

                <header className="my-bookings-header">

                    <span>
                        EV CHARGING NETWORK
                    </span>

                    <h1>
                        My Bookings
                    </h1>

                    <p>
                        View and manage your charging
                        station reservations.
                    </p>

                </header>


                {/* Error */}

                {error && (

                    <div className="booking-error">

                        {error}

                    </div>

                )}


                {/* Empty State */}

                {!error && bookings.length === 0 ? (

                    <div className="bookings-empty">

                        <div className="empty-icon">
                            ⚡
                        </div>

                        <h2>
                            No bookings yet
                        </h2>

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

                    /* =================================================
                       BOOKINGS LIST
                       ================================================= */

                    <div className="bookings-list">

                        {bookings.map((booking) => (

                            <div
                                className="booking-item"
                                key={booking.id}
                            >


                                {/* Booking Top */}

                                <div className="booking-item-top">


                                    {/* Station Information */}

                                    <div className="booking-station-info">

                                        <div className="booking-icon">
                                            ⚡
                                        </div>

                                        <div>

                                            <h2>
                                                Charging Station
                                            </h2>

                                            <p>
                                                📍 Station ID:{" "}
                                                {booking.station_id}
                                            </p>

                                        </div>

                                    </div>


                                    {/* Status */}

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


                                    {/* Date */}

                                    <div className="booking-detail">

                                        <span>
                                            Date
                                        </span>

                                        <strong>
                                            {formatDate(
                                                booking.booking_date
                                            )}
                                        </strong>

                                    </div>


                                    {/* Time */}

                                    <div className="booking-detail">

                                        <span>
                                            Time
                                        </span>

                                        <strong>
                                            {formatTime(
                                                booking.booking_date
                                            )}
                                        </strong>

                                    </div>


                                    {/* Duration */}

                                    <div className="booking-detail">

                                        <span>
                                            Duration
                                        </span>

                                        <strong>
                                            {booking.duration_minutes
                                                ? `${booking.duration_minutes} minutes`
                                                : "30 minutes"}
                                        </strong>

                                    </div>


                                </div>


                                {/* Notes */}

                                {booking.notes && (

                                    <div className="booking-notes">

                                        <span>
                                            Additional Notes
                                        </span>

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