import { FiMapPin, FiZap, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import "../../styles/popularStations.css";

function PopularStations() {

    const stations = [
        {
            id: 1,
            name: "Kathmandu EV Hub",
            location: "New Baneshwor, Kathmandu",
            chargers: 8,
            power: "60 kW"
        },
        {
            id: 2,
            name: "Lalitpur Charging Point",
            location: "Jawalakhel, Lalitpur",
            chargers: 6,
            power: "50 kW"
        },
        {
            id: 3,
            name: "Bhaktapur EV Station",
            location: "Suryabinayak, Bhaktapur",
            chargers: 4,
            power: "40 kW"
        }
    ];

    return (
        <section className="popular-stations">

            <div className="section-container">

                <div className="section-heading station-heading">

                    <div>
                        <span>CHARGING STATIONS</span>

                        <h2>
                            Popular charging stations
                        </h2>
                    </div>

                    <Link to="/stations">
                        View All
                        <FiArrowRight />
                    </Link>

                </div>

                <div className="stations-grid">

                    {stations.map((station) => (

                        <div
                            className="station-card"
                            key={station.id}
                        >

                            <div className="station-image">
                                <FiZap />
                            </div>

                            <div className="station-content">

                                <h3>{station.name}</h3>

                                <p className="station-location">
                                    <FiMapPin />
                                    {station.location}
                                </p>

                                <div className="station-info">

                                    <span>
                                        {station.chargers} Chargers
                                    </span>

                                    <span>
                                        Up to {station.power}
                                    </span>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default PopularStations;