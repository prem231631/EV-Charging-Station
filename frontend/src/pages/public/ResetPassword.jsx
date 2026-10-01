import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../styles/auth.css";

function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || "";

    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!email) {
            setError(
                "Email information is missing. Please request a new OTP."
            );
            return;
        }

        if (!/^\d{6}$/.test(otp)) {
            setError("Please enter the 6-digit OTP.");
            return;
        }

        if (newPassword.length < 8) {
            setError(
                "Password must be at least 8 characters long."
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            await api.post("/api/auth/verify-otp", {
                email: email,
                otp: otp,
                new_password: newPassword,
            });

            setSuccess(
                "Password reset successfully. Redirecting to login..."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (error) {
            setError(
                error.response?.data?.detail ||
                    "Unable to reset password. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleRequestNewOtp = () => {
        navigate("/forgot-password");
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-header">
                    <h1>Reset Password</h1>

                    <p>
                        Enter the OTP sent to your email and
                        create a new password.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">

                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="auth-success">
                            {success}
                        </div>
                    )}

                    <div className="auth-form-group">
                        <label htmlFor="otp">
                            OTP
                        </label>

                        <input
                            id="otp"
                            type="text"
                            inputMode="numeric"
                            maxLength="6"
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            onChange={(e) =>
                                setOtp(
                                    e.target.value.replace(
                                        /\D/g,
                                        ""
                                    )
                                )
                            }
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="auth-form-group">
                        <label htmlFor="newPassword">
                            New Password
                        </label>

                        <input
                            id="newPassword"
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(e.target.value)
                            }
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="auth-form-group">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            disabled={loading}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-submit-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Resetting Password..."
                            : "Reset Password"}
                    </button>

                </form>

                <div className="auth-secondary-actions">

                    <button
                        type="button"
                        onClick={handleRequestNewOtp}
                        disabled={loading}
                    >
                        Didn't receive the OTP?
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        disabled={loading}
                    >
                        ← Back to Login
                    </button>

                </div>

            </div>
        </div>
    );
}

export default ResetPassword;