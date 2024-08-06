import { uploadFilesToServer } from "./handleFiles";

export const handleFormImages = async (photos) => {
  const photosFromServer = photos.filter((val) => val.fromServer === true);

  const testPhotos = photos.filter((obj) => Object.prototype.hasOwnProperty.call(obj, "file")).map((val) => val.file);

  let uploadedphotos = [];
  if (testPhotos.length !== 0) {
    const { uploadedImages } = await uploadFilesToServer(testPhotos, "place");
    uploadedphotos = [...uploadedImages];
  }

  const photosArray = [...photosFromServer, ...uploadedphotos];
  return photosArray;
};

