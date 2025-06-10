import axiosInstance from "../../utils/axiosInstance";
import { ResponseFileUploadType } from "../../types/file";
import { AxiosResponse } from "axios";
import { PlaceType } from "../../types/place";

export const getAllPlace = async (page: number, queryString: string, signal: AbortSignal) => {
  try {
    const resonse = await axiosInstance.get(
      `/api/place?fields=title,description,mainImage,price,favourites&limit=12&page=${page}&${queryString}`,
      { signal: signal }
    );
    return resonse;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getMostPopularPlaces = async (signal: AbortSignal) => {
  try {
    const resonse = await axiosInstance.get(
      `/api/place?fields=title,mainImage,price&limit=9&sort=-favCount`,
      { signal: signal }
    );
    return resonse;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getOnePlace = async (placeId: string) => {
  try {
    const response = await axiosInstance.get(`/api/place/${placeId}`);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createPlace = async (data: PlaceType) => {
  try {
    const response = await axiosInstance.post("/api/place", { ...data });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const editPlace = async (data: PlaceType, placeId: string) => {
  try {
    const response = await axiosInstance.patch(`/api/place/${placeId}`, { ...data });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const deletePlace = async (placeId: string) => {
  try {
    const response = await axiosInstance.delete(`/api/place/${placeId}`);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getSavedPlaces = async (signal: AbortSignal) => {
  try {
    const response = await axiosInstance.get("/api/place/fav", { signal: signal });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

interface LikePlaceType {
  place: string;
}

export const saveAPLace = async (data: LikePlaceType) => {
  try {
    const response = await axiosInstance.post("/api/fav", data);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const removeSavePlace = async (data: LikePlaceType) => {
  try {
    const response = await axiosInstance.post("/api/fav/remove", data);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const imagesUpload = async (
  destination: string,
  data: FormData
): Promise<AxiosResponse<ResponseFileUploadType, any>> => {
  try {
    const response = await axiosInstance.post<ResponseFileUploadType>(
      `/api/upload/${destination}`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
