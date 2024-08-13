export interface LocalPhotoType {
  file: File;
  url: string;
}

export interface ProfilePhotoType {
  _id: string;
  publicId: string;
  url: string;
}
export type UploadedPhotoTypes = Pick<ProfilePhotoType, "publicId" | "url">;

export interface AlreadyUploadedPhotoType extends ProfilePhotoType {
  fromServer: boolean;
  id: string;
}
export type ResponseFileUploadType = {
  uploadedImages: UploadedPhotoTypes[];
};
