import styles from "./Checkout.module.scss";

import TripCheckout from "./components/tripCheckout/TripCheckout";
import TripData from "./components/tripData/TripData";

const Checkout = () => {
  return (
    <main className={styles.checkout}>
      <h1>Checkout</h1>

      <div className={styles.content}>
        <TripData />

        <TripCheckout />
      </div>
    </main>
  );
};

export default Checkout;
