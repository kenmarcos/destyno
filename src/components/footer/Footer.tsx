import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>Todos os direitos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;
