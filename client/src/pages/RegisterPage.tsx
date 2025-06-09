import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfilePhoto from "../components/ProfilePhoto.tsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { registerSchema } from "../constants/schemaConstant";
import { useDispatch } from "react-redux";
import { login } from "../slice/userSlice";
import Button from "../components/ui/Button.tsx";
import Input from "../components/ui/Input.tsx";
import Heading from "../components/typography/Heading.tsx";
import LoadingModal from "../components/Modal/LoadingModal.tsx";
import { uploadFilesToServer, UploadType } from "../utils/handleFiles";
import { signUp } from "../services/api/authApi";
import { UploadedPhotoTypes } from "../types/file.ts";
import riversideImg from "../assets/riverside.jpeg";

interface RegisterFormType {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

type RegisterType = RegisterFormType & { profilePhoto?: UploadedPhotoTypes };

function RegisterPage() {
  const [photo, setPhoto] = useState<string>("");
  const [file, setFile] = useState<null | File>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const navigate = useNavigate();

  async function handleRegister(data: RegisterFormType) {
    const dataToSend: RegisterType = { ...data };
    try {
      setLoading(true);
      if (file) {
        const responseData = await uploadFilesToServer([file], UploadType.user);
        dataToSend["profilePhoto"] = responseData?.uploadedImages[0];
      }
      const responseData: any = await signUp({ ...dataToSend });
      if (responseData.status === 201) {
        dispatch(login(responseData.data.data.user));
        toast.success("Account successfully created !");
        navigate("/");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again later!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <LoadingModal isOpen={loading} text={"Making your account..."} />
      <div className="h-screen flex w-full">
           
        {/* Left side - Register Form */}
        <div className="w-1/2 h-full flex items-center justify-center px-4">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
            <div className="text-center">
              <Heading text={"Create Account"} className={"text-3xl font-bold mb-2"} />
              <p className="text-gray-600">Join us and start your journey</p>
            </div>

            <div className="flex justify-center">
              <ProfilePhoto 
                photo={photo} 
                setPhoto={setPhoto} 
                setFile={setFile}
              />
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>
              <div className="space-y-3">
                <Input
                  type={"text"}
                  placeholder={"Full Name"}
                  {...register("name")}
                  errorMsg={errors?.name?.message}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <Input
                  type={"email"}
                  placeholder={"Email address"}
                  {...register("email")}
                  errorMsg={errors?.email?.message}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <Input
                  type={"password"}
                  placeholder={"Create password"}
                  {...register("password")}
                  errorMsg={errors?.password?.message}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <Input
                  type={"password"}
                  placeholder={"Confirm password"}
                  {...register("confirmPassword")}
                  errorMsg={errors?.confirmPassword?.message}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <Button 
                type={"submit"} 
                text={"Create Account"} 
              />
            </form>

            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link className="text-black font-semibold hover:underline" to={"/login"}>
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Riverside Image */}
        <div className="w-1/2 h-full">
          <img 
            src={riversideImg} 
            className="w-full h-full object-cover" 
            alt="Riverside landscape" 
          />
        </div>
      </div>
    </>
  );
}

export default RegisterPage;