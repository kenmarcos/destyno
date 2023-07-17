"use client";

import { ReactNode } from "react";

import { TripProvider } from "./Trip";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return <TripProvider>{children}</TripProvider>;
};

export default Providers;
