import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useForm from "react-hook-form";
import authService from "../appwrite/auth_services";
import { Logo, Input, Button } from "./index";

export const SingUp = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //This syntax for useForm() and register is method and they return something 
  //handleSumbmit also method and it is mandatory to write both method otherwise 
  //they not execute or give error..
  const { register, handleSubmit } = useForm();    

  const singup = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        {/* handleSumit is method but they return always our function  */}
        <form onSubmit={handleSubmit(singup)}>
          <div className="space-y-8">
            <Input
              label="Name: "
              type="text"
              placeholder="Enter your name"

              // register are method and always they return somthing and the syntax of register is 
              //below and always write in this way.
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,

                // pattern for validation of email for some properties.
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button
            type="submit"
            className="w-full"
            >Sing In</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
