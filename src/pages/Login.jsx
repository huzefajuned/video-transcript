import React, { useEffect, useState } from "react";
import bgImg from "../assets/images/loginBg.png";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { HiOutlineMailOpen } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [psdVisible, setPsdVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // if user already loggged in -- redirect to Home page
  useEffect(() => {
    if (localStorage.getItem("auth_User")) {
      navigate("/Home");
    }
  }, []);

  //  create a valid user , using email & strong password ( localstorage )
  function onSubmitLogin(e) {
    e.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!email || !password) {
      toast.error("Both email and password are required.");
      return;
    }

    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!passwordPattern.test(password)) {
      toast.error(
        "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit."
      );
      return;
    }

    const userObject = {
      cred: {
        email,
        password,
      },
    };

    localStorage.setItem("auth_User", JSON.stringify(userObject));

    toast.success(`Welcome back! ${email}`);
    navigate("/Home");
  }

  // show & hide password in input tage using icons---
  function onChangeVisibility() {
    setPsdVisible(!psdVisible);
  }

  return (
    <div className="flex flex-row items-center justify-between h-screen w-screen  p-10 gap-10">
      <div className="w-6/12  flex items-center  p-10 h-full ">
        <form className=" flex  flex-col justify-center  gap-3 w-full max-w-sm p-8 h-full   rounded-md">
          <div className="flex flex-col gap-3  mb-2 ">
            <h2 className="text-4xl font-semibold">Login</h2>
            <p className="text-base   font-light text-textColor">
              Welcome Back, please login to your account
            </p>
          </div>
          <div className="">
            <label className="block mb-2 text-base   font-light text-textColor">
              Email Address
            </label>
            <div className="flex flex-row gap-1 items-center justify-between relative">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="text"
                className="w-full p-2 border-2 border-borderColor rounded-md focus:outline-none   focus:border-primaryColor"
              />
              <HiOutlineMailOpen
                size={30}
                className="absolute right-0 flex cursor-pointer text-borderColor pr-2"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-base   font-light text-textColor">
              Password
            </label>
            <div className="flex flex-row gap-1 items-center justify-between relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type={psdVisible ? "text" : "password"}
                className="w-full p-2 border-2 border-borderColor rounded-md focus:outline-none   focus:border-primaryColor"
              />
              {psdVisible ? (
                <AiFillEye
                  size={30}
                  className="absolute right-0 flex cursor-pointer text-borderColor pr-2"
                  onClick={() => onChangeVisibility()}
                />
              ) : (
                <AiFillEyeInvisible
                  size={30}
                  className="absolute right-0 flex cursor-pointer text-borderColor pr-2"
                  onClick={() => onChangeVisibility()}
                />
              )}
            </div>
          </div>
          <div className="flex items-center  mb-2">
            <input
              type="checkbox"
              name="tick"
              value="x"
              className="h-5 w-5 mr-2 cursor-pointer rounded-xl outline-none border-none"
            />
            <label className="text-base   font-light text-textColor">
              Keep me logged in.
            </label>
          </div>
          <button
            onClick={(e) => onSubmitLogin(e)}
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring"
          >
            Login
          </button>
          <div className="mt-2">
            <p className="text-base   font-light text-textColor">
              Don't have an Account?
              <span
                className="text-primaryColor ml-2 cursor-pointer hover:text-blue-600 "
                onClick={() => toast.info("Sing-Up")}
              >
                Sign Up
              </span>
            </p>
            <p
              className="text-primaryColor cursor-pointer hover:text-blue-600 "
              onClick={() => toast.info("Forgot Password")}
            >
              Forgot Password
            </p>
          </div>
        </form>
      </div>
      <div className="w-6/12 flex items-center justify-center   h-full p-10 shadow-sm   rounded-xl bg-gradient-to-b from-blue-300 to-blue-50">
        <img src={bgImg} alt="Random" className="object-fill" />
      </div>
    </div>
  );
};

export default Login;
