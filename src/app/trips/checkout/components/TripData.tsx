"use client";

import { useEffect } from "react";
import { Controller } from "react-hook-form";

import Datepicker from "components/inputs/Datepicker";
import Input from "components/inputs/Input";
import Select from "components/inputs/Select";

import styles from "./TripData.module.scss";

import { useTripData } from "hooks/useTripData";
import { useTrip } from "providers/Trip";
import { cpfMask, mobilePhoneMask } from "utils/formMasks";
import trips from "utils/tripsData";

const TripData = () => {
  const { register, handleSubmit, handleOnSubmit, watch, errors, control } =
    useTripData();

  const {
    selectedTrip,
    selectTrip,
    setAdultCount,
    setChildCount,
    countTotalDays,
    calculateTotalPrice,
  } = useTrip();

  const adults = watch("adults");
  const children = watch("children");

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  useEffect(() => {
    if (adults !== undefined && children !== undefined) {
      setAdultCount(Number(adults));
      setChildCount(Number(children));
    }

    if (startDate && endDate) {
      countTotalDays(endDate, startDate);
    }

    if (selectedTrip.price && startDate && endDate) {
      calculateTotalPrice(selectedTrip.price);
    }
  }, [
    adults,
    children,
    startDate,
    endDate,
    selectedTrip.price,
    setAdultCount,
    setChildCount,
    countTotalDays,
    calculateTotalPrice,
  ]);

  return (
    <section className={styles.tripData}>
      <form
        id="tripForm"
        className={styles.form}
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div className={styles.tripInfo}>
          <h2>Dados da Viagem</h2>

          <div className={styles.formFields}>
            <div className={styles.fieldsGroup}>
              <div className={styles.field}>
                <label>Origem:</label>
                <Input
                  {...register("origin")}
                  error={!!errors.origin}
                  errorMessage={errors.origin?.message}
                  placeholder="Local de origem"
                  type="text"
                />
              </div>

              <div className={styles.field}>
                <label>Destino:</label>
                <Select
                  {...register("destination")}
                  error={!!errors.destination}
                  errorMessage={errors.destination?.message}
                  options={trips.map((trip) => ({
                    value: trip.id,
                    label: trip.location,
                  }))}
                  defaultValue={selectedTrip.id ?? "selecione"}
                  onChange={(event) => selectTrip(event.target.value)}
                />
              </div>
            </div>

            {Object.keys(selectedTrip).length > 0 && selectedTrip && (
              <>
                <div className={styles.fieldsGroup}>
                  <div className={styles.field}>
                    <label>Quantidade de adultos:</label>
                    <Input
                      {...register("adults")}
                      error={!!errors.adults}
                      errorMessage={errors.adults?.message}
                      placeholder="XX"
                      type="number"
                    />
                  </div>

                  <div className={styles.field}>
                    <label>
                      Quantidade de crianças:{" "}
                      <small>(pagam metade do valor)</small>
                    </label>
                    <Input
                      {...register("children")}
                      error={!!errors.children}
                      errorMessage={errors.children?.message}
                      placeholder="XX"
                      type="number"
                    />
                  </div>
                </div>

                <div className={styles.fieldsGroup}>
                  <div className={styles.field}>
                    <label>Data de ida:</label>
                    <Controller
                      name="startDate"
                      control={control}
                      render={({ field }) => (
                        <Datepicker
                          onChange={field.onChange}
                          placeholderText="dd/mm/aaaa"
                          selected={field.value}
                          showYearDropdown
                          error={!!errors.startDate}
                          errorMessage={errors.startDate?.message}
                        />
                      )}
                    />
                  </div>

                  <div className={styles.field}>
                    <label>Data de volta:</label>
                    <Controller
                      name="endDate"
                      control={control}
                      render={({ field }) => (
                        <Datepicker
                          onChange={field.onChange}
                          placeholderText="dd/mm/aaaa"
                          selected={field.value}
                          showYearDropdown
                          error={!!errors.endDate}
                          errorMessage={errors.endDate?.message}
                        />
                      )}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.personalInfo}>
          <h2>Dados Pessoais</h2>

          <div className={styles.formFields}>
            <div className={styles.fieldsGroup}>
              <div className={styles.field}>
                <label>Nome:</label>
                <Input
                  {...register("name")}
                  error={!!errors.name}
                  errorMessage={errors.name?.message}
                  placeholder="Nome do passageiro principal"
                  type="text"
                />
              </div>

              <div className={styles.field}>
                <label>E-mail:</label>
                <Input
                  {...register("email")}
                  error={!!errors.email}
                  errorMessage={errors.email?.message}
                  placeholder="nome@mail.com"
                  type="email"
                />
              </div>
            </div>

            <div className={styles.fieldsGroup}>
              <div className={styles.field}>
                <label>CPF:</label>
                <Input
                  {...register("cpf")}
                  onChange={(event) => {
                    event.target.value = cpfMask(event.target.value);
                  }}
                  error={!!errors.cpf}
                  errorMessage={errors.cpf?.message}
                  placeholder="XXX.XXX.XXX-XX"
                  type="text"
                />
              </div>

              <div className={styles.field}>
                <label>Celular:</label>
                <Input
                  {...register("mobilePhone")}
                  onChange={(event) => {
                    event.target.value = mobilePhoneMask(event.target.value);
                  }}
                  error={!!errors.mobilePhone}
                  errorMessage={errors.mobilePhone?.message}
                  placeholder="(XX) XXXXX-XXXX"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default TripData;
