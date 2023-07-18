"use client";

import Link from "next/link";

import styles from "./RecommendedTrips.module.scss";

import TripItem from "./components/tripItem/TripItem";

import { useSelectedTrip } from "providers/SelectedTrip";
import trips from "utils/tripsData";

const RecommendedTrips = () => {
  const { selectTrip } = useSelectedTrip();

  return (
    <section id="recommendedTrips" className={styles.recommendedTrips}>
      <h2>Viagens mais recomendadas</h2>

      <div className={styles.gridTrips}>
        {trips
          .filter((trip) => trip.recommended)
          .map((trip) => (
            <Link
              key={trip.id}
              href={"/trips/checkout"}
              onClick={() => selectTrip(trip.id)}
            >
              <TripItem trip={trip} />
            </Link>
          ))}
      </div>
    </section>
  );
};

export default RecommendedTrips;
