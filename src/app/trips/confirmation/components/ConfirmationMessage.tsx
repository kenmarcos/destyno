"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Countdown from "react-countdown";
import { HiOutlineCheckBadge } from "react-icons/hi2";

import styles from "./ConfirmationMessage.module.scss";
const ConfirmationMessage = () => {
  const router = useRouter();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     router.push("/");
  //   }, 10000);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);

  return (
    <section className={styles.confirmationMessage}>
      <h1 className={styles.title}>Muito obrigado!!!</h1>

      <HiOutlineCheckBadge size={220} className={styles.icon} />

      <h2 className={styles.confirmation}>
        Sua viagem foi confirmada com sucesso!
      </h2>

      <p className={styles.countdown}>
        Você será redirecionado para a página inicial em{" "}
        <Countdown
          date={Date.now() + 10000}
          renderer={({ seconds }) => <span>{seconds}</span>}
        />{" "}
        segundos
      </p>
    </section>
  );
};

export default ConfirmationMessage;
