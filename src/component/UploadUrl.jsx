import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoUploadComponent from "./VideoUploadComponent";
import { VideoContext } from "../context/VideoContext";
import { getLocalStorageData, transcribeVideoUrlApi } from "../services";
import { postVideoUrl } from "../Locals";

function UploadUrl() {
  const {
    url,
    setUrl,
    uploadedVideo,
    setUploadedVideo,
    invalidUrl,
    setInvalidUrl,
  } = useContext(VideoContext);

  const [loading, setLoading] = useState(false);
  const [localStorageData, setLocalStorageData] = useState({});
  useEffect(() => {
    const localStorageData = getLocalStorageData();
    setLocalStorageData(localStorageData);
  }, []);

  const navigate = useNavigate();

  const handleVideoUpload = (videoFile) => {
    setUploadedVideo(videoFile);
  };

  const handleUrlChange = (e) => {
    const inputValue = e.target.value;
    setUrl(inputValue);

    // Check if the input value is a valid URL
    try {
      new URL(inputValue);
      setInvalidUrl(""); // Clear any previous errors
    } catch (error) {
      setInvalidUrl("Invalid URL"); // Set an error message for invalid URLs
    }
  };

  function handleViewPrevoisVideo() {
    setLoading(true);
    setTimeout(() => {
      navigate("/Editor");
      setLoading(false);
    }, 2000);
  }

  async function fetchVideoApi(postVideoUrl, url) {
    setLoading(true);
    try {
      const data = await transcribeVideoUrlApi(postVideoUrl, url);
      await localStorage.setItem("videoCredentials", JSON.stringify(data));
      setLoading(false);
      await navigate("/Editor"); // or use settimout
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  }
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <div className="bg-white w-[600px] h-[auto] rounded-xl flex flex-col gap-4 p-10  shadow-2xl">
          <h2 className="text-center text-2xl">Video Upload</h2>

          <VideoUploadComponent onVideoUpload={handleVideoUpload} />

          <h3 className="text-center text-lg">Or</h3>

          <h2 className="text-center text-2xl">Paste Url</h2>

          <input
            type="text"
            placeholder="Please paste a valid youtube video URL"
            value={url || ""}
            className="border-[1.5px] p-2 rounded-md outline-none"
            onChange={handleUrlChange}
            disabled={uploadedVideo !== null}
          />

          {invalidUrl && url !== "" && (
            <p className="text-red-600 text-sm">{invalidUrl}</p>
          )}

          {loading ? (
            <div className=" flex flex-row justify-center items-center text-center p-2">
              <img
                src="https://cdn.dribbble.com/users/1018473/screenshots/3963419/loader.gif"
                className="h-[100px] w-[200px] object-cover text-center"
              />
            </div>
          ) : (!invalidUrl && url) || uploadedVideo ? (
            <div className=" flex flex-row justify-between">
              <h3 className="truncate w-9/12">{url || uploadedVideo?.path}</h3>
              <button
                className="bg-primaryColor text-black p-2 rounded-md hover:bg-blue-600 hover:text-white "
                // onClick={() => navigate("/Editor")}
                onClick={() => fetchVideoApi(postVideoUrl, url)}
              >
                Continue
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {localStorageData && (
        <div className=" w-full absolute top-2 flex flex-row justify-end">
          <button
            onClick={() => handleViewPrevoisVideo()}
            className="text-black border-gray-400 mr-2 p-3   text-xl rounded-md bg-gray-200 hover:bg-gray-400 shadow-md transition duration-300 ease-in-out"
          >
            {loading ? "Please wait...." : "See Previous Video Status"}
          </button>
        </div>
      )}
    </>
  );
}

export default UploadUrl;
