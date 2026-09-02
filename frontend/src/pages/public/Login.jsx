import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import "../../styles/login.css";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await loginUser({
                email: formData.email,
                password: formData.password,
            });

            // Save token returned by backend
            if (response?.access_token) {
                localStorage.setItem("access_token", response.access_token);
            } else if (response?.token) {
                localStorage.setItem("access_token", response.token);
            }

            // Go to dashboard after successful login
            navigate("/dashboard");

        } catch (err) {
            setError(
                err?.message || "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-page">

            <div className="login-card">

                <h1>Welcome Back</h1>

                <p>
                    Login to your EV Charging Station account.
                </p>

                {error && (
                    <div className="login-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <div className="password-label-row">
                            <label htmlFor="password">
                                Password
                            </label>

                            <button
                                type="button"
                                className="forgot-password"
                                onClick={() =>
                                    navigate("/forgot-password")
                                }
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </form>

                <p className="register-link">
                    Don't have an account?{" "}

                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                    >
                        Create Account
                    </button>
                </p>

            </div>

        </div>
    );
}

export default Login;