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
