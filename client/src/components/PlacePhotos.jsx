import React, { useState } from "react";
import { ImageSvg } from "../assets/svgs";
import IconButton from "./ui/IconButton";
import ImageModal from "./Modal/ImageModal";

function PlacePhotos({ photos }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      {<ImageModal photos={photos} isOpen={isOpen} setIsOpen={setIsOpen} />}
      <div className="images relative grid h-[450px] grid-cols-1  gap-1 overflow-hidden rounded-2xl md:grid-cols-2">
        {photos && (
          <>
            <img
              src={photos[0].url}
              className="h-[450px] w-full min-w-[500px] object-cover"
              alt=""
              loading="lazy"
            />
            <div className="grid h-[450px] grid-cols-2 grid-rows-2 gap-1">
              <img
                src={photos[1].url}
                className="h-full w-full object-cover"
                alt=""
                loading="lazy"
              />
              <img
                src={photos[2].url}
                className="h-full w-full object-cover"
                alt=""
                loading="lazy"
              />
              <img
                src={photos[3].url}
                className="h-full w-full object-cover"
                alt=""
                loading="lazy"
              />
              <img
                src={photos[4].url}
                className="h-full w-full object-cover"
                alt=""
                loading="lazy"
              />
            </div>
          </>
        )}
        <IconButton
          onClick={handleClick}
          className="mont absolute bottom-1 right-1 flex items-center gap-1 rounded-lg bg-white bg-opacity-70 p-2 text-sm font-bold backdrop-blur-md hover:bg-opacity-100"
          text={"View all Photos"}
          Icon={ImageSvg}
        />
      </div>
    </>
  );
}

export default PlacePhotos;
