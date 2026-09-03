import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCurrentUser } from "../../services/authService";
import "../../styles/dashboard.css";


function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ========================================
    // LOAD CURRENT USER
    // ========================================

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
                    navigate("/login");
                }, 1000);

            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, [navigate]);


    // ========================================
    // LOGOUT
    // ========================================

    function handleLogout() {
        localStorage.removeItem("access_token");

        navigate("/login", {
            replace: true,
        });
    }


    // ========================================
    // LOADING
    // ========================================

    if (loading) {
        return (
            <div className="dashboard-page">
                <div className="dashboard-loading">
                    <p>Loading your dashboard...</p>
                </div>
            </div>
        );
    }


    // ========================================
    // ERROR
    // ========================================

    if (error) {
        return (
            <div className="dashboard-page">
                <div className="dashboard-error">
                    <p>{error}</p>
                </div>
            </div>
        );
    }


    // ========================================
    // DASHBOARD
    // ========================================

    return (
        <div className="dashboard-page">

            {/* ================================
                HEADER
            ================================= */}

            <header className="dashboard-header">

                <div>
                    <h1>EV Charging Station</h1>

                    <p>
                        Welcome back,{" "}
                        <strong>
                            {user?.full_name}
                        </strong>
                    </p>
                </div>


                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </header>


            {/* ================================
                USER INFORMATION
            ================================= */}

            <section className="dashboard-section">

                <h2>My Account</h2>

                <div className="user-info-card">

                    <div className="user-info-item">
                        <span>Name</span>
                        <strong>
                            {user?.full_name}
                        </strong>
                    </div>


                    <div className="user-info-item">
                        <span>Email</span>
                        <strong>
                            {user?.email}
                        </strong>
                    </div>


                    <div className="user-info-item">
                        <span>Phone</span>
                        <strong>
                            {user?.phone || "Not provided"}
                        </strong>
                    </div>


                    <div className="user-info-item">
                        <span>Account Type</span>
                        <strong>
                            {user?.role}
                        </strong>
                    </div>

                </div>

            </section>


            {/* ================================
                DASHBOARD FEATURES
            ================================= */}

            <section className="dashboard-section">

                <h2>EV Charging</h2>

                <div className="dashboard-grid">

                    {/* Charging Stations */}

                    <div className="dashboard-card">

                        <h3>Charging Stations</h3>

                        <p>
                            Find nearby EV charging stations
                            and check their availability.
                        </p>

                        <button
                            onClick={() => {
                                navigate("/stations");
                            }}
                        >
                            Find Stations
                        </button>

                    </div>


                    {/* Bookings */}

                    <div className="dashboard-card">

                        <h3>My Bookings</h3>

                        <p>
                            View and manage your charging
                            station bookings.
                        </p>

                        <button
                            onClick={() => {
                                navigate("/bookings");
                            }}
                        >
                            View Bookings
                        </button>

                    </div>


                    {/* Vehicles */}

                    <div className="dashboard-card">

                        <h3>My Vehicles</h3>

                        <p>
                            Manage your registered electric
                            vehicles.
                        </p>

                        <button
                            onClick={() => {
                                navigate("/vehicles");
                            }}
                        >
                            Manage Vehicles
                        </button>

                    </div>

                </div>

            </section>

        </div>
    );
}


export default Dashboard;