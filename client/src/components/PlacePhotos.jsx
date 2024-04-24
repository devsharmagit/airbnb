import React, { useState } from "react";
import {ImageSvg} from "../assets/svgs";
import IconButton from "./ui/IconButton";
import Modal from "./Modal";
import ImageModal from "./Modal/ImageModal";

function PlacePhotos({ photos }) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(photos)

  const handleClick = () => {
    setIsOpen(true);
  };



  return (
    <>
      {
 
        <ImageModal photos={photos} isOpen={isOpen} setIsOpen={setIsOpen} />

       
      }
      <div className="images gap-1 grid h-[450px] grid-cols-1  md:grid-cols-2 overflow-hidden rounded-2xl relative">
        {photos && (
          <>
            <img
                src={photos[0].url}
              className="min-w-[500px] w-full h-[450px] object-cover"
              alt=""
              loading="lazy"
            />
            <div className="grid grid-cols-2 h-[450px] grid-rows-2 gap-1">
              <img
                 src={photos[1].url}
                className="w-full h-full object-cover"
                alt=""
                loading="lazy"
              />
              <img
                 src={photos[2].url}
                className="w-full h-full object-cover"
                alt=""
                loading="lazy"
              />
              <img
                 src={photos[3].url}
                className="w-full h-full object-cover"
                alt=""
                loading="lazy"
              />
              <img
                src={photos[4].url}
                className="w-full h-full object-cover"
                alt=""
                loading="lazy"
              />
            </div>
          </>
        )}
        <IconButton  
        onClick={handleClick}
        className="bg-white p-2 rounded-lg absolute backdrop-blur-md right-1 bottom-1 mont text-sm font-bold flex items-center gap-1 bg-opacity-70 hover:bg-opacity-100"
        text={"View all Photos"}
        Icon={ImageSvg}
        />
       
      </div>
    </>
  );
}

export default PlacePhotos;
