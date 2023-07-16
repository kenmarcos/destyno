"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Input from "components/inputs/Input";

import styles from "./TripData.module.scss";

import { yupResolver } from "@hookform/resolvers/yup";
import { cpfMask, mobilePhoneMask } from "utils/formMasks";
import * as yup from "yup";

const tripSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório").trim(),
  email: yup
    .string()
    .email("E-mail inválido")
    .required("E-mail é obrigatório")
    .trim(),
  cpf: yup.string().required("CPF é obrigatório"),
  mobilePhone: yup.string().required("Celular é obrigatório"),
});

type tripFormData = yup.InferType<typeof tripSchema>;

const TripData = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(tripSchema),
  });
  const handleOnSubmit = (data: tripFormData) => {
    console.log(data);
  };

  return (
    <section className={styles.tripData}>
      <form
        id="tripForm"
        className={styles.form}
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div className={styles.personalInfo}>
          <h2>Dados Pessoais</h2>

          <div className={styles.formGroup}>
            <label>
              Nome:
              <Input
                {...register("name")}
                error={!!errors.name}
                errorMessage={errors.name?.message}
                placeholder="Nome do passageiro principal"
                type="text"
              />
            </label>

            <label>
              E-mail:
              <Input
                {...register("email")}
                error={!!errors.email}
                errorMessage={errors.email?.message}
                placeholder="nome@mail.com"
                type="email"
              />
            </label>
          </div>

          <div className={styles.formGroup}>
            <label>
              CPF:
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
            </label>

            <label>
              Celular:
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
            </label>
          </div>
        </div>

        <div className={styles.tripInfo}>
          <h2>Dados da Viagem</h2>

          <div className={styles.formGroup}>
            <label>
              Origem:
              <Input placeholder="Local de origem" type="text" />
            </label>

            <label>
              Destino:
              <Input placeholder="Local de destino" type="text" />
            </label>
          </div>

          <div className={styles.formGroup}>
            <label>
              Quantidade de passageiros adultos:
              <Input placeholder="XX" type="number" />
            </label>

            <label>
              Quantidade de passageiros crianças:
              <Input placeholder="XX" type="number" />
            </label>
          </div>

          <div className={styles.formGroup}>
            <label>
              Data de ida:
              <Input placeholder="XX/XX/XXXX" type="date" />
            </label>

            <label>
              Data de volta:
              <Input placeholder="XX/XX/XXXX" type="date" />
            </label>
          </div>
        </div>
      </form>
    </section>
  );
};

export default TripData;
