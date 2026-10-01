import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../styles/auth.css";

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
                "If an account exists with this email, an OTP has been sent."
            );

            // Give the user a moment to see the success message
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
        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-header">
                    <h1>Forgot Password?</h1>
                    <p>
                        Enter your email address and we will send you
                        an OTP to reset your password.
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
                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
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
                        className="auth-submit-button"
                        disabled={loading}
                    >
                        {loading ? "Sending OTP..." : "Send OTP"}
                    </button>

                </form>

                <div className="auth-back-button">
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                    >
                        ← Back to Login
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ForgotPassword;