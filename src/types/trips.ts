export interface Trip {
  id: string;
  location: string;
  locationDescription: string;
  hotel: string;
  hotelDescription: string;
  countryCode: string;
  coverImage: string;
  imagesUrl: string[];
  price: number;
  recommended: boolean;
}

export interface SelectedTrip {
  trip: Trip;
  adultCount: number;
  childCount: number;
  travelerCount: number;
  dayCount: number;
  totalPrice: any;
  startDate: Date | null;
  endDate: Date | null;
}
