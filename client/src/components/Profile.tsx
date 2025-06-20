import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditSvg } from "../assets/svgs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ProfilePhoto from "./ProfilePhoto.tsx";
import { useDispatch } from "react-redux";
import { login, logout } from "../slice/userSlice";
import { profileSchema } from "../constants/schemaConstant";
import toast from "react-hot-toast";
import Button from "./ui/Button.tsx";
import IconButton from "./ui/IconButton.tsx";
import Input from "./ui/Input.tsx";
import { uploadFilesToServer, UploadType } from "../utils/handleFiles";
import Paragrapgh from "./typography/Paragrapgh.tsx";
import LoadingModal from "./Modal/LoadingModal.tsx";
import { updateUser } from "../services/api/userApi";
import { logout as logouUser } from "../services/api/authApi";
import { useAppSelector } from "../hooks/reduxhooks.ts";
import { UploadedPhotoTypes } from "../types/file.ts";

interface ProfileFormType {
  name?: string;
  email?: string;
  profilePhoto?: UploadedPhotoTypes;
}

function Profile() {
  const user = useAppSelector((state) => state.user.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [photo, setPhoto] = useState(user?.profilePhoto ? user?.profilePhoto : null);
  const [imageFile, setImgaeFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const handleProfileEdit = async (data: ProfileFormType) => {
    try {
      setLoading(true);
      const dataToSend = { ...data };
      if (imageFile) {
        const responseData = await uploadFilesToServer([imageFile], UploadType.user);
        dataToSend["profilePhoto"] = responseData?.uploadedImages[0];
      }

      const responseData: any = await updateUser({ ...dataToSend });
      dispatch(login(responseData.data.user));
      toast.success("Successfully Updated !");
      setEditMode(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try again Later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user?.profilePhoto) {
      setPhoto(user?.profilePhoto);
    } else {
      setPhoto(null);
    }
    setEditMode(false);
    reset({
      name: user?.name || "",
      email: user?.email || "",
    });
  };

  async function logoutUser() {
    try {
      setLoading(true);
      await logouUser();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (imageFile) {
      setEditMode(true);
    }
    return () => {
      setEditMode(false);
    };
  }, [imageFile]);

  return (
    <>
      <LoadingModal text={"Loading"} isOpen={loading} />
      <div className=" relative mx-auto mt-5 max-w-md rounded-2xl border border-gray-300 p-5 text-center">
        {!editMode && (
          <IconButton
            onClick={() => setEditMode(true)}
            className={
              "absolute right-1 top-2 flex gap-1 border border-primary bg-white px-3 py-2 font-semibold text-primary  hover:bg-white"
            }
            Icon={EditSvg}
            text={"Edit"}
          />
        )}

        <ProfilePhoto photo={photo} setPhoto={setPhoto} setFile={setImgaeFile} />

        <div className="grid grid-cols-2">
          <Paragrapgh
            text={"Name"}
            className={"flex items-center justify-center text-lg font-semibold"}
          />

          <div className="flex flex-col">
            <Input
              disabled={!editMode}
              type={"text"}
              errorMsg={errors?.name?.message}
              {...register("name")}
            />
          </div>

          <Paragrapgh
            text={"Email"}
            className={"flex items-center justify-center text-lg font-semibold"}
          />

          <div className="flex flex-col">
            <Input
              disabled={!editMode}
              type={"email"}
              errorMsg={errors?.email?.message}
              {...register("email")}
            />
          </div>
        </div>
        {editMode && (
          <div className="flex justify-center gap-3 mt-5">
            <Button
              text={"Save"}
              type={"submit"}
              onClick={handleSubmit(handleProfileEdit)}
              className={"mx-0"}
            />
            <Button
              text={"Cancel"}
              type={"reset"}
              onClick={handleCancel}
              className={"mx-0 border border-gray-500 bg-white !text-gray-700 hover:!text-white "}
            />
          </div>
        )}
      </div>
      <Button onClick={logoutUser} text={"Logout"} className="mx-auto mt-5" />
    </>
  );
}

export default Profile;
