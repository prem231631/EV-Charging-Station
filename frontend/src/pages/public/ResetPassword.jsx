import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import api from "../../services/api";

import "../../styles/auth.css";

function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setMessage("");

        if (!token) {
            setError(
                "Invalid or missing password reset link."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post(
                "/api/auth/reset-password",
                {
                    token,
                    new_password: password,
                }
            );

            setMessage(response.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {
            setError(
                err.response?.data?.detail ||
                "Unable to reset your password."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-header">

                    <span>
                        EV CHARGING NETWORK
                    </span>

                    <h1>Reset Password</h1>

                    <p>
                        Create a new password for your account.
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

                        <label htmlFor="password">
                            New Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Enter new password"
                            minLength={8}
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
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(
                                    event.target.value
                                )
                            }
                            placeholder="Confirm new password"
                            minLength={8}
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="auth-submit-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Resetting..."
                            : "Reset Password"}
                    </button>

                </form>

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

export default ResetPassword;