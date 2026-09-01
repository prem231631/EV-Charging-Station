import { Link } from "react-router-dom";
import { FiArrowRight, FiMapPin, FiZap } from "react-icons/fi";
import "../../styles/hero.css";

function Hero() {
    return (
        <section className="hero">
            <div className="hero-container">
                <div className="hero-content">
                    
                    <div className="hero-badge">
                        <FiZap />
                        Smart EV Charging
                    </div>

                    <h1>
                        Charge your EV.
                        <span> Anywhere. Anytime.</span>
                    </h1>

                    <p>
                        Find nearby charging stations, check charger
                        availability, and reserve your charging slot
                        in just a few clicks.
                    </p>

                    <div className="hero-buttons">

                        <Link
                            to="/stations"
                            className="hero-primary-button"
                        >
                            <FiMapPin />
                            Find Charging Station
                        </Link>

                        <Link
                            to="/register"
                            className="hero-secondary-button"
                        >
                            Get Started
                            <FiArrowRight />
                        </Link>

                    </div>

                    <div className="hero-stats">

                        <div>
                            <strong>100+</strong>
                            <span>Charging Stations</span>
                        </div>

                        <div>
                            <strong>500+</strong>
                            <span>Happy Users</span>
                        </div>

                        <div>
                            <strong>24/7</strong>
                            <span>Charging Access</span>
                        </div>

                    </div>

                </div>

                <div className="hero-visual">
                    <div className="hero-card">

                        <FiZap className="hero-card-icon" />

                        <h3>Ready to Charge?</h3>

                        <p>
                            Find a charging station near you.
                        </p>

                        <Link to="/stations">
                            Explore Stations
                            <FiArrowRight />
                        </Link>

                    </div>
                </div>

            </div>

        </section>
    );
}

export default Hero;