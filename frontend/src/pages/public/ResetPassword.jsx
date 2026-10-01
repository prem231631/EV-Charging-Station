import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../styles/resetPassword.css";

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
                email,
                otp,
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

    return (
        <div className="reset-password-page">
            <div className="reset-password-card">

                <div className="reset-password-header">
                    <h1>Reset Password</h1>

                    <p>
                        Enter the OTP sent to your email and
                        create a new password.
                    </p>
                </div>

                {error && (
                    <div className="reset-password-error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="reset-password-success">
                        {success}
                    </div>
                )}

                <form
                    className="reset-password-form"
                    onSubmit={handleSubmit}
                >
                    <div className="reset-password-form-group">
                        <label htmlFor="reset-otp">
                            OTP
                        </label>

                        <input
                            id="reset-otp"
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
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

                    <div className="reset-password-form-group">
                        <label htmlFor="new-password">
                            New Password
                        </label>

                        <input
                            id="new-password"
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

                    <div className="reset-password-form-group">
                        <label htmlFor="confirm-password">
                            Confirm Password
                        </label>

                        <input
                            id="confirm-password"
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
                        className="reset-password-submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Resetting Password..."
                            : "Reset Password"}
                    </button>
                </form>

                <div className="reset-password-actions">
                    <button
                        type="button"
                        onClick={() =>
                            navigate("/forgot-password")
                        }
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