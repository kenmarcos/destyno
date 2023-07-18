import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

import styles from "./TripItem.module.scss";

import { Trip } from "types/trips";
import { formatPrice } from "utils/formats";

interface TripItemProps {
  trip: Trip;
}

const TripItem = ({ trip }: TripItemProps) => {
  const { coverImage, location, countryCode, hotel, price } = trip;

  return (
    <div className={styles.tripItem}>
      <div className={styles.image}>
        <Image src={coverImage} alt={location} fill sizes="100%" />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.location}>
            <ReactCountryFlag countryCode={countryCode} />
            <h3>{location}</h3>
          </div>

          <div className={styles.hotel}>
            <HiOutlineBuildingOffice2 size={20} />
            <p>{hotel}</p>
          </div>
        </div>

        <div className={styles.price}>
          <p>Preço por pessoa</p>
          <p>{formatPrice(price)}</p>
        </div>
      </div>
    </div>
  );
};

export default TripItem;
