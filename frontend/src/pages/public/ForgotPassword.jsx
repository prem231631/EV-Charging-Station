import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../styles/forgotPassword.css";

function ForgotPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!email.trim()) {
            setError("Please enter your email address.");
            return;
        }

        try {
            setLoading(true);

            await api.post("/api/auth/forgot-password", {
                email: email.trim(),
            });

            setSuccess(
                "OTP has been sent to your email address."
            );

            const cooldownEnd= Date.now() + 60*1000;

            sessionStorage.setItem(
                `otp_resend_cooldown_${email.trim()}`,
                cooldownEnd.toString()
            );

            setTimeout(() => {
                navigate("/reset-password", {
                    state: {
                        email: email.trim(),
                    },
                });
            }, 800);
        } catch (error) {
            setError(
                error.response?.data?.detail ||
                    "Unable to send OTP. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-page">
            <div className="forgot-password-card">

                <div className="forgot-password-header">
                    <h1>Forgot Password?</h1>

                    <p>
                        Enter your email address and we will send
                        you an OTP to reset your password.
                    </p>
                </div>

                {error && (
                    <div className="forgot-password-error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="forgot-password-success">
                        {success}
                    </div>
                )}

                <form
                    className="forgot-password-form"
                    onSubmit={handleSubmit}
                >
                    <div className="forgot-password-form-group">
                        <label htmlFor="forgot-email">
                            Email
                        </label>

                        <input
                            id="forgot-email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            disabled={loading}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="forgot-password-submit"
                        disabled={loading}
                    >
                        {loading ? "Sending OTP..." : "Send OTP"}
                    </button>
                </form>

                <button
                    type="button"
                    className="forgot-password-back"
                    onClick={() => navigate("/login")}
                >
                    ← Back to Login
                </button>

            </div>
        </div>
    );
}

export default ForgotPassword;