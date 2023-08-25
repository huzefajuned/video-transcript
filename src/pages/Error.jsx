import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Error = () => {
  const navigate = useNavigate();
  function navToHome() {
    toast.info("Navigate to Home !");
    navigate("/");
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-600">
        Oops! The page you're looking for does not exist.
      </p>
      <button
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring"
        onClick={() => navToHome()}
      >
        Go To Home
      </button>
    </div>
  );
};

export default Error;
