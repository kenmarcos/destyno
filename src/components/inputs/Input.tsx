import { ComponentPropsWithoutRef, LegacyRef, forwardRef } from "react";

import styles from "./Input.module.scss";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  error?: boolean;
  errorMessage?: string;
}

const Input = (
  { className = "", error = false, errorMessage = "", ...rest }: InputProps,
  ref: LegacyRef<HTMLInputElement> | undefined
) => {
  return (
    <div className={styles.input}>
      <input
        {...rest}
        ref={ref}
        className={error ? styles.errorInput : styles.defaultInput}
      />

      {error && errorMessage && (
        <small className={styles.error}>{errorMessage}</small>
      )}
    </div>
  );
};

export default forwardRef(Input);
