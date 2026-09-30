import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAdminStats,
    getAdminUsers,
    getAdminStations,
    getAdminBookings,
    updateUserStatus,
} from "../../services/adminService";

import "../../styles/adminDashboard.css";

function AdminDashboard() {
    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState("overview");

    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [stations, setStations] = useState([]);
    const [bookings, setBookings] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [actionLoading, setActionLoading] = useState(null);

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        try {
            setLoading(true);
            setError("");

            const [
                statsData,
                usersData,
                stationsData,
                bookingsData,
            ] = await Promise.all([
                getAdminStats(),
                getAdminUsers(),
                getAdminStations(),
                getAdminBookings(),
            ]);

            setStats(statsData);
            setUsers(usersData);
            setStations(stationsData);
            setBookings(bookingsData);
        } catch (err) {
            setError(err.message);

            if (
                err.message.toLowerCase().includes("admin") ||
                err.message.toLowerCase().includes("unauthorized")
            ) {
                navigate("/dashboard");
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleUserStatus(userId) {
        try {
            setActionLoading(userId);

            await updateUserStatus(userId);

            const updatedUsers = await getAdminUsers();
            setUsers(updatedUsers);

            const updatedStats = await getAdminStats();
            setStats(updatedStats);
        } catch (err) {
            setError(err.message);
        } finally {
            setActionLoading(null);
        }
    }

    function formatDate(date) {
        if (!date) {
            return "N/A";
        }

        return new Date(date).toLocaleDateString();
    }

    function formatDateTime(date) {
        if (!date) {
            return "N/A";
        }

        return new Date(date).toLocaleString();
    }

    if (loading) {
        return (
            <div className="admin-dashboard-page">
                <div className="admin-loading">
                    <div className="admin-loading-icon">⚡</div>
                    <p>Loading admin dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard-page">

            <aside className="admin-sidebar">

                <div className="admin-brand">
                    <div className="admin-brand-icon">⚡</div>

                    <div>
                        <strong>EV Network</strong>
                        <span>Administration</span>
                    </div>
                </div>

                <nav className="admin-navigation">

                    <button
                        className={
                            activeSection === "overview"
                                ? "admin-nav-item active"
                                : "admin-nav-item"
                        }
                        onClick={() => setActiveSection("overview")}
                    >
                        <span>▦</span>
                        Overview
                    </button>

                    <button
                        className={
                            activeSection === "users"
                                ? "admin-nav-item active"
                                : "admin-nav-item"
                        }
                        onClick={() => setActiveSection("users")}
                    >
                        <span>👥</span>
                        Users
                    </button>

                    <button
                        className={
                            activeSection === "stations"
                                ? "admin-nav-item active"
                                : "admin-nav-item"
                        }
                        onClick={() => setActiveSection("stations")}
                    >
                        <span>⚡</span>
                        Stations
                    </button>

                    <button
                        className={
                            activeSection === "bookings"
                                ? "admin-nav-item active"
                                : "admin-nav-item"
                        }
                        onClick={() => setActiveSection("bookings")}
                    >
                        <span>📅</span>
                        Bookings
                    </button>

                </nav>

                <div className="admin-sidebar-bottom">

                    <button
                        className="admin-back-button"
                        onClick={() => navigate("/dashboard")}
                    >
                        ← User Dashboard
                    </button>

                </div>
            </aside>

            <main className="admin-main">

                <header className="admin-header">

                    <div>
                        <span>EV CHARGING NETWORK</span>

                        <h1>
                            {activeSection === "overview" &&
                                "Admin Dashboard"}

                            {activeSection === "users" &&
                                "User Management"}

                            {activeSection === "stations" &&
                                "Station Management"}

                            {activeSection === "bookings" &&
                                "Booking Management"}
                        </h1>
                    </div>

                    <div className="admin-header-badge">
                        Administrator
                    </div>

                </header>

                {error && (
                    <div className="admin-error">
                        {error}
                    </div>
                )}

                {/* =================================================
                    OVERVIEW
                ================================================= */}

                {activeSection === "overview" && stats && (
                    <section className="admin-section">

                        <div className="admin-stats-grid">

                            <div className="admin-stat-card">
                                <div className="admin-stat-icon">
                                    👥
                                </div>

                                <div>
                                    <span>Total Users</span>
                                    <strong>{stats.total_users}</strong>
                                </div>
                            </div>

                            <div className="admin-stat-card">
                                <div className="admin-stat-icon">
                                    ✓
                                </div>

                                <div>
                                    <span>Active Users</span>
                                    <strong>{stats.active_users}</strong>
                                </div>
                            </div>

                            <div className="admin-stat-card">
                                <div className="admin-stat-icon">
                                    ⚡
                                </div>

                                <div>
                                    <span>Stations</span>
                                    <strong>{stats.total_stations}</strong>
                                </div>
                            </div>

                            <div className="admin-stat-card">
                                <div className="admin-stat-icon">
                                    📅
                                </div>

                                <div>
                                    <span>Total Bookings</span>
                                    <strong>{stats.total_bookings}</strong>
                                </div>
                            </div>

                        </div>

                        <div className="admin-overview-grid">

                            <div className="admin-panel">
                                <div className="admin-panel-header">
                                    <div>
                                        <h2>Booking Summary</h2>
                                        <p>Current booking statistics</p>
                                    </div>
                                </div>

                                <div className="admin-summary-list">

                                    <div>
                                        <span>Confirmed</span>
                                        <strong>
                                            {stats.confirmed_bookings}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Cancelled</span>
                                        <strong>
                                            {stats.cancelled_bookings}
                                        </strong>
                                    </div>

                                </div>
                            </div>

                            <div className="admin-panel">
                                <div className="admin-panel-header">
                                    <div>
                                        <h2>System Overview</h2>
                                        <p>Platform information</p>
                                    </div>
                                </div>

                                <div className="admin-summary-list">

                                    <div>
                                        <span>Users</span>
                                        <strong>{users.length}</strong>
                                    </div>

                                    <div>
                                        <span>Charging Stations</span>
                                        <strong>{stations.length}</strong>
                                    </div>

                                    <div>
                                        <span>Bookings</span>
                                        <strong>{bookings.length}</strong>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </section>
                )}

                {/* =================================================
                    USERS
                ================================================= */}

                {activeSection === "users" && (
                    <section className="admin-section">

                        <div className="admin-panel">

                            <div className="admin-panel-header">
                                <div>
                                    <h2>Registered Users</h2>
                                    <p>
                                        Manage platform user accounts.
                                    </p>
                                </div>

                                <strong className="admin-count">
                                    {users.length} users
                                </strong>
                            </div>

                            <div className="admin-table-wrapper">

                                <table className="admin-table">

                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Joined</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {users.map((user) => (
                                            <tr key={user.id}>

                                                <td>
                                                    <strong>
                                                        {user.full_name}
                                                    </strong>
                                                </td>

                                                <td>{user.email}</td>

                                                <td>
                                                    {user.phone || "N/A"}
                                                </td>

                                                <td>
                                                    <span className="admin-role">
                                                        {user.role}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span
                                                        className={
                                                            user.is_active
                                                                ? "admin-status active"
                                                                : "admin-status inactive"
                                                        }
                                                    >
                                                        {user.is_active
                                                            ? "Active"
                                                            : "Inactive"}
                                                    </span>
                                                </td>

                                                <td>
                                                    {formatDate(
                                                        user.created_at
                                                    )}
                                                </td>

                                                <td>

                                                    {user.role === "admin" ? (
                                                        <span className="admin-self-label">
                                                            Admin
                                                        </span>
                                                    ) : (
                                                        <button
                                                            className={
                                                                user.is_active
                                                                    ? "admin-action-button deactivate"
                                                                    : "admin-action-button activate"
                                                            }
                                                            disabled={
                                                                actionLoading ===
                                                                user.id
                                                            }
                                                            onClick={() =>
                                                                handleUserStatus(
                                                                    user.id
                                                                )
                                                            }
                                                        >
                                                            {actionLoading ===
                                                            user.id
                                                                ? "..."
                                                                : user.is_active
                                                                    ? "Deactivate"
                                                                    : "Activate"}
                                                        </button>
                                                    )}

                                                </td>

                                            </tr>
                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </section>
                )}

                {/* =================================================
                    STATIONS
                ================================================= */}

                {activeSection === "stations" && (
                    <section className="admin-section">

                        <div className="admin-panel">

                            <div className="admin-panel-header">
                                <div>
                                    <h2>Charging Stations</h2>
                                    <p>
                                        Stations currently stored in the
                                        platform.
                                    </p>
                                </div>

                                <strong className="admin-count">
                                    {stations.length} stations
                                </strong>
                            </div>

                            <div className="admin-table-wrapper">

                                <table className="admin-table">

                                    <thead>
                                        <tr>
                                            <th>Station</th>
                                            <th>Operator</th>
                                            <th>Location</th>
                                            <th>Charging Points</th>
                                            <th>Cost</th>
                                            <th>Verified</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {stations.map((station) => (
                                            <tr key={station.id}>

                                                <td>
                                                    <strong>
                                                        {station.name}
                                                    </strong>
                                                </td>

                                                <td>
                                                    {station.operator_name ||
                                                        "N/A"}
                                                </td>

                                                <td>
                                                    {station.city ||
                                                        "Nepal"}
                                                    {station.province
                                                        ? `, ${station.province}`
                                                        : ""}
                                                </td>

                                                <td>
                                                    {station.number_of_points ??
                                                        "N/A"}
                                                </td>

                                                <td>
                                                    {station.usage_cost ||
                                                        "N/A"}
                                                </td>

                                                <td>
                                                    {station.is_recently_verified
                                                        ? "✓ Yes"
                                                        : "—"}
                                                </td>

                                            </tr>
                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </section>
                )}

                {/* =================================================
                    BOOKINGS
                ================================================= */}

                {activeSection === "bookings" && (
                    <section className="admin-section">

                        <div className="admin-panel">

                            <div className="admin-panel-header">
                                <div>
                                    <h2>All Bookings</h2>
                                    <p>
                                        Monitor charging station
                                        reservations.
                                    </p>
                                </div>

                                <strong className="admin-count">
                                    {bookings.length} bookings
                                </strong>
                            </div>

                            <div className="admin-table-wrapper">

                                <table className="admin-table">

                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Station</th>
                                            <th>Date & Time</th>
                                            <th>Duration</th>
                                            <th>Status</th>
                                            <th>Notes</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {bookings.map((booking) => (
                                            <tr key={booking.id}>

                                                <td>
                                                    <strong>
                                                        {booking.user_name}
                                                    </strong>

                                                    <small className="admin-table-subtext">
                                                        {booking.user_email}
                                                    </small>
                                                </td>

                                                <td>
                                                    <strong>
                                                        {booking.station_name}
                                                    </strong>

                                                    <small className="admin-table-subtext">
                                                        {booking.city ||
                                                            "Nepal"}
                                                    </small>
                                                </td>

                                                <td>
                                                    {formatDateTime(
                                                        booking.booking_date
                                                    )}
                                                </td>

                                                <td>
                                                    {
                                                        booking.duration_minutes
                                                    }{" "}
                                                    min
                                                </td>

                                                <td>
                                                    <span
                                                        className={`admin-status booking-${String(
                                                            booking.status
                                                        ).toLowerCase()}`}
                                                    >
                                                        {booking.status}
                                                    </span>
                                                </td>

                                                <td>
                                                    {booking.notes || "—"}
                                                </td>

                                            </tr>
                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </section>
                )}

            </main>
        </div>
    );
}

export default AdminDashboard;