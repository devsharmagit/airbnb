import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { loginSchema } from "../constants/schemaConstant.js";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../slice/userSlice.js";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import Heading from "../components/typography/Heading.jsx";
import LoadingModal from "../components/Modal/LoadingModal.jsx";
import { logIn } from "../services/api/authApi.js";

function LoginPage() {
  const user = useSelector((state) => state.user.user);

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

  const handleLoginUser = async (data) => {
    try {
      setLoading(true);
      
      const responseData = await logIn({...data})
      if (responseData.status === 201) toast.success("Successfully Logged In !");
      dispatch(login(responseData.data.data.user));
    } catch (error) {
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
