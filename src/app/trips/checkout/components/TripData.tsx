"use client";

import { useEffect } from "react";
import { Controller } from "react-hook-form";

import Datepicker from "components/inputs/Datepicker";
import Input from "components/inputs/Input";
import Select from "components/inputs/Select";

import styles from "./TripData.module.scss";

import { addDays } from "date-fns";
import { useTripData } from "hooks/useTripData";
import { useSelectedTrip } from "providers/SelectedTrip";
import { cpfMask, mobilePhoneMask } from "utils/formMasks";
import trips from "utils/tripsData";

const TripData = () => {
  const { register, handleSubmit, handleOnSubmit, watch, errors, control } =
    useTripData();

  const {
    selectedTrip,
    selectTrip,
    countTotalTravelers,
    countTotalDays,
    calculateTotalPrice,
  } = useSelectedTrip();

  const adults = Number(watch("adults"));
  const children = Number(watch("children"));

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  useEffect(() => {
    countTotalTravelers(adults, children);

    if (startDate && endDate) {
      countTotalDays(endDate, startDate);
    }

    if (adults && children && startDate && endDate) {
      calculateTotalPrice(selectedTrip.trip?.price);
    }
  }, [
    adults,
    children,
    countTotalTravelers,
    startDate,
    endDate,
    countTotalDays,
    selectedTrip.trip?.price,
    calculateTotalPrice,
  ]);

  return (
    <>
      {console.log("render")}
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
                    defaultValue={selectedTrip.trip?.id ?? ""}
                    onChange={(event) => selectTrip(event.target.value)}
                  />
                </div>
              </div>

              {Object.keys(selectedTrip.trip).length > 0 &&
                selectedTrip?.trip && (
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
                              minDate={new Date()}
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
                              disabled={!startDate}
                              minDate={addDays(startDate as Date, 1)}
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
    </>
  );
};

export default TripData;
