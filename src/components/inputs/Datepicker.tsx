"use client";

import { LegacyRef, forwardRef } from "react";
import DatePickerComponent, {
  ReactDatePicker,
  ReactDatePickerProps,
  registerLocale,
} from "react-datepicker";
import { StrictModifierNames } from "react-popper";

import styles from "./Datepicker.module.scss";

import ptBR from "date-fns/locale/pt-BR";

import "react-datepicker/dist/react-datepicker.css";

registerLocale("pt-BR", ptBR);

interface DatePickerProps extends ReactDatePickerProps {
  error?: boolean;
  errorMessage?: string;
}

const DatePicker = (
  {
    className = "",
    error = false,
    errorMessage = "",
    ...rest
  }: DatePickerProps,
  ref: LegacyRef<ReactDatePicker<StrictModifierNames, undefined>> | undefined
) => {
  return (
    <div className={styles.datepicker}>
      <DatePickerComponent
        {...rest}
        locale="pt-BR"
        dateFormat="dd/MM/yyyy"
        enableTabLoop={false}
        ref={ref}
        className={error ? styles.errorInput : styles.defaultInput}
      />

      {error && errorMessage && (
        <small className={styles.error}>{errorMessage}</small>
      )}
    </div>
  );
};

export default forwardRef(DatePicker);
