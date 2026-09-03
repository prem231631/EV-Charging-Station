import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCurrentUser } from "../../services/authService";
import api from "../../services/api";
import "../../styles/dashboard.css";


function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stationsLoading, setStationsLoading] = useState(true);
    const [error, setError] = useState("");


    /*
    ==========================================
    LOAD USER + STATIONS
    ==========================================
    */

    useEffect(() => {
        async function loadDashboard() {
            try {
                // Get logged-in user
                const currentUser = await getCurrentUser();

                setUser(currentUser);

                // Get charging stations
                try {
                    const response = await api.get("/api/stations");

                    setStations(response.data || []);
                } catch (stationError) {
                    console.error(
                        "Failed to load stations:",
                        stationError
                    );

                    setStations([]);
                } finally {
                    setStationsLoading(false);
                }

            } catch (err) {
                console.error(
                    "Failed to load dashboard:",
                    err
                );

                localStorage.removeItem("access_token");

                setError(
                    "Your session has expired. Please login again."
                );

                setTimeout(() => {
                    navigate("/login", {
                        replace: true
                    });
                }, 1000);

            } finally {
                setLoading(false);
            }
        }

        loadDashboard();

    }, [navigate]);


    /*
    ==========================================
    LOGOUT
    ==========================================
    */

    function handleLogout() {
        localStorage.removeItem("access_token");

        navigate("/login", {
            replace: true
        });
    }


    /*
    ==========================================
    LOADING
    ==========================================
    */

    if (loading) {
        return (
            <div className="dashboard-loading-page">

                <div className="loading-spinner"></div>

                <p>
                    Loading your dashboard...
                </p>

            </div>
        );
    }


    /*
    ==========================================
    SESSION ERROR
    ==========================================
    */

    if (error) {
        return (
            <div className="dashboard-error-page">

                <div className="dashboard-error-box">

                    <div className="error-icon">
                        ⚠️
                    </div>

                    <h2>
                        Session Expired
                    </h2>

                    <p>
                        {error}
                    </p>

                </div>

            </div>
        );
    }


    /*
    ==========================================
    DASHBOARD
    ==========================================
    */

    return (
        <div className="dashboard-page">

            {/* =====================================
                NAVBAR
            ====================================== */}

            <nav className="dashboard-navbar">

                <div
                    className="dashboard-logo"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >

                    <div className="logo-icon">
                        ⚡
                    </div>

                    <div className="logo-text">

                        <span className="logo-title">
                            EV Charge
                        </span>

                        <span className="logo-subtitle">
                            Nepal
                        </span>

                    </div>

                </div>


                <div className="dashboard-nav-right">

                    {/* Notification */}

                    <button
                        className="notification-button"
                        type="button"
                    >

                        🔔

                        <span className="notification-dot"></span>

                    </button>


                    {/* User */}

                    <div className="nav-user">

                        <div className="nav-user-avatar">

                            {user?.full_name
                                ?.charAt(0)
                                .toUpperCase()}

                        </div>

                        <div className="nav-user-info">

                            <strong>
                                {user?.full_name}
                            </strong>

                            <span>
                                {user?.role || "User"}
                            </span>

                        </div>

                    </div>


                    {/* Logout */}

                    <button
                        className="nav-logout"
                        onClick={handleLogout}
                        type="button"
                    >
                        Logout
                    </button>

                </div>

            </nav>


            {/* =====================================
                MAIN
            ====================================== */}

            <main className="dashboard-main">


                {/* =================================
                    WELCOME HERO
                ================================== */}

                <section className="dashboard-hero">

                    <div className="hero-content">

                        <span className="hero-label">
                            ⚡ EV CHARGING PLATFORM
                        </span>

                        <h1>

                            Welcome back,

                            <br />

                            <span>
                                {user?.full_name}
                            </span>

                        </h1>

                        <p>
                            Find charging stations, manage
                            your vehicles and keep track of
                            your bookings — all in one place.
                        </p>


                        <button
                            className="hero-button"
                            onClick={() =>
                                navigate("/stations")
                            }
                            type="button"
                        >

                            Find Charging Station

                            <span>
                                →
                            </span>

                        </button>

                    </div>


                    {/* HERO VISUAL */}

                    <div className="hero-visual">

                        <div className="hero-glow"></div>

                        <div className="charging-circle">

                            <div className="charging-circle-inner">
                                ⚡
                            </div>

                        </div>


                        <div className="floating-card floating-card-one">

                            <span>
                                ⚡
                            </span>

                            <div>

                                <strong>
                                    Fast Charging
                                </strong>

                                <small>
                                    Ready to charge
                                </small>

                            </div>

                        </div>


                        <div className="floating-card floating-card-two">

                            <span>
                                📍
                            </span>

                            <div>

                                <strong>
                                    Nearby Stations
                                </strong>

                                <small>
                                    Find your nearest charger
                                </small>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =================================
                    QUICK STATS
                ================================== */}

                <section className="stats-grid">


                    {/* STATIONS */}

                    <div className="stat-card">

                        <div className="stat-icon station-icon">
                            ⚡
                        </div>

                        <div className="stat-content">

                            <span>
                                Charging Stations
                            </span>

                            <strong>

                                {stationsLoading
                                    ? "..."
                                    : stations.length}

                            </strong>

                            <small>
                                Available stations
                            </small>

                        </div>

                    </div>


                    {/* BOOKINGS */}

                    <div className="stat-card">

                        <div className="stat-icon booking-icon">
                            📅
                        </div>

                        <div className="stat-content">

                            <span>
                                My Bookings
                            </span>

                            <strong>
                                —
                            </strong>

                            <small>
                                Your charging bookings
                            </small>

                        </div>

                    </div>


                    {/* VEHICLES */}

                    <div className="stat-card">

                        <div className="stat-icon vehicle-icon">
                            🚗
                        </div>

                        <div className="stat-content">

                            <span>
                                My Vehicles
                            </span>

                            <strong>
                                —
                            </strong>

                            <small>
                                Registered vehicles
                            </small>

                        </div>

                    </div>


                    {/* ACCOUNT */}

                    <div className="stat-card">

                        <div className="stat-icon account-icon">
                            👤
                        </div>

                        <div className="stat-content">

                            <span>
                                Account
                            </span>

                            <strong className="active-status">
                                Active
                            </strong>

                            <small>
                                {user?.email}
                            </small>

                        </div>

                    </div>

                </section>


                {/* =================================
                    QUICK ACTIONS
                ================================== */}

                <section className="dashboard-section">

                    <div className="section-heading">

                        <div>

                            <span>
                                YOUR EV JOURNEY
                            </span>

                            <h2>
                                Everything you need
                            </h2>

                        </div>

                    </div>


                    <div className="feature-grid">


                        {/* =================================
                            STATIONS
                        ================================== */}

                        <div className="feature-card station-card">

                            <div className="feature-top">

                                <div className="feature-icon">
                                    ⚡
                                </div>

                                <span className="feature-arrow">
                                    →
                                </span>

                            </div>

                            <h3>
                                Charging Stations
                            </h3>

                            <p>
                                Discover charging stations
                                across Nepal and check their
                                available chargers.
                            </p>

                            <button
                                onClick={() =>
                                    navigate("/stations")
                                }
                                type="button"
                            >

                                Explore Stations

                                <span>
                                    →
                                </span>

                            </button>

                        </div>


                        {/* =================================
                            BOOKINGS
                        ================================== */}

                        <div className="feature-card booking-card">

                            <div className="feature-top">

                                <div className="feature-icon">
                                    📅
                                </div>

                                <span className="feature-arrow">
                                    →
                                </span>

                            </div>

                            <h3>
                                My Bookings
                            </h3>

                            <p>
                                Reserve charging slots and
                                keep track of your upcoming
                                charging sessions.
                            </p>

                            <button
                                onClick={() =>
                                    navigate("/my-bookings")
                                }
                                type="button"
                            >

                                View Bookings

                                <span>
                                    →
                                </span>

                            </button>

                        </div>


                        {/* =================================
                            VEHICLES
                        ================================== */}

                        <div className="feature-card vehicle-card">

                            <div className="feature-top">

                                <div className="feature-icon">
                                    🚗
                                </div>

                                <span className="feature-arrow">
                                    →
                                </span>

                            </div>

                            <h3>
                                My Vehicles
                            </h3>

                            <p>
                                Add and manage your electric
                                vehicles to make your charging
                                experience easier.
                            </p>

                            <button
                                onClick={() =>
                                    navigate("/vehicles")
                                }
                                type="button"
                            >

                                Manage Vehicles

                                <span>
                                    →
                                </span>

                            </button>

                        </div>

                    </div>

                </section>


                {/* =================================
                    STATION PREVIEW
                ================================== */}

                <section className="dashboard-section station-preview-section">

                    <div className="section-heading">

                        <div>

                            <span>
                                CHARGING NETWORK
                            </span>

                            <h2>
                                Available stations
                            </h2>

                        </div>


                        <button
                            className="section-action"
                            onClick={() =>
                                navigate("/stations")
                            }
                            type="button"
                        >
                            View all →
                        </button>

                    </div>


                    {stationsLoading ? (

                        <div className="station-preview-loading">
                            Loading stations...
                        </div>

                    ) : stations.length === 0 ? (

                        <div className="station-preview-empty">

                            <div>
                                ⚡
                            </div>

                            <h3>
                                No stations available
                            </h3>

                            <p>
                                Charging stations will appear
                                here once they are synchronized.
                            </p>

                        </div>

                    ) : (

                        <div className="station-preview-grid">

                            {stations
                                .slice(0, 3)
                                .map((station) => (

                                    <div
                                        className="station-preview-card"
                                        key={station.id}
                                    >

                                        <div className="station-preview-icon">
                                            ⚡
                                        </div>

                                        <div className="station-preview-info">

                                            <h3>
                                                {station.name}
                                            </h3>

                                            <p>
                                                {station.city ||
                                                    station.address_line1 ||
                                                    "Nepal"}
                                            </p>

                                            <span>
                                                {station.number_of_points ??
                                                    station.chargers?.length ??
                                                    0}{" "}
                                                charging points
                                            </span>

                                        </div>

                                    </div>

                                ))}

                        </div>

                    )}

                </section>


                {/* =================================
                    ACCOUNT
                ================================== */}

                <section className="account-section">

                    <div className="account-card">

                        <div className="account-avatar">

                            {user?.full_name
                                ?.charAt(0)
                                .toUpperCase()}

                        </div>


                        <div className="account-details">

                            <span>
                                LOGGED IN AS
                            </span>

                            <h3>
                                {user?.full_name}
                            </h3>

                            <p>
                                {user?.email}
                            </p>

                        </div>


                        <div className="account-actions">

                            <button
                                onClick={() =>
                                    navigate("/profile")
                                }
                                type="button"
                            >
                                View Profile
                            </button>

                            <button
                                className="secondary-action"
                                onClick={handleLogout}
                                type="button"
                            >
                                Logout
                            </button>

                        </div>

                    </div>

                </section>

            </main>


            {/* =====================================
                FOOTER
            ====================================== */}

            <footer className="dashboard-footer">

                <span>
                    © 2026 EV Charge Nepal
                </span>

                <span>
                    Smart charging for a cleaner future ⚡
                </span>

            </footer>

        </div>
    );
}


export default Dashboard;