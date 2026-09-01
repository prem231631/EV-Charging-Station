import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import "../../styles/cta.css";

function CTA() {
    return (
        <section className="cta">

            <div className="cta-container">

                <div>

                    <span>READY TO GET STARTED?</span>

                    <h2>
                        Your next charge is
                        <br />
                        just a few clicks away.
                    </h2>

                </div>

                <Link
                    to="/register"
                    className="cta-button"
                >
                    Create Account
                    <FiArrowRight />
                </Link>

            </div>

        </section>
    );
}

export default CTA;