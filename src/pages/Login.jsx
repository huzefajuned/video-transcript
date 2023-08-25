import React, { useState } from "react";
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

  function onSubmitLogin(e) {
    e.preventDefault();

    // Regular expression for email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Regular expression for password validation (at least 8 characters, containing at least one uppercase, one lowercase, one digit)
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

    localStorage.setItem(
      "auth_User",
      JSON.stringify({
        cred: {
          email: email,
          password: password,
        },
        status: true,
      })
    );

    toast.success(`Welcome back! ${email}`);
    navigate("/");
  }

  function onChangeVisibility() {
    setPsdVisible(!psdVisible);
  }
  return (
    <div className="flex flex-row items-center justify-between   ">
      <div className="w-5/12 flex items-center justify-center  h-screen  ">
        <form className="p-8 bg-white  rounded-md flex flex-col gap-4 ">
          <div className=" flex flex-col  gap-3  ">
            <h2 className="text-4xl font-semibold ">Login</h2>
            <p className="text-lg tracking-wider text-secondayColor ">
              Welcome Back, please login to your account
            </p>
          </div>
          <div className="">
            <label className="block mb-2 font-medium text-secondayColor">
              Email Address
            </label>
            <div className="flex flex-row gap-1 items-center justify-between relative  ">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="text"
                className="w-full p-2 border-2 border-borderColor rounded-md focus:outline-none focus:border-none focus:ring focus:border-blue-200"
              />
              <HiOutlineMailOpen
                size={30}
                className="absolute right-0 flex cursor-pointer text-borderColor pr-2"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-secondayColor">
              Password
            </label>
            <div className="flex flex-row gap-1 items-center justify-between relative ">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type={psdVisible ? "text" : "password"}
                className="w-full p-2 border-2 border-borderColor rounded-md focus:outline-none focus:border-none focus:ring focus:border-blue-200"
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
                  className="absolute right-0 flex 
                  cursor-pointer  text-borderColor pr-2"
                  onClick={() => onChangeVisibility()}
                />
              )}
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="tick"
              value="x"
              className="h-5 w-5 mr-2 cursor-pointer rounded-xl outline-none border-none"
            />
            <label className="text-secondayColor font-medium">
              Keep me logged in.
            </label>
          </div>

          <button
            onClick={(e) => onSubmitLogin(e)}
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring"
          >
            Login
          </button>

          <p>
            Don't have an Account ?
            <span className="text-primaryColor">Sign Up</span>
          </p>
          <p className="text-primaryColor "> Forgot Password</p>
        </form>
      </div>
      <div className="w-6/12  h-screen   flex items-center justify-center ">
        <img
          src={bgImg}
          alt="Random"
          className="h-[90%] p-[5%] w-[90%] object-fill  rounded-lg bg-gradient-to-b from-primaryColor border-[0.5px]  border-gray-100"
        />
      </div>
    </div>
  );
};

export default Login;
