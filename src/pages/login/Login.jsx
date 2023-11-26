import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginImage from "../../assets/login.svg";
import {
  signInThunk,
  toggleFalse,
  toggleLoading,
} from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    user: { email },
    isLoading,
    isSuccess,
    isError,
    error,
  } = useSelector((state) => state.auth);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = ({ email, password }) => {
    dispatch(signInThunk({ email, password }));
    dispatch(toggleLoading());
    reset();
  };

  if (isError) {
    setTimeout(() => {
      dispatch(toggleFalse());
    }, 3000);
  }

  useEffect(() => {
    if (isLoading) {
      toast.loading("Logging In", { id: "loading", duration: 1000 });
    }

    if (isSuccess) {
      toast.success("Logged In", { id: "success" });
    }

    if (isError) {
      toast.error(error, { id: "error" });
    }

    if (email) {
      navigate("/");
    }
  }, [navigate, email, isLoading, isSuccess, isError, error]);

  return (
    <div className="flex items-center py-20">
      <div className="w-1/2">
        <img src={loginImage} className="h-full w-full" alt="" />
      </div>
      <div className="w-1/2 grid place-items-center">
        <div className="bg-[#FFFAF4] rounded-lg grid place-items-center p-10">
          <h1 className="mb-10 font-medium text-2xl">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <div className="flex flex-col items-start">
                <label htmlFor="email" className="ml-5">
                  Email
                </label>
                <input
                  placeholder="Your Email"
                  type="email"
                  {...register("email")}
                  id="email"
                />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="password" className="ml-5">
                  Password
                </label>
                <input
                  placeholder="Type Password"
                  type="password"
                  id="password"
                  {...register("password")}
                />
              </div>
              <div className="relative !mt-8">
                <button
                  type="submit"
                  className="font-bold text-white py-3 rounded-full bg-primary w-full"
                >
                  Login
                </button>
              </div>
              <div>
                <p>
                  Don't have an account?{" "}
                  <span
                    className="text-primary hover:underline cursor-pointer"
                    onClick={() => navigate("/signup")}
                  >
                    Sign up
                  </span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
