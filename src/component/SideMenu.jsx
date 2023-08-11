import React, { useEffect, useState } from "react";
import { getStatusUrl } from "../Locals";
import { videoStatusApi } from "../services";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate();
  const [videoApiData, setVideoApiData] = useState();
  const [videoCredential, setVideoCredential] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("videoCredentials"));
    setVideoCredential(data);
  }, []);

  useEffect(() => {
    console.log("useEffect inside menu");

    // do api call

    async function fetchVideoApi(videoCredential) {
      try {
        const apiUrl = getStatusUrl; // Call the function to get the API URL
        const data = await videoStatusApi(apiUrl, videoCredential);
        setVideoApiData(data);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchVideoApi(videoCredential);
  }, [videoCredential]);

  console.log("videoApiData", videoApiData);

  return (
    <div className="w-[90%] mt-10 ml-4 border-2 border-white rounded-md overflow-hidden shadow-lg">
      <div className="flex flex-col  rounded-md  bg-white  shadow-lg">
        <button
          onClick={() => navigate("/")}
          className="p-2 text-sm text-gray-600 hover:text-gray-800 transition duration-300"
        >
          Go Back
        </button>
        <h3 className="cursor-pointer p-4 w-full text-center text-xl font-semibold text-gray-800">
          Video Name:
          <span className="inline-block mt-2 px-4 py-2 text-white  rounded-md bg-slate-700 text-lg">
            {videoCredential["title"]}
          </span>
        </h3>

        <div className="p-4 w-full text-center">
          <h3 className="text-lg font-medium text-gray-700">Video Status</h3>
          {videoApiData?.["status"] && (
            <span className="inline-block mt-2 px-4 py-2 text-white  rounded-md bg-slate-700 text-lg">
              {videoApiData["status"]} 🤔
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
