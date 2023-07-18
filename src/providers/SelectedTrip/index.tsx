import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";

import { differenceInDays } from "date-fns";
import { SelectedTrip, Trip } from "types/trips";
import trips from "utils/tripsData";

interface SelectedTripContextProps {
  children: ReactNode;
}

interface SelectedTripContextData {
  selectedTrip: SelectedTrip;
  setSelectedTrip: Dispatch<SetStateAction<SelectedTrip>>;
  selectTrip: (tripId: string) => void;
  countTotalTravelers: (adults: number, children: number) => void;
  countTotalDays: (startDate: Date, endDate: Date) => void;
  calculateTotalPrice: (pricePerDay: number) => void;
}

export const SelectedTripContext = createContext<SelectedTripContextData>(
  {} as SelectedTripContextData
);

export const initialSelectedTrip: SelectedTrip = {
  trip: {} as Trip,
  adultCount: 0,
  childCount: 0,
  travelerCount: 0,
  dayCount: 0,
  totalPrice: 0,
  startDate: null,
  endDate: null,
};

export const SelectedTripProvider = ({
  children,
}: SelectedTripContextProps) => {
  const [selectedTrip, setSelectedTrip] =
    useState<SelectedTrip>(initialSelectedTrip);

  const selectTrip = (tripId: string) => {
    const trip = trips.find((trip) => trip.id === tripId);

    if (!trip) {
      setSelectedTrip((currentState) => {
        return {
          ...currentState,
          trip: {} as Trip,
        };
      });
      return;
    }

    setSelectedTrip((currentState) => {
      return {
        ...currentState,
        trip,
      };
    });
  };

  const countTotalTravelers = useCallback(
    (adults: number, children: number) => {
      const total = adults + children;

      setSelectedTrip((currentState) => {
        return {
          ...currentState,
          adultCount: adults,
          childCount: children,
          travelerCount: total,
        };
      });
    },
    []
  );

  const countTotalDays = useCallback((startDate: Date, endDate: Date) => {
    const days = differenceInDays(startDate, endDate);

    setSelectedTrip((currentState) => {
      return {
        ...currentState,
        dayCount: days,
        startDate,
        endDate,
      };
    });
  }, []);

  const calculateTotalPrice = useCallback(() => {
    const totalPrice =
      selectedTrip.trip?.price *
      selectedTrip.dayCount *
      (selectedTrip.adultCount + selectedTrip.childCount / 2);

    setSelectedTrip((currentState) => {
      return {
        ...currentState,
        totalPrice,
      };
    });
  }, [
    selectedTrip.adultCount,
    selectedTrip.childCount,
    selectedTrip.dayCount,
    selectedTrip.trip?.price,
  ]);

  return (
    <SelectedTripContext.Provider
      value={{
        selectedTrip,
        setSelectedTrip,
        selectTrip,
        countTotalTravelers,
        countTotalDays,
        calculateTotalPrice,
      }}
    >
      {children}
    </SelectedTripContext.Provider>
  );
};

export const useSelectedTrip = () => useContext(SelectedTripContext);
