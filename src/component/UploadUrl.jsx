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
    <div className="flex items-center justify-center min-h-screen bg-secondayColor">
      <div className="bg-white w-[500px] h-[auto] rounded-md flex flex-col gap-5 p-6 border-borderColor border-[1px] shadow-md">
        <h2 className="text-center text-2xl">
          Please Upload Video or Paste URL
        </h2>
        <input
          type="text"
          placeholder="Please paste a valid URL"
          value={url || ""}
          className="border-[1.5px] p-2 rounded-md outline-none"
          onChange={handleUrlChange}
        />

        {invalidUrl && url !== "" && (
          <p className="text-red-600 text-sm">{invalidUrl}</p>
        )}

        <VideoUploadComponent onVideoUpload={handleVideoUpload} />
        {(!invalidUrl && url) || uploadedVideo ? (
          <div className=" flex flex-row justify-between">
            <h3 className="truncate w-9/12">{url || uploadedVideo?.path}</h3>
            <button
              className="bg-primaryColor text-black p-2 rounded-md hover:bg-blue-600 hover:text-white "
              onClick={() => navigate("/Transcripter")}
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
