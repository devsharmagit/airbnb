import { useRef, useState } from 'react'
import userImgSrc from "../assets/user (1).png";
import {PencilSvg} from '../assets/svgs';
import toast from 'react-hot-toast';


function ProfilePhoto({photo, setPhoto, setFile}) {

  const [hoverProfile, setHoverProfile] = useState(false);
  const inputRef = useRef(null);



  const handleProfileClick = () => {
    inputRef.current.click();
  };

    const handleFile = (event) => {
      if (!event.target.files[0].type.includes("image")) {
        event.target.value = "";
        return toast.error("Please select image only!")
      } 
      setFile(event.target.files[0])
      setPhoto({url: URL.createObjectURL(event.target.files[0])})
    };

  return (
    <>
          <input
          type="file"
          onChange={handleFile}
          className="hidden"
          ref={inputRef}
          accept='image/*'
        />
        <div
          className="h-32 w-32 border-gray-500 border-4 relative rounded-full m-auto overflow-hidden"
          onClick={handleProfileClick}
          onMouseEnter={() => {
            setHoverProfile(true);
          }}
          onMouseLeave={() => {
            setHoverProfile(false);
          }}
        >
          <img src={photo?.url || userImgSrc} className="relative h-full w-full object-cover" alt="" />
          <div
            className={`w-full bg-black absolute  flex gap-1 h-full justify-center items-center opacity-70 transition-all duration-200 cursor-pointer ${
              hoverProfile ? "top-0" : "top-32"
            }`}
          >
           <PencilSvg />
            <p className="text-lg text-white">Change</p>
          </div>
        </div> 
    </>
  )
}

export default ProfilePhoto
