"use client";

import Button from "components/Button";

import styles from "./TripCheckout.module.scss";
const TripCheckout = () => {
  return (
    <section className={styles.tripCheckout}>
      <h2>Detalhes da Viagem</h2>

      <Button type="submit" form="tripForm">
        Finalizar
      </Button>
    </section>
  );
};

export default TripCheckout;
