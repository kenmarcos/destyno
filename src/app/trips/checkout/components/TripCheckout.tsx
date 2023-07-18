"use client";

import Image from "next/image";

import Button from "components/Button";

import styles from "./TripCheckout.module.scss";

import { useSelectedTrip } from "providers/SelectedTrip";
import { formatPrice } from "utils/formats";
const TripCheckout = () => {
  const { selectedTrip } = useSelectedTrip();

  return (
    <section className={styles.tripCheckout}>
      <div className={styles.tripDetails}>
        <h2 className={styles.title}>Detalhes da Viagem</h2>

        {Object.keys(selectedTrip.trip).length > 0 && selectedTrip?.trip && (
          <div className={styles.image}>
            <Image
              src={selectedTrip.trip.coverImage}
              alt={selectedTrip.trip.location}
              fill
              sizes="100%"
            />
          </div>
        )}

        <div className={styles.tripInfo}>
          {Object.keys(selectedTrip.trip).length > 0 && selectedTrip?.trip && (
            <div className={styles.tripTitle}>
              <p className={styles.location}>{selectedTrip.trip.location}</p>
              <p className={styles.price}>
                ({formatPrice(selectedTrip.trip.price)})
              </p>
            </div>
          )}

          <p className={styles.description}>
            {selectedTrip.trip.locationDescription}
          </p>

          <div className={styles.travelers}>
            <p>Total de passageiros:</p>
            <p>
              {selectedTrip.travelerCount}
              {selectedTrip.travelerCount > 0 && (
                <span>
                  {" "}
                  ({selectedTrip.adultCount} adultos + {selectedTrip.childCount}{" "}
                  crianças)
                </span>
              )}
            </p>
          </div>

          <div className={styles.days}>
            <p>Total de dias:</p>
            <p>{selectedTrip.dayCount}</p>
          </div>

          <div className={styles.totalPrice}>
            <p>Total a pagar:</p>
            <p>{formatPrice(selectedTrip.totalPrice)}</p>
          </div>

          <Button size="small" type="submit" form="tripForm">
            Finalizar
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TripCheckout;
