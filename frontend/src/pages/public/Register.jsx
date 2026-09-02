import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import "../../styles/register.css";


function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
        phone: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
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
        setSuccess("");
        setLoading(true);

        try {
            await registerUser({
                full_name: formData.full_name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone || null,
            });

            setSuccess(
                "Registration successful! You can now log in."
            );

            setFormData({
                full_name: "",
                email: "",
                password: "",
                phone: "",
            });

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="register-page">

            <div className="register-card">

                <h1>Create Account</h1>

                <p>
                    Create your EV Charging Station account.
                </p>


                {error && (
                    <div className="register-error">
                        {error}
                    </div>
                )}


                {success && (
                    <div className="register-success">
                        {success}
                    </div>
                )}


                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label htmlFor="full_name">
                            Full Name
                        </label>

                        <input
                            id="full_name"
                            name="full_name"
                            type="text"
                            value={formData.full_name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />

                    </div>


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

                        <label htmlFor="phone">
                            Phone Number
                        </label>

                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            minLength={8}
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>

                </form>


                <p className="login-link">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                </p>

            </div>

        </div>
    );
}


export default Register;