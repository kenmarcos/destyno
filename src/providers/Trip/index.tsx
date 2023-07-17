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
import { Trip } from "types/trips";
import trips from "utils/tripsData";

interface TripContextProps {
  children: ReactNode;
}

interface TripContextData {
  selectedTrip: Trip;
  selectTrip: (tripId: string) => void;

  adultCount: number;
  setAdultCount: Dispatch<SetStateAction<number>>;

  childCount: number;
  setChildCount: Dispatch<SetStateAction<number>>;

  dayCount: number;
  countTotalDays: (startDate: Date, endDate: Date) => void;

  totalPrice: number;
  calculateTotalPrice: (pricePerDay: number) => void;
}

export const TripContext = createContext<TripContextData>(
  {} as TripContextData
);

export const TripProvider = ({ children }: TripContextProps) => {
  const [selectedTrip, setSelectedTrip] = useState<Trip>({} as Trip);
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [dayCount, setDayCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const selectTrip = (tripId: string) => {
    const selectedTrip = trips.find((trip) => trip.id === tripId);

    if (!selectedTrip) {
      setSelectedTrip({} as Trip);
      return;
    }

    setSelectedTrip(selectedTrip);
  };

  const countTotalDays = useCallback((startDate: Date, endDate: Date) => {
    const days = differenceInDays(startDate, endDate);

    setDayCount(days);
  }, []);

  const calculateTotalPrice = useCallback(
    (price: number) => {
      setTotalPrice(price * dayCount * (adultCount + childCount / 2));
    },
    [adultCount, childCount, dayCount]
  );

  return (
    <TripContext.Provider
      value={{
        selectedTrip,
        selectTrip,
        adultCount,
        setAdultCount,
        childCount,
        setChildCount,
        dayCount,
        countTotalDays,
        totalPrice,
        calculateTotalPrice,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => useContext(TripContext);
