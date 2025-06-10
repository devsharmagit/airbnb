import toast from "react-hot-toast";
import { imagesUpload } from "../services/api/placeApi.ts";
import { ResponseFileUploadType } from "../types/file.ts"; // Import the defined interface

export enum UploadType {
  place = "place",
  user = "user",
}

export const uploadFilesToServer = async (filesArr: File[], type: UploadType) => {

  const data = new FormData();
  filesArr.forEach((file) => {
    if (file?.type?.includes("image")) {
      data.append("photos", file);
    } else {
      return toast.error("Please select Images only!");
    }
  });

  let destination = "place-image";
  if (type === UploadType.user) {
    destination = "user-image";
  }

  try {
    const response = await imagesUpload(destination, data);
    const responseData: ResponseFileUploadType = response.data;

    return responseData;
  } catch (error) {
    console.error("Error uploading images:", error);
    toast.error("Failed to upload images");
    throw error; // Return an empty array or handle as needed
  }
};
