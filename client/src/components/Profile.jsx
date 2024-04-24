import  {  useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {EditSvg} from "../assets/svgs";
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ProfilePhoto from "./ProfilePhoto";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../slice/userSlice";
import { profileSchema } from "../constants/schemaConstant";
import toast from "react-hot-toast";
import Button from "./ui/Button";
import IconButton from "./ui/IconButton"
import Input from "./ui/Input";
import { uploadFilesToServer } from "../utils/handleFiles";
import Paragrapgh from "./typography/Paragrapgh"
import LoadingModal from "./Modal/LoadingModal";




function Profile() {
 const user = useSelector((state)=> state.user.user)

 const navigate = useNavigate()
 const dispatch = useDispatch()

  const [editMode, setEditMode] = useState(false);
  const [photo, setPhoto] = useState(user?.profilePhoto ? user?.profilePhoto : null);
  const [imageFile ,setImgaeFile] = useState(null)
const [loading, setLoading] = useState(false)

  const {handleSubmit, register, formState: {errors}, reset} = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || ""
    }
  })

  const handleProfileEdit = async (data) => {
    try {
      setLoading(true)
      const dataToSend = {...data}
      if(imageFile){
          const link =  await uploadFilesToServer([imageFile], 'user')        
          dataToSend["profilePhoto"] = link?.uploadedImages[0]
      }
      const responseData = await axios.patch(
        "/api/user",
        { ...dataToSend },
        { withCredentials: true }
      );
      dispatch(login(responseData.data.user));
      toast.success("Successfully Updated !")
      setEditMode(false);
    } catch (error) {
      toast.error("Something went wrong. Try again Later.")
    }finally{
      setLoading(false)
    }
  
  };

  const handleCancel = ()=>{
    if(user?.profilePhoto){
      setPhoto(user?.profilePhoto)
    }else{
      setPhoto(null)
    }
    setEditMode(false)
    reset({
      name: user?.name || "",
      email: user?.email || ""
    })
  }

  async function logoutUser() {
    await axios.post(
      "/api/user/logout",
      {},
      { withCredentials: true }
    );
    dispatch(logout());
    navigate("/")
  }

  useEffect(()=>{
    if(imageFile){
      setEditMode(true)
    }
    return ()=>{
      setEditMode(false)
    }
  }, [imageFile])

  return (
    <>
    <LoadingModal text={"Loading"} isOpen={loading} />
      <div className=" relative mx-auto max-w-md mt-5 text-center border border-gray-300 rounded-2xl p-5">
      

{!editMode && 
        <IconButton onClick={() => setEditMode(true)} className={`flex gap-1 font-semibold hover:bg-white bg-white border border-primary px-3 absolute top-2 right-1 py-2  text-primary`}  Icon={EditSvg} text={"Edit"} />
}

   <ProfilePhoto photo={photo} setPhoto={setPhoto} setFile={setImgaeFile} />

        <div className="grid grid-cols-2">
        <Paragrapgh text={"Name"} className={"items-center flex justify-center text-lg font-semibold"} />
         
          <div className="flex flex-col">
          <Input disabled={!editMode} type={"text"} errorMsg={errors?.name?.message}  {...register("name")} />
          </div>
        
          <Paragrapgh text={"Email"} className={"items-center flex justify-center text-lg font-semibold"}/>
    
          <div className="flex flex-col">
            <Input disabled={!editMode} type={"email"} errorMsg={errors?.email?.message}  {...register("email")} />
          </div>
        
        </div>
        {editMode && (
          <div className="flex gap-3 justify-center">
    
            <Button text={"Save"} type={"submit"} onClick={handleSubmit(handleProfileEdit)}  className={"mx-0"}/>
            <Button text={"Cancel"} type={"reset"} onClick={handleCancel} className={'!text-gray-700 border mx-0 bg-white border-gray-500 '} />
      
          </div>
        )}
      </div>
   <Button onClick={logoutUser} text={"Logout"} />
    </>
  );
}

export default Profile;
