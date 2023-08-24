import React, { useState } from "react";
import bgImg from "../assets/images/loginBg.png";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const Login = () => {
  const [psdVisible, setPsdVisible] = useState(false);
  function onChangeVisibility() {
    setPsdVisible(!psdVisible);
  }
  return (
    <div className="flex flex-row items-center justify-between  p-[1px] w-screen h-screen">
      <div className="w-1/2 flex items-center justify-center h-screen ">
        <form className="p-8 bg-white  rounded-md flex flex-col gap-4">
          <h2 className="text-3xl font-semibold">Login</h2>
          <p className="text-lg text-borderColor">
            Welcome Back, please login to your account
          </p>
          <div className="">
            <label className="block mb-1 font-medium text-borderColor">
              Email Address
            </label>
            <input
              type="text"
              className="w-full p-2 border border-borderColor rounded-md focus:outline-none focus:ring focus:border-blue-200"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-borderColor">
              Password
            </label>
            <div className="flex flex-row gap-1 items-center justify-between relative ">
              <input
                type={psdVisible ? "text" : "password"}
                className="w-full p-2 border border-borderColor rounded-md focus:outline-none focus:ring focus:border-blue-200"
              />
              {psdVisible ? (
                <AiFillEye
                  size={30}
                  className="absolute right-0 flex cursor-pointer text-borderColor"
                  onClick={() => onChangeVisibility()}
                />
              ) : (
                <AiFillEyeInvisible
                  size={30}
                  className="absolute right-0 flex cursor-pointer  text-borderColor"
                  onClick={() => onChangeVisibility()}
                />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring"
          >
            Login
          </button>

          <p>
            Don't have an Account ?{" "}
            <span className="text-primaryColor">Sign Up</span>
          </p>
          <p className="text-primaryColor "> Forgot Password</p>
        </form>
      </div>
      <div className="w-1/2  h-screen   flex items-center justify-center ">
        <img
          src={bgImg}
          alt="Random"
          className="h-[90%] w-[90%] object-fill  p-[10px] rounded-lg bg-gradient-to-b from-primaryColor border-[0.5px]  border-gray-200"
        />
      </div>
    </div>
  );
};

export default Login;
