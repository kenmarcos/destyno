"use client";

import Image from "next/image";

import Button from "components/Button";

import styles from "./TripCheckout.module.scss";

import { useTrip } from "providers/Trip";
import { formatPrice } from "utils/formats";
const TripCheckout = () => {
  const { selectedTrip, adultCount, childCount, dayCount, totalPrice } =
    useTrip();

  return (
    <section className={styles.tripCheckout}>
      <div className={styles.tripDetails}>
        <h2 className={styles.title}>Detalhes da Viagem</h2>

        {selectedTrip?.coverImage && (
          <div className={styles.image}>
            <Image
              src={selectedTrip.coverImage}
              alt={selectedTrip.location}
              fill
              sizes="100%"
            />
          </div>
        )}

        <div className={styles.tripInfo}>
          {Object.keys(selectedTrip).length > 0 && (
            <>
              <div className={styles.tripTitle}>
                <p className={styles.location}>{selectedTrip.location}</p>
                <p className={styles.price}>
                  ({formatPrice(selectedTrip.price)})
                </p>
              </div>

              <p className={styles.description}>
                {selectedTrip.locationDescription}
              </p>
            </>
          )}

          <div className={styles.travelers}>
            <p>Total de passageiros:</p>
            <p>
              {adultCount + childCount}
              {adultCount + childCount > 0 && (
                <span>
                  {" "}
                  ({adultCount} adultos + {childCount} crianças)
                </span>
              )}
            </p>
          </div>

          <div className={styles.days}>
            <p>Total de dias:</p>
            <p>{dayCount}</p>
          </div>

          <div className={styles.totalPrice}>
            <p>Total a pagar:</p>
            <p>{formatPrice(totalPrice)}</p>
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
