import axios from "axios";
import toast from "react-hot-toast";
import { imagesUpload } from "../services/api/placeApi";

export const uploadFilesToServer = async (filesArr, type) => {
  const data = new FormData();
  filesArr.forEach((file) => {
    if (file?.type?.includes("image")) {
      data.append("photos", file);
    } else {
      return toast.error("Please select Images only!");
    }
  });

  let destination = "place-image";

  if (type === "user") {
    destination = "user-image";
  }

  const responseData = await imagesUpload(destination, data)

  return responseData.data;
};