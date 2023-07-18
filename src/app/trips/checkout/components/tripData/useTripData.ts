"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { initialSelectedTrip, useSelectedTrip } from "providers/SelectedTrip";
import * as yup from "yup";

const tripSchema = yup.object().shape({
  name: yup.string().required("Campo obrigatório").trim(),
  email: yup
    .string()
    .email("E-mail inválido")
    .required("Campo obrigatório")
    .trim(),
  cpf: yup.string().required("Campo obrigatório").trim(),
  mobilePhone: yup.string().required("Campo obrigatório").trim(),
  origin: yup.string().required("Campo obrigatório").trim(),
  destination: yup
    .string()
    .test("destinationValidator", "Selecione um destino válido", (value) => {
      return value !== "";
    }),
  adults: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Campo obrigatório")
    .min(1, "Quantidade de adultos inválida"),
  children: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Campo obrigatório"),
  startDate: yup
    .date()
    .nullable()
    .test("startDateRequired", "Campo obrigatório", (value) => {
      return !!value;
    }),
  endDate: yup
    .date()
    .nullable()
    .test("endDateRequired", "Campo obrigatório", (value) => {
      return !!value;
    }),
});

type tripFormData = yup.InferType<typeof tripSchema>;

export const useTripData = () => {
  const { selectedTrip, setSelectedTrip } = useSelectedTrip();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(tripSchema),
    defaultValues: {
      origin: "",
      destination: selectedTrip.trip?.id ?? "",
      adults: 0,
      children: 0,
      startDate: null,
      endDate: null,
      name: "",
      email: "",
      cpf: "",
      mobilePhone: "",
    },
  });

  const adults = Number(watch("adults"));
  const children = Number(watch("children"));

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const handleOnSubmit = (data: tripFormData) => {
    setTimeout(() => {
      setSelectedTrip(initialSelectedTrip);
      reset();
    }, 2000);

    router.push("/trips/confirmation");
  };

  return {
    register,
    handleSubmit,
    control,
    errors,
    handleOnSubmit,
    adults,
    children,
    startDate,
    endDate,
  };
};
