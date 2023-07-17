"use client";

import Link from "next/link";

import styles from "./RecommendedTrips.module.scss";

import TripItem from "./TripItem";

import { useTrip } from "providers/Trip";
import trips from "utils/tripsData";

const RecommendedTrips = () => {
  const { selectTrip } = useTrip();

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
