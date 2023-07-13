import { ComponentPropsWithoutRef } from "react";

import styles from "./Button.module.scss";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "outlined";
  size?: "small" | "medium" | "large";
}

const Button = ({
  children,
  variant = "primary",
  size = "large",
  ...rest
}: ButtonProps) => {
  return (
    <button {...rest} className={`${styles[variant]} ${styles[size]}`}>
      {children}
    </button>
  );
};

export default Button;
