import { uploadFilesToServer, UploadType } from "./handleFiles";
import {
  UploadedPhotoTypes,
  ResponseFileUploadType,
  AlreadyUploadedPhotoType,
  LocalPhotoType,
} from "../types/file";

export type HandleFormImagesType = Partial<AlreadyUploadedPhotoType & LocalPhotoType>[];

export const handleFormImages = async (photos: HandleFormImagesType) => {
  const photosFromServer = photos.filter((val) => val.fromServer === true);

  const testPhotos: any = photos
    .filter((obj) => Object.prototype.hasOwnProperty.call(obj, "file"))
    .map((val) => val.file);

  let uploadedphotos: UploadedPhotoTypes[] = [];
  if (testPhotos.length !== 0) {
    const responseData: ResponseFileUploadType = await uploadFilesToServer(
      testPhotos,
      UploadType.place
    );

    uploadedphotos = [...responseData.uploadedImages];
  }
  const photosArray = [...photosFromServer, ...uploadedphotos];
  return photosArray;
};
