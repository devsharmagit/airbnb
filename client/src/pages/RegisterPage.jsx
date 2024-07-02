import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfilePhoto from "../components/ProfilePhoto";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { registerSchema } from "../constants/schemaConstant";
import { useDispatch } from "react-redux";
import { login } from "../slice/userSlice";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Heading from "../components/typography/Heading";
import LoadingModal from "../components/Modal/LoadingModal";
import { uploadFilesToServer } from "../utils/handleFiles";
import { signUp } from "../services/api/authApi";


function RegisterPage() {
  const [photo, setPhoto] = useState("");
  const [file, setFile] = useState("");
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

  async function handleRegister(data) {
    const dataToSend = { ...data };
    try {
      setLoading(true);
      if (file) {
        const responseData = await uploadFilesToServer([file], "user");
        dataToSend["profilePhoto"] = responseData?.uploadedImages[0];
      }
      const responseData = await signUp({...dataToSend});
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
      <div className="mx-auto mt-4 max-w-md text-center">
        <Heading text={"Register"} className={"mb-4"} />
        <ProfilePhoto photo={photo} setPhoto={setPhoto} setFile={setFile} />
        <form className="" onSubmit={handleSubmit(handleRegister)}>
          <Input
            type={"text"}
            placeholder={"Full Name"}
            {...register("name")}
            errorMsg={errors?.name?.message}
          />
          <Input
            type={"email"}
            placeholder={"example@gmail.com"}
            {...register("email")}
            errorMsg={errors?.email?.message}
          />
          <Input
            type={"password"}
            placeholder={"password"}
            {...register("password")}
            errorMsg={errors?.password?.message}
          />
          <Input
            type={"password"}
            placeholder={"confirm password"}
            {...register("confirmPassword")}
            errorMsg={errors?.confirmPassword?.message}
          />
          <Button type={"submit"} text={"Register"} />
        </form>
        <div className="mt-4 text-center text-gray-600">
          <span className="mr-1"> Already have an account ? </span>
          <Link className="text-black underline" to={"/login"}>
            Login
          </Link>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
