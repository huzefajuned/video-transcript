import React, { useEffect, useState } from "react";
import { getStatusUrl } from "../Locals";
import { videoStatusApi } from "../services";
import { useNavigate } from "react-router-dom";
import { GrClose } from "react-icons/gr";

const SideMenu = ({ menuOpen }) => {
  const navigate = useNavigate();
  const [videoApiData, setVideoApiData] = useState([]);
  const [videoCredentials, setVideoCredentials] = useState([]);
  // console.log("videoCredentials", videoCredentials);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("videoCredentials"));
    if (Array.isArray(data)) {
      setVideoCredentials(data);
    } else {
      setVideoCredentials([]);
    }
  }, []);

  useEffect(() => {
    // this api is for getting status or transcript of already pushed video url---
    async function fetchVideoApi(videoCredential) {
      // console.log("fetchVideoApi hit");
      try {
        const apiUrl = getStatusUrl; // Call the function to get the API URL
        const data = await videoStatusApi(apiUrl, videoCredential);
        return data; // Return the API response
      } catch (error) {
        console.log("error", error);
        return {}; // Return an empty object in case of error
      }
    }

    if (videoCredentials.length > 0) {
      // console.log("fetchVideoApi hit  2");

      Promise.all(videoCredentials.map(fetchVideoApi))
        .then((responses) => {
          setVideoApiData(responses);
          // console.log("responses in 3 promises ", responses);
          // console.log("fetchVideoApi hit  3");
        })
        .catch((error) => {
          console.log("error", error);
          // console.log("fetchVideoApi hit  4 error");
        });
    }
  }, [videoCredentials]);

  function handleOpenVideo(videoCredential) {
    navigate("/Editor", { state: { videoCredential } });
  }

  return (
    <div
      className={`${
        menuOpen
          ? " w-full sm:w-8/12 md:w-4/12  lg:w-2/12 xl:4/12 2xl:w-6/12"
          : "w-0"
      } h-full transition-all duration-300 fixed top-0 left-0 z-0 overflow-scroll no-scrollbar pt-[12%] sm:pt-[10%] md:pt-[6%] bg-white shadow-xl`}
    >
      <div className="w-[90%]  mx-auto   h-full  flex flex-col gap-10 ">
        {videoCredentials.map((videoCredential, index) => (
          <div
            key={index}
            className="flex flex-col rounded-md  shadow-md border border-gray-200 bg-gray-100"
          >
            <h3 className="p-3 font-semibold text-lg text-black">
              {videoCredential["title"]}
            </h3>
            <div className="p-4 text-center">
              {videoApiData.length <= 0 ? (
                <h2>Please wait ...</h2>
              ) : videoApiData[index]?.["status"] ? (
                <span className="mt-2 px-4 py-2 text-black rounded-md text-lg">
                  {videoApiData[index]["status"]}
                </span>
              ) : (
                <span className="mt-2 px-4 py-2 text-black rounded-md text-lg">
                  {videoApiData[index][index]["status"]}
                </span>
              )}
              <button
                className="mt-4 px-4 py-2 text-black rounded-md bg-slate-200"
                onClick={() => handleOpenVideo(videoCredential)}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
