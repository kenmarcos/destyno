import Image from "next/image";
import Link from "next/link";

import styles from "./Header.module.scss";

const Header = () => {
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
      </div>
    </header>
  );
};

export default Header;
