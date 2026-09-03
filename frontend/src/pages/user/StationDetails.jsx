import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "../../styles/stationDetails.css";

function StationDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [station, setStation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchStation() {
            try {
                setLoading(true);
                setError("");

                const response = await api.get("/api/stations");

                const foundStation = response.data.find(
                    (item) => String(item.id) === String(id)
                );

                if (!foundStation) {
                    setError("Charging station not found.");
                    return;
                }

                setStation(foundStation);
            } catch (err) {
                console.error(err);

                setError(
                    err.response?.data?.detail ||
                    "Unable to load station details."
                );
            } finally {
                setLoading(false);
            }
        }

        fetchStation();
    }, [id]);

    if (loading) {
        return (
            <div className="station-details-page">
                <div className="station-details-loading">
                    Loading station details...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="station-details-page">
                <div className="station-details-error">
                    <h2>Something went wrong</h2>
                    <p>{error}</p>

                    <button
                        onClick={() => navigate("/dashboard")}
                    >
                        ← Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const chargers = station.chargers || [];

    const totalChargers = chargers.reduce(
        (total, charger) =>
            total + (charger.quantity || 1),
        0
    );

    const powerValues = chargers
        .map((charger) => charger.power_kw)
        .filter((power) => power !== null && power !== undefined);

    const maximumPower =
        powerValues.length > 0
            ? Math.max(...powerValues)
            : null;

    return (
        <div className="station-details-page">

            <div className="station-details-container">

                {/* Back Button */}
                <button
                    className="back-button"
                    onClick={() => navigate("/dashboard")}
                >
                    ← Dashboard
                </button>

                {/* Header */}
                <div className="station-details-header">

                    <div>
                        <span className="station-details-label">
                            EV CHARGING STATION
                        </span>

                        <h1>{station.name}</h1>

                        <p className="station-location">
                            📍{" "}
                            {station.city || "Unknown City"}
                            {station.province
                                ? `, ${station.province}`
                                : ""}
                            {station.country
                                ? `, ${station.country}`
                                : ""}
                        </p>
                    </div>

                    <div
                        className={`station-status-large ${
                            totalChargers > 0
                                ? "available"
                                : "unavailable"
                        }`}
                    >
                        {totalChargers > 0
                            ? "Available"
                            : "No Charger"}
                    </div>

                </div>

                {/* Main Content */}
                <div className="station-details-grid">

                    {/* Left Column */}
                    <div className="station-main-column">

                        {/* Overview */}
                        <div className="details-card">

                            <h2>Station Overview</h2>

                            <div className="overview-grid">

                                <div className="overview-item">
                                    <span>Charging Points</span>
                                    <strong>
                                        {station.number_of_points ?? "N/A"}
                                    </strong>
                                </div>

                                <div className="overview-item">
                                    <span>Chargers</span>
                                    <strong>
                                        {totalChargers || 0}
                                    </strong>
                                </div>

                                <div className="overview-item">
                                    <span>Maximum Power</span>
                                    <strong>
                                        {maximumPower
                                            ? `${maximumPower} kW`
                                            : "N/A"}
                                    </strong>
                                </div>

                                <div className="overview-item">
                                    <span>Operator</span>
                                    <strong>
                                        {station.operator_name || "N/A"}
                                    </strong>
                                </div>

                            </div>

                        </div>

                        {/* Address */}
                        <div className="details-card">

                            <h2>Location & Contact</h2>

                            <div className="info-list">

                                <div className="info-row">
                                    <span className="info-icon">
                                        📍
                                    </span>

                                    <div>
                                        <span className="info-title">
                                            Address
                                        </span>

                                        <p>
                                            {station.address_line1 ||
                                                "Address not available"}
                                        </p>

                                        {station.address_line2 && (
                                            <p>
                                                {station.address_line2}
                                            </p>
                                        )}

                                        <p>
                                            {station.city || ""}
                                            {station.province
                                                ? `, ${station.province}`
                                                : ""}
                                            {station.postcode
                                                ? ` ${station.postcode}`
                                                : ""}
                                        </p>
                                    </div>
                                </div>

                                {station.contact_telephone && (
                                    <div className="info-row">
                                        <span className="info-icon">
                                            📞
                                        </span>

                                        <div>
                                            <span className="info-title">
                                                Contact
                                            </span>

                                            <p>
                                                {station.contact_telephone}
                                            </p>
                                        </div>
                                    </div>
                                )}

                            </div>

                        </div>

                        {/* Chargers */}
                        <div className="details-card">

                            <div className="card-heading">
                                <div>
                                    <h2>Charging Information</h2>
                                    <p>
                                        Available chargers at this station
                                    </p>
                                </div>

                                <span className="charger-count">
                                    {chargers.length}{" "}
                                    {chargers.length === 1
                                        ? "Type"
                                        : "Types"}
                                </span>
                            </div>

                            {chargers.length === 0 ? (

                                <div className="no-chargers">
                                    <div className="no-chargers-icon">
                                        ⚡
                                    </div>

                                    <h3>
                                        No charger information available
                                    </h3>

                                    <p>
                                        Charger details are not currently
                                        available for this station.
                                    </p>
                                </div>

                            ) : (

                                <div className="charger-list">

                                    {chargers.map((charger) => (
                                        <div
                                            className="charger-item"
                                            key={charger.id}
                                        >

                                            <div className="charger-icon">
                                                ⚡
                                            </div>

                                            <div className="charger-info">

                                                <h3>
                                                    Charger #{charger.id}
                                                </h3>

                                                <div className="charger-details">

                                                    <span>
                                                        Power:{" "}
                                                        <strong>
                                                            {charger.power_kw
                                                                ? `${charger.power_kw} kW`
                                                                : "N/A"}
                                                        </strong>
                                                    </span>

                                                    <span>
                                                        Voltage:{" "}
                                                        <strong>
                                                            {charger.voltage
                                                                ? `${charger.voltage} V`
                                                                : "N/A"}
                                                        </strong>
                                                    </span>

                                                    <span>
                                                        Amps:{" "}
                                                        <strong>
                                                            {charger.amps
                                                                ? `${charger.amps} A`
                                                                : "N/A"}
                                                        </strong>
                                                    </span>

                                                </div>

                                            </div>

                                        </div>
                                    ))}

                                </div>
                            )}

                        </div>

                    </div>

                    {/* Right Column */}
                    <div className="station-side-column">

                        {/* Booking Card */}
                        <div className="booking-card">

                            <div className="booking-icon">
                                ⚡
                            </div>

                            <h2>Ready to Charge?</h2>

                            <p>
                                Reserve a charging slot at this station
                                and charge your EV conveniently.
                            </p>

                            <button
                                className="book-button"
                                onClick={()=>
                                    navigate("/booking", {
                                        state: {
                                            station: station,
                                        },
                                    })
                                }
                            >
                                Reserve Now →
                            </button>

                        </div>

                        {/* Station Information */}
                        <div className="details-card station-info-card">

                            <h2>Station Information</h2>

                            <div className="station-info-list">

                                <div>
                                    <span>Usage Cost</span>
                                    <strong>
                                        {station.usage_cost || "N/A"}
                                    </strong>
                                </div>

                                <div>
                                    <span>Verified</span>
                                    <strong>
                                        {station.is_recently_verified
                                            ? "Yes"
                                            : "Not verified"}
                                    </strong>
                                </div>

                                <div>
                                    <span>Latitude</span>
                                    <strong>
                                        {station.latitude}
                                    </strong>
                                </div>

                                <div>
                                    <span>Longitude</span>
                                    <strong>
                                        {station.longitude}
                                    </strong>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default StationDetails;