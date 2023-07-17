"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./Header.module.scss";

const Header = () => {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/">
          <Image
            src="/destyno.svg"
            alt="Logo do Destyno"
            width={250}
            height={50}
          />
        </Link>

        <Link
          className={`${styles.link} ${
            pathname === "/trips/checkout" ? styles.activeLink : ""
          }`}
          href="/trips/checkout"
        >
          Checkout
        </Link>
      </div>
    </header>
  );
};

export default Header;
