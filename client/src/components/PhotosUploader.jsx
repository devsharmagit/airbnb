import { TrashSvg, UploadSvg } from "../assets/svgs";
import toast from "react-hot-toast";
import IconButton from "./ui/IconButton";

function PhotosUploader({ addedPhoto, setAddedPhoto }) {
  const handleDelteImage = async (link, event) => {
    event.preventDefault();
    setAddedPhoto((prev) => {
      return prev.filter((val) => val.url !== link);
    });
  };

  const handleFileSelect = async (event) => {
    const files = [];
    Array.from(event.target.files).forEach((value) => {
      if (value?.type?.includes("image") && value?.size / 1048576 < 4.5) {
        files.push({ file: value, url: URL.createObjectURL(value) });
      } else {
        toast.error("Please select images with size less than 4.5 mb only!");
      }
    });
    const newAddedPhotos = addedPhoto.concat(files);
    setAddedPhoto(newAddedPhotos.slice(0, 10));
  };



  return (
    <>
      <div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {addedPhoto?.map((fileObj) => {
          return (
            <div className="relative " key={fileObj?.url}>
              <IconButton
                onClick={(event) => handleDelteImage(fileObj?.url, event)}
                className={
                  "absolute bottom-1 right-1 rounded-md bg-white !bg-opacity-60 p-1 hover:bg-opacity-100"
                }
                Icon={TrashSvg}
              />

              <img className="h-64 w-full rounded-xl object-cover" src={fileObj?.url} />
            </div>
          );
        })}
        <label className="flex min-h-[150px] cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-600">
          <input
            type="file"
            accept="image/*"
            disabled={addedPhoto.length === 10}
            multiple
            onChange={handleFileSelect}
            className="hidden "
          />
          <UploadSvg />
          {addedPhoto.length === 10 ? "You can only upload 10 photos" : "Upload"}
        </label>
      </div>
    </>
  );
}

export default PhotosUploader;
