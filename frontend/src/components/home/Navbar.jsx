import { Link } from "react-router-dom";
import { FiMapPin, FiUser } from "react-icons/fi";
import "../../styles/navbar.css";

function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-container">

                <Link to="/" className="navbar-logo">
                    <FiMapPin />
                    <span>EV Charge</span>
                </Link>

                <nav className="navbar-links">
                    <Link to="/">Home</Link>
                    <Link to="/stations">Stations</Link>
                    <Link to="/#how-it-works">How It Works</Link>
                    <Link to="/#features">Features</Link>
                </nav>

                <div className="navbar-actions">
                    <Link to="/login" className="navbar-login">
                        <FiUser />
                        Login
                    </Link>

                    <Link to="/register" className="navbar-register">
                        Get Started
                    </Link>
                </div>

            </div>
        </header>
    );
}

export default Navbar;