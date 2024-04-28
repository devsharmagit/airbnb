import { useRef, useState } from "react";
import userImgSrc from "../assets/user (1).png";
import { PencilSvg } from "../assets/svgs";
import toast from "react-hot-toast";

function ProfilePhoto({ photo, setPhoto, setFile }) {
  const [hoverProfile, setHoverProfile] = useState(false);
  const inputRef = useRef(null);

  const handleProfileClick = () => {
    inputRef.current.click();
  };

  const handleFile = (event) => {
    if (!event.target.files[0].type.includes("image")) {
      event.target.value = "";
      return toast.error("Please select image only!");
    }
    if (event.target.files[0].size / 1048576 > 4.5) {
      event.target.value = "";
      return toast.error("Please select image with size less than 4.5 mb only!");
    }
    setFile(event.target.files[0]);
    setPhoto({ url: URL.createObjectURL(event.target.files[0]) });
  };

  return (
    <>
      <input type="file" onChange={handleFile} className="hidden" ref={inputRef} accept="image/*" />
      <div
        className="relative m-auto h-32 w-32 overflow-hidden rounded-full border-4 border-gray-500"
        onClick={handleProfileClick}
        onMouseEnter={() => {
          setHoverProfile(true);
        }}
        onMouseLeave={() => {
          setHoverProfile(false);
        }}
      >
        <img
          src={photo?.url || userImgSrc}
          className="relative h-full w-full object-cover"
          alt=""
        />
        <div
          className={`absolute flex h-full  w-full cursor-pointer items-center justify-center gap-1 bg-black opacity-70 transition-all duration-200 ${
            hoverProfile ? "top-0" : "top-32"
          }`}
        >
          <PencilSvg />
          <p className="text-lg text-white">Change</p>
        </div>
      </div>
    </>
  );
}

export default ProfilePhoto;
