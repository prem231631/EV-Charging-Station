import { useEffect, useState } from "react";
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
    const [resending, setResending] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [resendCooldown, setResendCooldown] = useState(60);

    /*
     * Start / restore the resend countdown.
     * This prevents the timer from resetting if the user
     * refreshes the page.
     */
    useEffect(() => {
        if (!email) {
            return;
        }

        const storageKey = `otp_resend_cooldown_${email}`;

        const storedTime = sessionStorage.getItem(storageKey);

        if (storedTime) {
            const remaining = Math.ceil(
                (Number(storedTime) - Date.now()) / 1000
            );

            if (remaining > 0) {
                setResendCooldown(remaining);
            } else {
                sessionStorage.removeItem(storageKey);
                setResendCooldown(0);
            }
        } else {
            const cooldownEnd = Date.now() + 60 * 1000;

            sessionStorage.setItem(
                storageKey,
                cooldownEnd.toString()
            );

            setResendCooldown(60);
        }
    }, [email]);

    /*
     * Countdown timer
     */
    useEffect(() => {
        if (resendCooldown <= 0) {
            return;
        }

        const timer = setInterval(() => {
            setResendCooldown((previous) => {
                if (previous <= 1) {
                    clearInterval(timer);
                    return 0;
                }

                return previous - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [resendCooldown]);

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

            const storageKey = `otp_resend_cooldown_${email}`;

            sessionStorage.removeItem(storageKey);

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

    const handleResendOtp = async () => {
        if (!email || resendCooldown > 0 || resending) {
            return;
        }

        setError("");
        setSuccess("");

        try {
            setResending(true);

            await api.post("/api/auth/forgot-password", {
                email,
            });

            const cooldownEnd = Date.now() + 60 * 1000;

            const storageKey = `otp_resend_cooldown_${email}`;

            sessionStorage.setItem(
                storageKey,
                cooldownEnd.toString()
            );

            setResendCooldown(60);
            setOtp("");

            setSuccess(
                "A new OTP has been sent to your email."
            );
        } catch (error) {
            setError(
                error.response?.data?.detail ||
                    "Unable to resend OTP. Please try again."
            );
        } finally {
            setResending(false);
        }
    };

    const handleRequestNewEmail = () => {
        navigate("/forgot-password");
    };

    if (!email) {
        return (
            <div className="reset-password-page">
                <div className="reset-password-card">

                    <div className="reset-password-header">
                        <h1>Reset Password</h1>

                        <p>
                            Your password reset session is
                            missing. Please request a new OTP.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="reset-password-submit"
                        onClick={handleRequestNewEmail}
                    >
                        Request New OTP
                    </button>

                    <button
                        type="button"
                        className="reset-password-back"
                        onClick={() => navigate("/login")}
                    >
                        ← Back to Login
                    </button>

                </div>
            </div>
        );
    }

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

                <div className="reset-password-email">
                    OTP sent to <strong>{email}</strong>
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

                <div className="reset-password-resend">
                    {resendCooldown > 0 ? (
                        <span>
                            Resend OTP in{" "}
                            <strong>
                                {resendCooldown}s
                            </strong>
                        </span>
                    ) : (
                        <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={resending}
                        >
                            {resending
                                ? "Sending OTP..."
                                : "Resend OTP"}
                        </button>
                    )}
                </div>

                <div className="reset-password-actions">
                    <button
                        type="button"
                        onClick={handleRequestNewEmail}
                        disabled={loading || resending}
                    >
                        Use a different email
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        disabled={loading || resending}
                    >
                        ← Back to Login
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ResetPassword;