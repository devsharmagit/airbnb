import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhotosUploader from "./PhotosUploader";
import Perks from "./Perks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { placeSchema } from "../constants/schemaConstant";
import Button from "./ui/Button";
import Input from "./ui/Input";
import TextArea from "./ui/TextArea";
import Heading from "./typography/Heading";
import Paragrapgh from "./typography/Paragrapgh";
import { handleFormImages } from "../utils/utils";
import LoadingModal from "./Modal/LoadingModal";
import { createPlace, editPlace } from "../services/api/placeApi";

function PlaceForm({ type, placeId, place }) {
  const [photos, setPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(placeSchema),
    defaultValues: {
      title: place?.title || "",
      address: place?.address || "",
      description: place?.description || "",
      extraInfo: place?.extraInfo || "",
      maxGuests: place?.maxGuests || 1,
      price: place?.price || 100,
      latitude: place?.location.coordinates[1] || "",
      longitude: place?.location.coordinates[0] || "",
    },
  });

  async function handleFormSubmit(data) {
    if (error !== null) return toast.error(error);

    try {
      setLoading(true);
      const photosArray = await handleFormImages(photos);

      const placeObj = {
        ...data,
        perks,
        photos: photosArray,
        location: {
          type: "Point",
          coordinates: [data.longitude.toFixed(6), data.latitude.toFixed(6)],
        },
      };
      if (type === "new") {
        const responseData = await createPlace(placeObj)
        if (responseData.status === 201) toast.success("Successfully Created !");
      }
      if (type === "edit") {
        const responseData = await editPlace(placeObj, placeId)
        if (responseData.status === 200) toast.success("Successfully Updated !");
      }
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (photos.length < 5) {
      setError("minimum 5 photos are required");
    } else if (photos.length > 10) {
      setError("maximum 10 photos are allowed");
    } else {
      setError(null);
    }
  }, [photos]);

  useEffect(() => {
    if (place?.photos) {
      const newPhotosOBj = place?.photos.map((value) => {
        return { ...value, fromServer: true };
      });
      setPhotos(newPhotosOBj);
    }
    if (place?.perks) {
      setPerks(place?.perks);
    }
    return () => {
      setPhotos([]);
      setPerks([]);
    };
  }, [place]);

  return (
    <>
      <LoadingModal
        isOpen={loading}
        text={"Loading... I am using free tier of cloudnary 🥲. It will take time please wait."}
      />
      <form onSubmit={handleSubmit(handleFormSubmit)} className="m-auto max-w-screen-xl px-4 pb-4">
        <div className="mt-4">
          <label htmlFor="title" className="mt-5">
            {inputCombo("Title", "Title for your place, should be short and catchy")}
          </label>
          <Input
            type={"text"}
            placeholder={"title, for example: My love palace"}
            errorMsg={errors?.title?.message}
            {...register("title")}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="address" className="mt-5">
            {inputCombo("Adress", "address to this place")}
          </label>
          <Input
            type={"text"}
            placeholder={"House No. 123ABC City Country"}
            errorMsg={errors?.address?.message}
            {...register("address")}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="photoUrl" className="mt-5">
            {inputCombo("Photos", "more is better")}
          </label>
          <p className="mont pl-2 text-sm font-medium text-gray-500">{error && error}</p>
          <PhotosUploader addedPhoto={photos} setAddedPhoto={setPhotos} error={error} />
        </div>

        <div className="mt-4">
          <label htmlFor="description" className="mt-5">
            {inputCombo("Description", "description for this place")}
          </label>
          <TextArea errorMsg={errors?.description?.message} {...register("description")} />
        </div>
        <div className="mt-4">
          {inputCombo("Perks", "select all the perks of the places")}
          <div className="mb-8 mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4">
            <Perks selected={perks} onChange={setPerks} />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="extraInfo ">
            {inputCombo("Extra Info", " add extra info related to your house")}
          </label>
          <TextArea errorMsg={errors?.extraInfo?.message} {...register("extraInfo")} />
        </div>
        <div className="mt-4">
          {inputCombo("Location", "Enter Latitude and Longitutde coordinates of the Place")}
          <div className="mt-5 flex flex-col gap-3 md:flex-row">
            <div className="flex-1">
              <label htmlFor="checkIn">{inputCombo("Latitude")}</label>
              <Input
                type={"text"}
                placeholder={"45.9829834"}
                errorMsg={errors?.latitude?.message}
                {...register("latitude")}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="price">{inputCombo("Longitude")}</label>
              <Input
                type={"text"}
                placeholder={"67.2342374"}
                errorMsg={errors?.longitude?.message}
                {...register("longitude")}
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          {inputCombo(
            "Price and Other information",
            "Remember the entered price will be price per night."
          )}
          <div className="mt-1 flex flex-col gap-3 md:flex-row">
            <div className="flex-1">
              <label htmlFor="checkIn" className="mb-2">
                {inputCombo("max number of guests")}
              </label>
              <Input
                type={"number"}
                placeholder={"12"}
                errorMsg={errors?.maxGuests?.message}
                {...register("maxGuests")}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="price" className="mb-2">
                {inputCombo("Price (in $)")}
              </label>
              <Input
                type={"number"}
                placeholder={"100"}
                errorMsg={errors?.price?.message}
                {...register("price")}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-5">
          <Button
            text={"Cancel"}
            className={"!m-0 !mt-5 !bg-gray-600"}
            onClick={() => navigate("/")}
          />
          <Button text={"Save"} className={"!m-0 !mt-5"} />
        </div>
      </form>
    </>
  );
}

export default PlaceForm;

function inputHeader(title) {
  return <Heading className={"text-xl"} text={title} />;
}
function inputPara(para) {
  return <Paragrapgh className={"text-sm leading-tight"} text={para} />;
}
function inputCombo(title, para) {
  return (
    <>
      {inputHeader(title)}
      {inputPara(para)}
    </>
  );
}
