import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { loginSchema } from "../constants/schemaConstant.js";
import { useDispatch } from "react-redux";
import { login } from "../slice/userSlice.js";
import Button from "../components/ui/Button.tsx";
import Input from "../components/ui/Input.tsx";
import Heading from "../components/typography/Heading.tsx";
import LoadingModal from "../components/Modal/LoadingModal.tsx";
import { logIn } from "../services/api/authApi.js";
import { useAppSelector } from "../hooks/reduxhooks.ts";
import mountainImg from "../assets/mountain.jpeg";

interface LoginFormDataType {
  email: string;
  password: string;
}

function LoginPage() {
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();

  const handleLoginUser = async (data: LoginFormDataType) => {
    try {
      setLoading(true);
      const responseData: any = await logIn({ ...data });
      if (responseData.status === 201) toast.success("Successfully Logged In !");
      dispatch(login(responseData.data.data.user));
    } catch (error: any) {
      if (error?.response?.status === 401) {
        toast.error("Incorrect Email or Password !");
      } else {
        toast.error("Something went wrong. Please try later!");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <>
      <LoadingModal isOpen={loading} text={"Logging you in."} />
      <div className="h-[100vh] flex w-full">
        {/* Left side - Mountain Image */}
        <div className="w-1/2 h-full">
          <img 
            src={mountainImg} 
            className="w-full h-full object-cover" 
            alt="Mountain landscape" 
          />
        </div>
        
        {/* Right side - Login Form */}
        <div className="w-1/2 h-full flex items-center justify-center">
          <div className="max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
            <div className="text-center">
              <Heading text={"Welcome Back"} className={"text-3xl font-bold mb-2"} />
              <p className="text-gray-600">Please sign in to your account</p>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleLoginUser)}>
              <div className="space-y-4">
                <Input
                  type={"email"}
                  placeholder={"Enter your email"}
                  {...register("email")}
                  errorMsg={errors?.email?.message}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <Input
                  type={"password"}
                  placeholder={"Enter your password"}
                  {...register("password")}
                  errorMsg={errors?.password?.message}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <Button 
                text={"Sign In"} 
                type="submit"
                className="mx-auto"
              />
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link className="text-black font-semibold hover:underline" to={"/register"}>
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;