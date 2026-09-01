import {
    FiMapPin,
    FiCalendar,
    FiZap
} from "react-icons/fi";

import "../../styles/howItWorks.css";

function HowItWorks() {

    const steps = [
        {
            number: "01",
            icon: FiMapPin,
            title: "Find a Station",
            description:
                "Search for EV charging stations near your location."
        },
        {
            number: "02",
            icon: FiCalendar,
            title: "Book a Slot",
            description:
                "Choose an available charger and reserve your preferred time."
        },
        {
            number: "03",
            icon: FiZap,
            title: "Charge & Go",
            description:
                "Arrive at the station, charge your EV, and continue your journey."
        }
    ];

    return (
        <section
            id="how-it-works"
            className="how-it-works"
        >

            <div className="section-container">

                <div className="section-heading">
                    <span>HOW IT WORKS</span>

                    <h2>
                        Charging your EV
                        <br />
                        made simple
                    </h2>

                    <p>
                        From finding a station to charging your vehicle,
                        everything is designed to be simple.
                    </p>
                </div>

                <div className="steps">

                    {steps.map((step) => {

                        const Icon = step.icon;

                        return (
                            <div
                                className="step-card"
                                key={step.number}
                            >

                                <span className="step-number">
                                    {step.number}
                                </span>

                                <div className="step-icon">
                                    <Icon />
                                </div>

                                <h3>{step.title}</h3>

                                <p>{step.description}</p>

                            </div>
                        );

                    })}

                </div>

            </div>

        </section>
    );
}

export default HowItWorks;