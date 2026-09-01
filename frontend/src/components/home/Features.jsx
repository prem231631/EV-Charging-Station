import {
    FiMap,
    FiClock,
    FiShield,
    FiCreditCard
} from "react-icons/fi";

import "../../styles/features.css";

function Features() {

    const features = [
        {
            icon: FiMap,
            title: "Find Nearby Stations",
            description:
                "Discover charging stations around your current location."
        },
        {
            icon: FiClock,
            title: "Easy Booking",
            description:
                "Reserve your charging slot before arriving at the station."
        },
        {
            icon: FiShield,
            title: "Reliable & Secure",
            description:
                "Your account and booking information are securely managed."
        },
        {
            icon: FiCreditCard,
            title: "Transparent Pricing",
            description:
                "Know the charging cost before you make your reservation."
        }
    ];

    return (
        <section
            id="features"
            className="features"
        >

            <div className="section-container">

                <div className="section-heading">

                    <span>FEATURES</span>

                    <h2>
                        Everything you need
                        <br />
                        to charge smarter
                    </h2>

                </div>

                <div className="features-grid">

                    {features.map((feature) => {

                        const Icon = feature.icon;

                        return (
                            <div
                                className="feature-card"
                                key={feature.title}
                            >

                                <div className="feature-icon">
                                    <Icon />
                                </div>

                                <h3>{feature.title}</h3>

                                <p>{feature.description}</p>

                            </div>
                        );

                    })}

                </div>

            </div>

        </section>
    );
}

export default Features;