import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import IconButton from "./ui/IconButton";
import { HeartOutlineSvg } from "../assets/svgs";
import Heading from "./typography/Heading";
import Paragrapgh from "./typography/Paragrapgh";
import { removeSavePlace, saveAPLace } from "../services/api/placeApi";

function Place({ id, photo, title, description, price, favourites, removeFromSaved }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const [isSaved, setIsSaved] = useState(false);

  const handlePlaceClick = () => {
    navigate(`/place/${id}`);
  };

  const handleFavClick = async (event) => {
    event.stopPropagation();
    if (!user) return toast.error("Please Login to Save !");
    if (!isSaved) {
      setIsSaved(true);
      try {
        const responseData = await saveAPLace({ place: id })
        if (responseData?.data?.status === "success") toast.success("Successfully saved !");
      } catch (error) {
        setIsSaved(false);
        console.log(error)
      }
    } else {
      if (removeFromSaved) removeFromSaved(id);
      const responseData = await removeSavePlace({ place: id })
      if (responseData.data.status === "success") {
        setIsSaved(false);
        toast.success("Successfully Removed !");
      }
    }
  };

  useEffect(() => {
    if (user) {
      if (favourites?.includes(user?._id)) setIsSaved(true);
    }
  }, [user]);

  return (
    <div className="relative cursor-pointer overflow-hidden " onClick={handlePlaceClick}>
      <IconButton
        onClick={handleFavClick}
        className="absolute right-2 top-2 rounded-full !bg-white !bg-opacity-50 p-1 transition-all hover:scale-110"
        Icon={HeartOutlineSvg}
        IconClass={isSaved ? " fill-primary text-primary" : "text-white fill-black"}
      />

      <img src={photo.url} className="h-72 w-full rounded-lg object-cover" alt="" loading="lazy" />
      <div className="px-2 py-1 !text-left">
        <Heading text={title} className={"truncate text-lg"} />
        <Paragrapgh text={description} className={"truncate text-sm"} />
        <Paragrapgh
          text={price && `$ ${price} per night`}
          className={"mt-2 text-base font-semibold"}
        />
      </div>
    </div>
  );
}

export default Place;
