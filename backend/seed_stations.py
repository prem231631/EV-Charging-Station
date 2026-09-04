from app.database import SessionLocal
from app.models.station import Station
from app.models.charger import Charger


def seed_stations():
    db = SessionLocal()

    try:
        # Don't insert duplicates
        existing = db.query(Station).count()

        if existing > 0:
            print(f"Stations already exist: {existing}")
            return

        # ==========================================
        # STATION 1 — BYD Park
        # ==========================================

        station1 = Station(
            external_id=100001,
            uuid="ev-nepal-byd-park",
            name="BYD Park",
            operator_name="BYD Nepal",
            address_line1="Kathmandu",
            city="Kathmandu",
            province="Bagmati",
            postcode=None,
            country="Nepal",
            latitude=27.7172,
            longitude=85.3240,
            contact_telephone=None,
            access_comments="Available for EV charging",
            general_comments="EV charging station in Kathmandu",
            usage_type_id=None,
            usage_cost=None,
            number_of_points=1,
            status_type_id=None,
            is_recently_verified=True,
            data_quality_level=1,
        )

        db.add(station1)
        db.flush()

        charger1 = Charger(
            station_id=station1.id,
            external_id=200001,
            connection_type_id=None,
            status_type_id=None,
            level_id=None,
            current_type_id=None,
            amps=None,
            voltage=None,
            power_kw=7.0,
            quantity=1,
            comments="EV charging point",
        )

        db.add(charger1)

        # ==========================================
        # STATION 2 — Mitra Marg
        # ==========================================

        station2 = Station(
            external_id=100002,
            uuid="ev-nepal-mitra-marg",
            name="mitra marg",
            operator_name=None,
            address_line1="Mitra Marg",
            city="Biratnagar",
            province="Koshi",
            postcode=None,
            country="Nepal",
            latitude=26.4525,
            longitude=87.2718,
            contact_telephone=None,
            access_comments="Available for EV charging",
            general_comments="EV charging station in Biratnagar",
            usage_type_id=None,
            usage_cost=None,
            number_of_points=1,
            status_type_id=None,
            is_recently_verified=True,
            data_quality_level=1,
        )

        db.add(station2)
        db.flush()

        charger2 = Charger(
            station_id=station2.id,
            external_id=200002,
            connection_type_id=None,
            status_type_id=None,
            level_id=None,
            current_type_id=None,
            amps=None,
            voltage=None,
            power_kw=7.0,
            quantity=1,
            comments="EV charging point",
        )

        db.add(charger2)

        # ==========================================
        # SAVE
        # ==========================================

        db.commit()

        print("✅ Stations seeded successfully!")
        print(f"   Station 1: {station1.name}")
        print(f"   Station 2: {station2.name}")

    except Exception as error:
        db.rollback()
        print("❌ Error while seeding stations:")
        print(error)

    finally:
        db.close()


if __name__ == "__main__":
    seed_stations()