import React, { useEffect, useState } from "react";
import { getStatusUrl } from "../Locals";
import { videoStatusApi } from "../services";
import { useNavigate } from "react-router-dom";
import { GrClose } from "react-icons/gr";

const SideMenu = ({ toggleMenu }) => {
  const navigate = useNavigate();
  const [videoApiData, setVideoApiData] = useState([]);
  const [videoCredentials, setVideoCredentials] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("videoCredentials"));
    if (Array.isArray(data)) {
      setVideoCredentials(data);
    } else {
      setVideoCredentials([]);
    }
  }, []);

  useEffect(() => {
    async function fetchVideoApi(videoCredential) {
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
      Promise.all(videoCredentials.map(fetchVideoApi))
        .then((responses) => {
          setVideoApiData(responses);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [videoCredentials]);

  function handleOpenVideo(videoCredential) {
    navigate("/Editor", { state: { videoCredential } });
  }

  return (
    <div className="w-[90%] mt-10 mx-auto overflow-hidden shadow-lg h-full">
      {videoCredentials.map((videoCredential, index) => (
        <div
          key={index}
          className="flex flex-col rounded-md bg-white shadow-md mb-4 border border-gray-200"
        >
          <button
            className="absolute top-2 left-2 text-gray-400"
            onClick={toggleMenu}
          >
            <GrClose size={20} className="cursor-pointer" />
          </button>
          <h3 className="p-3 font-semibold text-lg text-black">
            {videoCredential["title"]}
          </h3>
          <div className="p-4 text-center">
            {videoApiData.length <= 0 ? (
              <h2>Please wait ...</h2>
            ) : (
              videoApiData[index]?.["status"] && (
                <span className="mt-2 px-4 py-2 text-black rounded-md text-lg">
                  {videoApiData[index]["status"]}
                </span>
              )
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
  );
};

export default SideMenu;
