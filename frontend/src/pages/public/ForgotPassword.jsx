import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import "../../styles/auth.css";

function ForgotPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [resetLink, setResetLink] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setMessage("");
        setResetLink("");

        try {
            setLoading(true);

            const response = await api.post(
                "/api/auth/forgot-password",
                { email }
            );

            setMessage(response.data.message);

            // Development only
            if (response.data.reset_link) {
                setResetLink(response.data.reset_link);
            }

        } catch (err) {
            setError(
                err.response?.data?.detail ||
                "Unable to process your request."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-header">
                    <span>EV CHARGING NETWORK</span>

                    <h1>Forgot Password?</h1>

                    <p>
                        Enter your email address to reset your password.
                    </p>
                </div>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="auth-success">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="auth-form-group">

                        <label htmlFor="email">
                            Email Address
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            placeholder="Enter your email"
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="auth-submit-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Sending..."
                            : "Reset Password"}
                    </button>

                </form>

                {resetLink && (
                    <div className="reset-link-box">

                        <strong>
                            Development Reset Link
                        </strong>

                        <p>
                            Open this link to reset your password:
                        </p>

                        <a
                            href={resetLink}
                            className="reset-link"
                        >
                            Open Reset Password
                        </a>

                    </div>
                )}

                <button
                    type="button"
                    className="auth-back-button"
                    onClick={() => navigate("/login")}
                >
                    ← Back to Login
                </button>

            </div>

        </div>
    );
}

export default ForgotPassword;