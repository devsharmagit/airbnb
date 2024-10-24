import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { loginSchema } from "../constants/schemaConstant.js";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../slice/userSlice.js";
import Button from "../components/ui/Button.tsx";
import Input from "../components/ui/Input.tsx";
import Heading from "../components/typography/Heading.tsx";
import LoadingModal from "../components/Modal/LoadingModal.tsx";
import { logIn } from "../services/api/authApi.js";
import { useAppSelector } from "../hooks/reduxhooks.ts";

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
      <div className="mx-auto mt-4 flex h-[45vh] max-w-md items-center justify-center">
        <div>
          <Heading text={"Login"} className={"text-center"} />
          <form className="" onSubmit={handleSubmit(handleLoginUser)}>
            <Input
              type={"email"}
              placeholder={"saraflex@gmail.com"}
              {...register("email")}
              errorMsg={errors?.email?.message}
            />
            <Input
              type={"password"}
              placeholder={"password"}
              {...register("password")}
              errorMsg={errors?.password?.message}
            />
            <Button text={"Login"} />
          </form>
          <div className="mt-4 text-center text-gray-600">
            <span className="mr-5">Dont have an account yet?</span>
            <Link className="text-black underline" to={"/register"}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
