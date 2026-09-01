import { FiCheckCircle } from "react-icons/fi";
import "../../styles/whyChooseUs.css";

function WhyChooseUs() {

    const benefits = [
        "Real-time charger availability",
        "Simple and fast booking",
        "Multiple charging speeds",
        "Transparent pricing",
        "Secure user accounts",
        "Easy station discovery"
    ];

    return (
        <section className="why-choose-us">

            <div className="section-container why-container">

                <div className="why-content">

                    <span>WHY CHOOSE US</span>

                    <h2>
                        A smarter way to
                        <br />
                        charge your vehicle
                    </h2>

                    <p>
                        We make EV charging easier by bringing
                        stations, availability, and reservations
                        together in one platform.
                    </p>

                    <div className="benefits">

                        {benefits.map((benefit) => (

                            <div
                                className="benefit"
                                key={benefit}
                            >
                                <FiCheckCircle />
                                <span>{benefit}</span>
                            </div>

                        ))}

                    </div>

                </div>

                <div className="why-visual">

                    <div className="charging-circle">

                        <FiZap />

                        <strong>80%</strong>

                        <span>Battery</span>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default WhyChooseUs;