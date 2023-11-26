import React, { useEffect, useState } from "react";
import loginImage from "../../assets/login.svg";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpThunk,
  toggleFalse,
  toggleLoading,
} from "../../features/auth/authSlice";
import { toast } from "react-hot-toast";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const {
    user: { email },
    isLoading,
    isSuccess,
    isError,
    error,
  } = useSelector((state) => state.auth);
  const { handleSubmit, register, reset, control } = useForm();
  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });

  useEffect(() => {
    if (
      password !== undefined &&
      password !== "" &&
      confirmPassword !== undefined &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword, navigate]);

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

  const onSubmit = (data) => {
    dispatch(signUpThunk({ email: data.email, password: data.password }));
    dispatch(toggleLoading());
    reset();
  };

  return (
    <div className="flex items-center py-20">
      <div className="w-1/2">
        <img src={loginImage} className="h-full w-full" alt="" />
      </div>
      <div className="w-1/2 grid place-items-center">
        <div className="bg-[#FFFAF4] rounded-lg grid place-items-center p-10">
          <h1 className="mb-10 font-medium text-2xl">Sign up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <div className="flex flex-col items-start">
                <label htmlFor="email" className="ml-5">
                  Email
                </label>
                <input
                placeholder="Your Email"
                  type="email"
                  name="email"
                  id="email"
                  {...register("email")}
                />
              </div>

              <div className="flex flex-col items-start">
                <label htmlFor="password" className="ml-5">
                  Password
                </label>
                <input
                placeholder="Type Password"
                  type="password"
                  name="password"
                  id="password"
                  {...register("password")}
                />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="confirm-password" className="ml-5">
                  Confirm Password
                </label>
                <input
                placeholder="Re-type Password"
                  type="password"
                  id="confirm-password"
                  {...register("confirmPassword")}
                />
              </div>
              <div className="!mt-8 ">
                <button
                  type="submit"
                  className="font-bold text-white py-3 rounded-full bg-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={disabled}
                >
                  Sign up
                </button>
              </div>
              <div>
                <p>
                  Already have an account?{" "}
                  <span
                    className="text-primary hover:underline cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    Login
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

export default Signup;
