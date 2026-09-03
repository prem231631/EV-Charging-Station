import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCurrentUser } from "../../services/authService";
import "../../styles/dashboard.css";


function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        async function loadUser() {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch (err) {
                console.error("Failed to load user:", err);

                localStorage.removeItem("access_token");
                setError("Your session has expired. Please login again.");

                setTimeout(() => {
                    navigate("/login", { replace: true });
                }, 1000);
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, [navigate]);


    function handleLogout() {
        localStorage.removeItem("access_token");
        navigate("/login", { replace: true });
    }


    if (loading) {
        return (
            <div className="dashboard-loading-page">
                <div className="loading-spinner"></div>
                <p>Loading your dashboard...</p>
            </div>
        );
    }


    if (error) {
        return (
            <div className="dashboard-error-page">
                <div className="dashboard-error-box">
                    <h2>Session Expired</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }


    return (
        <div className="dashboard-page">

            {/* =====================================
                NAVBAR
            ====================================== */}

            <nav className="dashboard-navbar">

                <div
                    className="dashboard-logo"
                    onClick={() => navigate("/dashboard")}
                >
                    <div className="logo-icon">
                        ⚡
                    </div>

                    <div>
                        <span className="logo-title">
                            EV Charge
                        </span>

                        <span className="logo-subtitle">
                            Nepal
                        </span>
                    </div>
                </div>


                <div className="dashboard-nav-right">

                    <div className="notification-button">
                        🔔
                        <span className="notification-dot"></span>
                    </div>


                    <div className="nav-user">

                        <div className="nav-user-avatar">
                            {user?.full_name?.charAt(0).toUpperCase()}
                        </div>

                        <div className="nav-user-info">
                            <strong>{user?.full_name}</strong>
                            <span>{user?.role}</span>
                        </div>

                    </div>


                    <button
                        className="nav-logout"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </nav>


            {/* =====================================
                MAIN CONTENT
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
                            <span>{user?.full_name}</span>
                        </h1>

                        <p>
                            Find charging stations, manage your
                            vehicles and keep track of your bookings
                            — all in one place.
                        </p>

                        <button
                            className="hero-button"
                            onClick={() => navigate("/stations")}
                        >
                            Find Charging Station
                            <span>→</span>
                        </button>

                    </div>


                    <div className="hero-visual">

                        <div className="hero-glow"></div>

                        <div className="charging-circle">

                            <div className="charging-circle-inner">
                                ⚡
                            </div>

                        </div>

                        <div className="floating-card floating-card-one">
                            <span>⚡</span>
                            <div>
                                <strong>Fast Charging</strong>
                                <small>Ready to charge</small>
                            </div>
                        </div>


                        <div className="floating-card floating-card-two">
                            <span>📍</span>
                            <div>
                                <strong>Nearby Stations</strong>
                                <small>Find your nearest charger</small>
                            </div>
                        </div>

                    </div>

                </section>


                {/* =================================
                    QUICK STATS
                ================================== */}

                <section className="stats-grid">

                    <div className="stat-card">

                        <div className="stat-icon station-icon">
                            ⚡
                        </div>

                        <div className="stat-content">
                            <span>Charging Stations</span>
                            <strong>—</strong>
                            <small>Available near you</small>
                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon booking-icon">
                            📅
                        </div>

                        <div className="stat-content">
                            <span>My Bookings</span>
                            <strong>—</strong>
                            <small>Your charging bookings</small>
                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon vehicle-icon">
                            🚗
                        </div>

                        <div className="stat-content">
                            <span>My Vehicles</span>
                            <strong>—</strong>
                            <small>Registered vehicles</small>
                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon account-icon">
                            👤
                        </div>

                        <div className="stat-content">
                            <span>Account</span>
                            <strong className="active-status">
                                Active
                            </strong>
                            <small>{user?.email}</small>
                        </div>

                    </div>

                </section>


                {/* =================================
                    FEATURES
                ================================== */}

                <section className="dashboard-section">

                    <div className="section-heading">

                        <div>
                            <span>YOUR EV JOURNEY</span>
                            <h2>Everything you need</h2>
                        </div>

                    </div>


                    <div className="feature-grid">

                        {/* STATIONS */}

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
                                Discover nearby charging stations
                                and check their availability before
                                you arrive.
                            </p>

                            <button
                                onClick={() => navigate("/stations")}
                            >
                                Explore Stations
                                <span>→</span>
                            </button>

                        </div>


                        {/* BOOKINGS */}

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
                                Reserve a charging slot and keep
                                track of your upcoming and previous
                                charging sessions.
                            </p>

                            <button
                                onClick={() => navigate("/bookings")}
                            >
                                View Bookings
                                <span>→</span>
                            </button>

                        </div>


                        {/* VEHICLES */}

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
                                vehicles to make booking faster
                                and easier.
                            </p>

                            <button
                                onClick={() => navigate("/vehicles")}
                            >
                                Manage Vehicles
                                <span>→</span>
                            </button>

                        </div>

                    </div>

                </section>


                {/* =================================
                    ACCOUNT SECTION
                ================================== */}

                <section className="account-section">

                    <div className="account-card">

                        <div className="account-avatar">
                            {user?.full_name?.charAt(0).toUpperCase()}
                        </div>

                        <div className="account-details">

                            <span>LOGGED IN AS</span>

                            <h3>
                                {user?.full_name}
                            </h3>

                            <p>
                                {user?.email}
                            </p>

                        </div>


                        <div className="account-actions">

                            <button
                                onClick={() => navigate("/profile")}
                            >
                                View Profile
                            </button>

                            <button
                                className="secondary-action"
                                onClick={handleLogout}
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