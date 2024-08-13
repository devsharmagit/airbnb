import { PlaceDataType } from "./place";

export interface BookingType {
  _id: string;
  user: string;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
  createdAt: Date;
  active: boolean;
  place: PlaceDataType;
}
