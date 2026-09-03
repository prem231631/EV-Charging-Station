import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle,
} from "../../services/vehicleService";

import "../../styles/vehicles.css";


function Vehicles() {

    const navigate = useNavigate();

    const [vehicles, setVehicles] = useState([]);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [editingVehicle, setEditingVehicle] =
        useState(null);


    const [formData, setFormData] = useState({
        registration_number: "",
        brand: "",
        model: "",
        vehicle_type: "EV",
        battery_capacity: "",
    });


    /* =====================================================
       LOAD VEHICLES
    ===================================================== */

    async function loadVehicles() {

        try {

            setLoading(true);
            setError("");

            const data = await getVehicles();

            setVehicles(data);

        } catch (err) {

            console.error(err);

            if (
                err.message?.toLowerCase().includes("token") ||
                err.message?.toLowerCase().includes("authentication")
            ) {
                localStorage.removeItem("access_token");

                navigate("/login", {
                    replace: true,
                });

                return;
            }

            setError(err.message);

        } finally {

            setLoading(false);

        }
    }


    useEffect(() => {
        loadVehicles();
    }, []);


    /* =====================================================
       FORM CHANGE
    ===================================================== */

    function handleChange(event) {

        const {
            name,
            value,
        } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }


    /* =====================================================
       OPEN ADD FORM
    ===================================================== */

    function openAddForm() {

        setEditingVehicle(null);

        setFormData({
            registration_number: "",
            brand: "",
            model: "",
            vehicle_type: "EV",
            battery_capacity: "",
        });

        setError("");
        setSuccess("");

        setShowForm(true);
    }


    /* =====================================================
       OPEN EDIT FORM
    ===================================================== */

    function openEditForm(vehicle) {

        setEditingVehicle(vehicle);

        setFormData({
            registration_number:
                vehicle.registration_number || "",

            brand:
                vehicle.brand || "",

            model:
                vehicle.model || "",

            vehicle_type:
                vehicle.vehicle_type || "EV",

            battery_capacity:
                vehicle.battery_capacity ?? "",
        });

        setError("");
        setSuccess("");

        setShowForm(true);
    }


    /* =====================================================
       CLOSE FORM
    ===================================================== */

    function closeForm() {

        setShowForm(false);

        setEditingVehicle(null);

        setError("");
    }


    /* =====================================================
       SUBMIT
    ===================================================== */

    async function handleSubmit(event) {

        event.preventDefault();

        setError("");
        setSuccess("");
        setSaving(true);


        try {

            const payload = {
                registration_number:
                    formData.registration_number,

                brand:
                    formData.brand,

                model:
                    formData.model,

                vehicle_type:
                    formData.vehicle_type,

                battery_capacity:
                    formData.battery_capacity
                        ? Number(formData.battery_capacity)
                        : null,
            };


            if (editingVehicle) {

                const updatedVehicle =
                    await updateVehicle(
                        editingVehicle.id,
                        payload
                    );

                setVehicles((previous) =>
                    previous.map((vehicle) =>
                        vehicle.id === updatedVehicle.id
                            ? updatedVehicle
                            : vehicle
                    )
                );

                setSuccess(
                    "Vehicle updated successfully."
                );

            } else {

                const newVehicle =
                    await createVehicle(payload);

                setVehicles((previous) => [
                    newVehicle,
                    ...previous,
                ]);

                setSuccess(
                    "Vehicle added successfully."
                );
            }


            setFormData({
                registration_number: "",
                brand: "",
                model: "",
                vehicle_type: "EV",
                battery_capacity: "",
            });


            setEditingVehicle(null);

            setShowForm(false);

        } catch (err) {

            setError(err.message);

        } finally {

            setSaving(false);

        }
    }


    /* =====================================================
       DELETE
    ===================================================== */

    async function handleDelete(vehicleId) {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this vehicle?"
            );

        if (!confirmed) {
            return;
        }


        try {

            setError("");
            setSuccess("");

            await deleteVehicle(vehicleId);

            setVehicles((previous) =>
                previous.filter(
                    (vehicle) =>
                        vehicle.id !== vehicleId
                )
            );

            setSuccess(
                "Vehicle deleted successfully."
            );

        } catch (err) {

            setError(err.message);
        }
    }


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {

        return (
            <div className="vehicles-loading-page">

                <div className="vehicles-spinner"></div>

                <p>
                    Loading your vehicles...
                </p>

            </div>
        );
    }


    /* =====================================================
       PAGE
    ===================================================== */

    return (

        <div className="vehicles-page">

            <main className="vehicles-container">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="vehicles-header">

                    <div>

                        <button
                            className="vehicles-back"
                            onClick={() =>
                                navigate("/dashboard")
                            }
                            type="button"
                        >
                            ← Dashboard
                        </button>

                        <span>
                            YOUR GARAGE
                        </span>

                        <h1>
                            My Vehicles
                        </h1>

                        <p>
                            Manage your electric vehicles
                            and keep them ready for charging.
                        </p>

                    </div>


                    <button
                        className="add-vehicle-button"
                        onClick={openAddForm}
                        type="button"
                    >
                        + Add Vehicle
                    </button>

                </div>


                {/* =================================================
                    MESSAGES
                ================================================= */}

                {error && (
                    <div className="vehicles-error">
                        {error}
                    </div>
                )}


                {success && (
                    <div className="vehicles-success">
                        {success}
                    </div>
                )}


                {/* =================================================
                    FORM
                ================================================= */}

                {showForm && (

                    <section className="vehicle-form-card">

                        <div className="vehicle-form-header">

                            <div>

                                <span>
                                    {editingVehicle
                                        ? "EDIT VEHICLE"
                                        : "NEW VEHICLE"}
                                </span>

                                <h2>
                                    {editingVehicle
                                        ? "Update vehicle"
                                        : "Add a vehicle"}
                                </h2>

                            </div>

                            <button
                                className="close-form-button"
                                onClick={closeForm}
                                type="button"
                            >
                                ×
                            </button>

                        </div>


                        <form
                            onSubmit={handleSubmit}
                            className="vehicle-form"
                        >

                            <div className="vehicle-form-grid">

                                <div className="vehicle-form-group">

                                    <label>
                                        Registration Number
                                    </label>

                                    <input
                                        name="registration_number"
                                        value={
                                            formData.registration_number
                                        }
                                        onChange={handleChange}
                                        placeholder="BA 01 PA 1234"
                                        required
                                    />

                                </div>


                                <div className="vehicle-form-group">

                                    <label>
                                        Brand
                                    </label>

                                    <input
                                        name="brand"
                                        value={
                                            formData.brand
                                        }
                                        onChange={handleChange}
                                        placeholder="Tesla"
                                        required
                                    />

                                </div>


                                <div className="vehicle-form-group">

                                    <label>
                                        Model
                                    </label>

                                    <input
                                        name="model"
                                        value={
                                            formData.model
                                        }
                                        onChange={handleChange}
                                        placeholder="Model 3"
                                        required
                                    />

                                </div>


                                <div className="vehicle-form-group">

                                    <label>
                                        Vehicle Type
                                    </label>

                                    <select
                                        name="vehicle_type"
                                        value={
                                            formData.vehicle_type
                                        }
                                        onChange={handleChange}
                                    >
                                        <option value="EV">
                                            Electric Vehicle
                                        </option>

                                        <option value="PHEV">
                                            Plug-in Hybrid
                                        </option>

                                    </select>

                                </div>


                                <div className="vehicle-form-group">

                                    <label>
                                        Battery Capacity
                                        <span>
                                            (kWh)
                                        </span>
                                    </label>

                                    <input
                                        name="battery_capacity"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        value={
                                            formData.battery_capacity
                                        }
                                        onChange={handleChange}
                                        placeholder="60"
                                    />

                                </div>

                            </div>


                            <div className="vehicle-form-actions">

                                <button
                                    type="button"
                                    className="vehicle-cancel-button"
                                    onClick={closeForm}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="vehicle-save-button"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingVehicle
                                            ? "Update Vehicle"
                                            : "Add Vehicle"}
                                </button>

                            </div>

                        </form>

                    </section>
                )}


                {/* =================================================
                    VEHICLE LIST
                ================================================= */}

                {vehicles.length === 0 ? (

                    <section className="vehicles-empty">

                        <div className="vehicles-empty-icon">
                            🚗
                        </div>

                        <h2>
                            No vehicles yet
                        </h2>

                        <p>
                            Add your first electric vehicle
                            to make charging bookings faster.
                        </p>

                        <button
                            onClick={openAddForm}
                            type="button"
                        >
                            + Add Your Vehicle
                        </button>

                    </section>

                ) : (

                    <section className="vehicles-grid">

                        {vehicles.map((vehicle) => (

                            <article
                                className="vehicle-card"
                                key={vehicle.id}
                            >

                                <div className="vehicle-card-top">

                                    <div className="vehicle-card-icon">
                                        🚗
                                    </div>

                                    <span className="vehicle-type">
                                        {vehicle.vehicle_type}
                                    </span>

                                </div>


                                <div className="vehicle-card-info">

                                    <span>
                                        {vehicle.brand}
                                    </span>

                                    <h2>
                                        {vehicle.model}
                                    </h2>

                                    <div className="vehicle-registration">
                                        {vehicle.registration_number}
                                    </div>

                                </div>


                                <div className="vehicle-card-details">

                                    <div>

                                        <span>
                                            BATTERY
                                        </span>

                                        <strong>
                                            {vehicle.battery_capacity
                                                ? `${vehicle.battery_capacity} kWh`
                                                : "Not specified"}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            TYPE
                                        </span>

                                        <strong>
                                            {vehicle.vehicle_type}
                                        </strong>

                                    </div>

                                </div>


                                <div className="vehicle-card-actions">

                                    <button
                                        onClick={() =>
                                            openEditForm(
                                                vehicle
                                            )
                                        }
                                        type="button"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-vehicle-button"
                                        onClick={() =>
                                            handleDelete(
                                                vehicle.id
                                            )
                                        }
                                        type="button"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </article>

                        ))}

                    </section>
                )}

            </main>

        </div>
    );
}


export default Vehicles;