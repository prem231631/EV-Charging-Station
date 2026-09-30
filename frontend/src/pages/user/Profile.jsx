import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getCurrentUser,
    updateProfile,
} from "../../services/authService";
import "../../styles/profile.css";

function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {
        try {
            setLoading(true);
            setError("");

            const currentUser = await getCurrentUser();

            setUser(currentUser);
            setFullName(currentUser.full_name || "");
            setPhone(currentUser.phone || "");
        } catch (err) {
            setError(err.message);

            if (
                err.message.toLowerCase().includes("token") ||
                err.message.toLowerCase().includes("unauthorized")
            ) {
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (fullName.trim().length < 2) {
            setError("Full name must contain at least 2 characters.");
            return;
        }

        try {
            setSaving(true);

            const updatedUser = await updateProfile({
                full_name: fullName.trim(),
                phone: phone.trim() || null,
            });

            setUser(updatedUser);
            setFullName(updatedUser.full_name || "");
            setPhone(updatedUser.phone || "");

            setSuccess("Profile updated successfully.");

            setTimeout(() => {
                setSuccess("");
            }, 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    }

    function handleCancel() {
        if (!user) {
            return;
        }

        setFullName(user.full_name || "");
        setPhone(user.phone || "");

        setError("");
        setSuccess("");
    }

    if (loading) {
        return (
            <div className="profile-page">
                <div className="profile-container">
                    <div className="profile-loading">
                        <div className="profile-loading-icon">⚡</div>
                        <p>Loading your profile...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="profile-page">
                <div className="profile-container">
                    <div className="profile-error">
                        <h2>Unable to Load Profile</h2>
                        <p>{error || "Something went wrong."}</p>

                        <button
                            className="profile-back-button"
                            onClick={() => navigate("/dashboard")}
                        >
                            ← Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-container">

                <button
                    className="profile-back-button"
                    onClick={() => navigate("/dashboard")}
                >
                    ← Dashboard
                </button>

                <header className="profile-header">
                    <span>EV CHARGING NETWORK</span>

                    <h1>My Profile</h1>

                    <p>
                        Manage your personal information and account details.
                    </p>
                </header>

                <div className="profile-layout">

                    {/* PROFILE SUMMARY */}
                    <div className="profile-summary-card">

                        <div className="profile-avatar">
                            {user.full_name
                                ? user.full_name.charAt(0).toUpperCase()
                                : "U"}
                        </div>

                        <h2>{user.full_name}</h2>

                        <p className="profile-summary-email">
                            {user.email}
                        </p>

                        <div className="profile-summary-role">
                            <span>Role</span>
                            <strong>
                                {user.role === "admin"
                                    ? "Administrator"
                                    : "User"}
                            </strong>
                        </div>

                        <div className="profile-summary-status">
                            <span>Status</span>

                            <strong
                                className={
                                    user.is_active
                                        ? "profile-status-active"
                                        : "profile-status-inactive"
                                }
                            >
                                {user.is_active
                                    ? "Active"
                                    : "Inactive"}
                            </strong>
                        </div>
                    </div>

                    {/* PROFILE FORM */}
                    <div className="profile-form-card">

                        <div className="profile-form-header">
                            <h2>Personal Information</h2>

                            <p>
                                Update the information associated with your
                                account.
                            </p>
                        </div>

                        {error && (
                            <div className="profile-error-message">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="profile-success-message">
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            <div className="profile-form-group">
                                <label htmlFor="fullName">
                                    Full Name
                                </label>

                                <input
                                    id="fullName"
                                    type="text"
                                    value={fullName}
                                    onChange={(event) =>
                                        setFullName(event.target.value)
                                    }
                                    placeholder="Enter your full name"
                                    maxLength="100"
                                    required
                                />
                            </div>

                            <div className="profile-form-group">
                                <label htmlFor="email">
                                    Email Address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    value={user.email}
                                    disabled
                                />

                                <small>
                                    Email address cannot be changed here.
                                </small>
                            </div>

                            <div className="profile-form-group">
                                <label htmlFor="phone">
                                    Phone Number
                                </label>

                                <input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(event) =>
                                        setPhone(event.target.value)
                                    }
                                    placeholder="Enter your phone number"
                                    maxLength="20"
                                />
                            </div>

                            <div className="profile-form-actions">

                                <button
                                    type="button"
                                    className="profile-cancel-button"
                                    onClick={handleCancel}
                                    disabled={saving}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="profile-save-button"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Saving..."
                                        : "Save Changes"}
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;