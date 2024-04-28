import { uploadFilesToServer } from "./handleFiles";

export const handleFormImages = async (photos) => {
  try {
    const photosFromServer = photos.filter((val) => val.fromServer === true);

    const testPhotos = photos.filter((obj) => obj.hasOwnProperty("file")).map((val) => val.file);

    let uploadedphotos = [];
    if (testPhotos.length !== 0) {
      const { uploadedImages } = await uploadFilesToServer(testPhotos, "place");
      uploadedphotos = [...uploadedImages];
    }

    const photosArray = [...photosFromServer, ...uploadedphotos];
    return photosArray;
  } catch (error) {
    throw error;
  }
};
