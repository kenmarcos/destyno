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
    .required("Campo obrigatório"),
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
  const handleOnSubmit = (data: tripFormData) => {
    setSelectedTrip(initialSelectedTrip);
    reset();
    router.push("/trips/confirmation");
  };

  return {
    register,
    handleSubmit,
    watch,
    control,
    errors,
    handleOnSubmit,
  };
};
