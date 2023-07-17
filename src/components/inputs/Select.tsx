import { ComponentPropsWithoutRef, LegacyRef, forwardRef } from "react";

import styles from "./Select.module.scss";

interface SelectProps extends ComponentPropsWithoutRef<"select"> {
  error?: boolean;
  errorMessage?: string;
  options: { value: string; label: string }[];
}

const Select = (
  {
    className = "",
    error = false,
    errorMessage = "",
    options,
    ...rest
  }: SelectProps,
  ref: LegacyRef<HTMLSelectElement> | undefined
) => {
  return (
    <div className={styles.select}>
      <select
        {...rest}
        ref={ref}
        defaultValue=""
        className={error ? styles.errorSelect : styles.defaultSelect}
      >
        <option disabled className={styles.firstOption} value="">
          Selecione
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && errorMessage && (
        <small className={styles.error}>{errorMessage}</small>
      )}
    </div>
  );
};

export default forwardRef(Select);
