// export interface PlaceFormType {
//         title: string;
//         address: string;
//         description: string;
//         extraInfo: string;
//         maxGuests: number;
//         price: number;
//         latitude: number;
//         longitude: number;
// }

import { ProfilePhotoType } from "./file";
import { UserType } from "./user";

export interface PlaceType {
  title: string;
  address: string;
  description: string;
  extraInfo: string;
  maxGuests: number;
  price: number;
  perks: string[];
  photos: any;
  location: {
    type: string;
    coordinates: (string | number)[];
  };
}

export interface PlaceDataType {
  _id: string;
  title: string;
  address: string;
  description: string;
  extraInfo: string;
  maxGuests: number;
  price: number;
  perks: string[];
  photos: any;
  location: {
    type: string;
    coordinates: (string | number)[];
  };
  mainImage: ProfilePhotoType;
  favourites: string[];
  owner: UserType;
}

export type PlaceFormType = Pick<
  PlaceType,
  "title" | "address" | "description" | "extraInfo" | "maxGuests" | "price"
> & {
  longitude: number;
  latitude: number;
};

//  add longitude and latitude as number
