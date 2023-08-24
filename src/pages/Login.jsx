import React, { useState } from "react";
import bgImg from "../assets/images/loginBg.png";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [psdVisible, setPsdVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();

  function onSubmitLogin(e) {
    e.preventDefault();
    // do some validation before auth
    console.log(`email is ${email} & password is ${password}`);

    if (email && password) {
      localStorage.setItem("auth_User", {
        cred: {
          email: email,
          password: password,
        },
        status: true,
      });
      alert(`Welcome back! ${email}`);
      navigation("/");
    }
  }

  function onChangeVisibility() {
    setPsdVisible(!psdVisible);
  }
  return (
    <div className="flex flex-row items-center justify-between  ">
      <div className="w-5/12 flex items-center justify-center  ">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
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
                  className="absolute right-0 flex 
                  cursor-pointer  text-borderColor"
                  onClick={() => onChangeVisibility()}
                />
              )}
            </div>
          </div>
          <button
            onClick={(e) => onSubmitLogin(e)}
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
      <div className="w-7/12  h-screen   flex items-center justify-center ">
        <img
          src={bgImg}
          alt="Random"
          className="h-[70%] w-[90%] object-fill  rounded-lg bg-gradient-to-b from-primaryColor border-[0.5px] p-2  border-gray-100"
        />
      </div>
    </div>
  );
};

export default Login;
