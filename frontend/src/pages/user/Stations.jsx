import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getStations } from "../../services/stationService";

import "../../styles/stations.css";


function Stations() {

    const navigate = useNavigate();

    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        async function loadStations() {

            try {

                const data = await getStations();

                setStations(data);

            } catch (err) {

                setError(err.message);

            } finally {

                setLoading(false);

            }
        }

        loadStations();

    }, []);


    return (

        <div className="stations-page">

            <header className="stations-header">

                <button
                    className="back-button"
                    onClick={() => navigate("/dashboard")}
                >
                    ← Dashboard
                </button>

                <div>
                    <span className="stations-label">
                        EV CHARGING NETWORK
                    </span>

                    <h1>
                        Charging Stations
                    </h1>

                    <p>
                        Find charging stations available
                        across Nepal.
                    </p>
                </div>

            </header>


            {loading && (

                <div className="stations-loading">
                    Loading charging stations...
                </div>

            )}


            {error && (

                <div className="stations-error">
                    {error}
                </div>

            )}


            {!loading && !error && (

                <div className="stations-grid">

                    {stations.map((station) => (

                        <div
                            className="station-card"
                            key={station.id}
                        >

                            <div className="station-card-top">

                                <div className="station-icon">
                                    ⚡
                                </div>

                                <span
                                    className={`station-status ${
                                        station.chargers?.length > 0
                                            ? "available"
                                            : "unavailable"
                                    }`}
                                >
                                    {station.chargers?.length > 0
                                        ? "Available"
                                        : "No Charger"}
                                </span>

                            </div>


                            <h2>
                                {station.name}
                            </h2>


                            <p className="station-location">
                                📍 {station.city || "Nepal"}
                                {station.province
                                    ? `, ${station.province}`
                                    : ""}
                            </p>


                            <div className="station-details">

                                <div>
                                    <span>
                                        Chargers
                                    </span>

                                    <strong>
                                        {station.chargers?.length || 0}
                                    </strong>
                                </div>


                                <div>
                                    <span>
                                        Points
                                    </span>

                                    <strong>
                                        {station.number_of_points || 0}
                                    </strong>
                                </div>


                                <div>
                                    <span>
                                        Power
                                    </span>

                                    <strong>
                                        {station.chargers?.[0]?.power_kw
                                            ? `${station.chargers[0].power_kw} kW`
                                            : "N/A"}
                                    </strong>
                                </div>

                            </div>


                            {station.usage_cost && (

                                <div className="station-price">
                                    💰 {station.usage_cost}
                                </div>

                            )}


                            <button className="station-button"
                                onClick={()=>navigate(`/stations/${station.id}`)}
                            >
                                View Station
                                <span>→</span>
                            </button>

                        </div>

                    ))}

                </div>

            )}


            {!loading &&
                !error &&
                stations.length === 0 && (

                    <div className="no-stations">
                        <div>⚡</div>

                        <h2>
                            No charging stations found
                        </h2>

                        <p>
                            There are currently no stations
                            available in the database.
                        </p>
                    </div>

                )}

        </div>

    );
}


export default Stations;