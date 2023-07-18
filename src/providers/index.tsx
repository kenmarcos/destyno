"use client";

import { ReactNode } from "react";

import { SelectedTripProvider } from "./SelectedTrip";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return <SelectedTripProvider>{children}</SelectedTripProvider>;
};

export default Providers;
