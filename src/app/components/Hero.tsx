import Button from "components/Button";

import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1>
          Descubra e se conecte aos lugares
          <span> mais incríveis</span> do mundo!
        </h1>

        <p>
          Confira nossos melhores destinos para você viajar com segurança e
          tranquilidade
        </p>

        <Button>Veja os destinos</Button>
      </div>
    </section>
  );
};

export default Hero;
