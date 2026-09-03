import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import api from "../../services/api";

import "../../styles/booking.css";


function Booking() {

    const navigate = useNavigate();
    const location = useLocation();

    const station = location.state?.station;

    const [bookingDate, setBookingDate] = useState("");
    const [duration, setDuration] = useState("30");
    const [notes, setNotes] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    if (!station) {
        return (
            <div className="booking-page">

                <div className="booking-empty">

                    <h2>Station Not Found</h2>

                    <p>
                        Please select a charging station
                        before making a booking.
                    </p>

                    <button
                        onClick={() => navigate("/stations")}
                    >
                        Back to Stations
                    </button>

                </div>

            </div>
        );
    }


    async function handleSubmit(event) {

        event.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {

            const response = await api.post(
                "/api/bookings",
                {
                    station_id: station.id,
                    booking_date: bookingDate,
                    duration_minutes: Number(duration),
                    notes: notes || null,
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );


            setSuccess(
                "Booking confirmed successfully!"
            );


            setTimeout(() => {

                navigate("/dashboard");

            }, 1500);


        } catch (err) {

            setError(
                err.response?.data?.detail ||
                "Unable to create booking."
            );

        } finally {

            setLoading(false);

        }
    }


    return (

        <div className="booking-page">

            <div className="booking-container">


                <button
                    className="booking-back"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>


                <div className="booking-header">

                    <span>
                        EV CHARGING NETWORK
                    </span>

                    <h1>
                        Reserve a Charging Slot
                    </h1>

                    <p>
                        Choose your preferred charging
                        time and duration.
                    </p>

                </div>


                <div className="booking-layout">


                    {/* Station Information */}

                    <div className="booking-station-card">

                        <div className="booking-icon">
                            ⚡
                        </div>

                        <div>

                            <h2>
                                {station.name}
                            </h2>

                            <p>
                                📍{" "}
                                {station.city ||
                                    "Nepal"}
                                {station.province
                                    ? `, ${station.province}`
                                    : ""}
                            </p>

                        </div>


                        <div className="station-summary">

                            <div>

                                <span>
                                    Chargers
                                </span>

                                <strong>
                                    {station.chargers?.length || 0}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Points
                                </span>

                                <strong>
                                    {station.number_of_points ??
                                        "N/A"}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Power
                                </span>

                                <strong>

                                    {station.chargers?.[0]?.power_kw
                                        ? `${station.chargers[0].power_kw} kW`
                                        : "N/A"}

                                </strong>

                            </div>

                        </div>

                    </div>


                    {/* Booking Form */}

                    <div className="booking-form-card">

                        <h2>
                            Booking Details
                        </h2>


                        {error && (

                            <div className="booking-error">
                                {error}
                            </div>

                        )}


                        {success && (

                            <div className="booking-success">
                                {success}
                            </div>

                        )}


                        <form onSubmit={handleSubmit}>


                            <div className="booking-form-group">

                                <label htmlFor="bookingDate">
                                    Date & Time
                                </label>

                                <input
                                    id="bookingDate"
                                    type="datetime-local"
                                    value={bookingDate}
                                    onChange={(event) =>
                                        setBookingDate(
                                            event.target.value
                                        )
                                    }
                                    required
                                />

                            </div>


                            <div className="booking-form-group">

                                <label htmlFor="duration">
                                    Charging Duration
                                </label>

                                <select
                                    id="duration"
                                    value={duration}
                                    onChange={(event) =>
                                        setDuration(
                                            event.target.value
                                        )
                                    }
                                >

                                    <option value="30">
                                        30 minutes
                                    </option>

                                    <option value="60">
                                        1 hour
                                    </option>

                                    <option value="90">
                                        1 hour 30 minutes
                                    </option>

                                    <option value="120">
                                        2 hours
                                    </option>

                                    <option value="180">
                                        3 hours
                                    </option>

                                </select>

                            </div>


                            <div className="booking-form-group">

                                <label htmlFor="notes">
                                    Additional Notes
                                </label>

                                <textarea
                                    id="notes"
                                    value={notes}
                                    onChange={(event) =>
                                        setNotes(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Any additional information..."
                                    rows="4"
                                />

                            </div>


                            <button
                                className="confirm-booking-button"
                                type="submit"
                                disabled={loading}
                            >

                                {loading
                                    ? "Confirming..."
                                    : "Confirm Booking →"}

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}


export default Booking;