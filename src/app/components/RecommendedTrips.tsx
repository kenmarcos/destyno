import styles from "./RecommendedTrips.module.scss";

import TripItem from "./TripItem";

import trips from "utils/tripsData";

const RecommendedTrips = () => {
  return (
    <section className={styles.recommendedTrips}>
      <h2>Viagens mais recomendadas</h2>

      <div className={styles.gridTrips}>
        {trips
          .filter((trip) => trip.recommended)
          .map((trip) => (
            <TripItem key={trip.id} trip={trip} />
          ))}
      </div>
    </section>
  );
};

export default RecommendedTrips;
