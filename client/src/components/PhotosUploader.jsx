import {TrashSvg, UploadSvg} from "../assets/svgs";
import toast from "react-hot-toast";
import IconButton from "./ui/IconButton"


function PhotosUploader({addedPhoto, setAddedPhoto}) {

  

      const handleDelteImage = async(link, event)=>{
        event.preventDefault()
        setAddedPhoto((prev)=>{
          return prev.filter((val)=> val.url !== link )
        })
      }

const handleFileSelect = async(event)=>{
  const files = []
  Array.from(event.target.files).forEach((value)=>{
  if(value?.type?.includes("image")){
    files.push( {file: value, url: URL.createObjectURL(value)})
  }else{
    toast.error("Please select images only!")
  }
 })
const newAddedPhotos = addedPhoto.concat(files)
setAddedPhoto(newAddedPhotos.slice(0,10))
}

  return (
    <>
       
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 mb-10" >
            {
            addedPhoto?.map((fileObj)=>{
              
              return <div className="relative "  key={fileObj?.url}>
                <IconButton onClick={(event)=>handleDelteImage(fileObj?.url, event)} className={"bg-white !bg-opacity-60 hover:bg-opacity-100 p-1 rounded-md absolute bottom-1 right-1"} Icon={TrashSvg}/>

                <img className="rounded-xl h-64 object-cover w-full" src={fileObj?.url} />
              </div>
            })}
            <label className="cursor-pointer border border-gray-600 rounded-xl flex justify-center items-center gap-2 min-h-[150px]">
               <input type="file" accept="image/*" disabled={addedPhoto.length === 10} multiple onChange={handleFileSelect} className="hidden " />
              <UploadSvg />
              {addedPhoto.length === 10 ? "You can only upload 10 photos" : "Upload"}
            </label>
          </div>
    </>
  )
}

export default PhotosUploader
    