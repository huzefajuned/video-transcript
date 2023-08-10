import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoUploadComponent from "./VideoUploadComponent";
import { VideoContext } from "../context/VideoContext";

function UploadUrl() {
  const {
    url,
    setUrl,
    uploadedVideo,
    setUploadedVideo,
    invalidUrl,
    setInvalidUrl,
  } = useContext(VideoContext);

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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white w-[600px] h-[auto] rounded-xl flex flex-col gap-4 p-10  shadow-2xl">
        <h2 className="text-center text-2xl">Video Upload</h2>

        <VideoUploadComponent onVideoUpload={handleVideoUpload} />

        <h3 className="text-center text-lg">Or</h3>

        <h2 className="text-center text-2xl">Paste Url</h2>

        <input
          type="text"
          placeholder="Please paste a valid URL"
          value={url || ""}
          className="border-[1.5px] p-2 rounded-md outline-none"
          onChange={handleUrlChange}
          disabled={uploadedVideo !== null}
        />

        {invalidUrl && url !== "" && (
          <p className="text-red-600 text-sm">{invalidUrl}</p>
        )}

        {(!invalidUrl && url) || uploadedVideo ? (
          <div className=" flex flex-row justify-between">
            <h3 className="truncate w-9/12">{url || uploadedVideo?.path}</h3>
            <button
              className="bg-primaryColor text-black p-2 rounded-md hover:bg-blue-600 hover:text-white "
              onClick={() => navigate("/Editor")}
            >
              Continue
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default UploadUrl;
