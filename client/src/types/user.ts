import { ProfilePhotoType } from "./file";

export interface UserType {
  email: string;
  name: string;
  _id: string;
  profilePhoto: ProfilePhotoType;
}
