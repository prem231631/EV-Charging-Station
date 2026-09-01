import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";

import "../../styles/footer.css";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-brand">

                    <Link to="/" className="footer-logo">
                        <FiMapPin />
                        EV Charge
                    </Link>

                    <p>
                        Making EV charging simple,
                        accessible, and convenient.
                    </p>

                </div>

                <div className="footer-column">

                    <h4>Platform</h4>

                    <Link to="/stations">
                        Find Stations
                    </Link>

                    <Link to="/login">
                        Login
                    </Link>

                    <Link to="/register">
                        Register
                    </Link>

                </div>

                <div className="footer-column">

                    <h4>Company</h4>

                    <a href="#how-it-works">
                        How It Works
                    </a>

                    <a href="#features">
                        Features
                    </a>

                </div>

                <div className="footer-column">

                    <h4>Contact</h4>

                    <span>
                        <FiMapPin />
                        Kathmandu, Nepal
                    </span>

                    <span>
                        <FiMail />
                        support@evcharge.com
                    </span>

                    <span>
                        <FiPhone />
                        +977 9800000000
                    </span>

                </div>

            </div>

            <div className="footer-bottom">
                © 2026 EV Charge. All rights reserved.
            </div>

        </footer>
    );
}

export default Footer;