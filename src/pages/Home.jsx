import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoUploadComponent from "../component/VideoUploadComponent";
import { VideoContext } from "../context/VideoContext";
import { getLocalStorageData, transcribeVideoUrlApi } from "../services";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();

  const postVideoUrl = process.env.REACT_APP_PostVideoUrl;

  const {
    url,
    setUrl,
    uploadedVideo,
    setUploadedVideo,
    invalidUrl,
    setInvalidUrl,
    loadProcess,
    setLoadProcess,
  } = useContext(VideoContext);

  const [loading, setLoading] = useState(false);
  const [localStorageData, setLocalStorageData] = useState({});

  // later user ( only for video upload )
  const handleVideoUpload = (videoFile) => {
    return;
    if (videoFile) {
      const reader = new FileReader();
      const fileSize = videoFile.size;
      let bytesLoaded = 0;

      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          bytesLoaded = event.loaded;
          const percentage = (bytesLoaded / fileSize) * 100;
          setLoadProcess(percentage.toFixed(2));
        }
      };

      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        setUploadedVideo(base64String);
      };

      reader.readAsDataURL(videoFile);
    }
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

  function handleViewPreviousVideo() {
    setLoading(true);
    setTimeout(() => {
      navigate("/Editor");
      setLoading(false);
    }, 2000);
  }

  async function fetchVideoApi(postVideoUrl, url) {
    setLoading(true);
    try {
      var data = await transcribeVideoUrlApi(postVideoUrl, url);

      // Add timestamp to the data object
      data.timestamp = new Date().getTime();

      // Get existing data from local storage (if any)
      const existingDataJSON = localStorage.getItem("videoCredentials");

      // Parse existing data as an array or initialize an empty array
      var existingData = [];
      if (existingDataJSON) {
        try {
          existingData = JSON.parse(existingDataJSON);
        } catch (parseError) {
          console.error("Error parsing existing data:", parseError);
        }
      }
      // Ensure that existingData is an array
      if (!Array.isArray(existingData)) {
        existingData = [];
      }
      // Add the new data object to the array
      existingData.push(data);
      // Save the updated array back to local storage
      localStorage.setItem("videoCredentials", JSON.stringify(existingData));

      setLoading(false);
      // navigating after 1 sec delay--
      setTimeout(() => {
        navigate("/uploads");
        setUrl("");
        toast.success("Video added successfully !");
      }, 1000);
      // navigate("/ViewVideo", { state: { data } });
      // sending current response as state in  next route // to diplay in video player
      // or use setTimeout
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-full bg-white">
      {/* Main Content */}
      <div className="bg-primaryColor border-2 border-borderColor  w-[90%] sm:w-[80%] md:w-[90%]  lg:w-[70%] xl:w-[60%] 2xl:w-[40%] rounded-xl flex flex-col gap-4 p-5 md:p-10 shadow-2xl ">
        <h2 className="text-center text-lg sm:text-lg md:text-xl xl:text-xl lg:text-2xl">
          Video Upload
        </h2>

        <VideoUploadComponent onVideoUpload={handleVideoUpload} />
        {loadProcess > 0 && (
          <div className="mt-4">
            <input
              type="range"
              name="progress"
              id="progress"
              value={loadProcess}
              min="0"
              max="100"
              className="w-full bg-blue-200 appearance-none h-2 rounded-lg"
            />
            <div className="flex justify-between text-sm">
              <span>{loadProcess}%</span>
            </div>
          </div>
        )}
        <h3 className="text-center text-lg">Or</h3>

        <h2 className="text-center  text-lg sm:text-lg md:text-xl xl:text-xl lg:text-2xl">
          Paste Url
        </h2>

        <input
          type="text"
          placeholder="Please paste a valid youtube video URL"
          value={url || ""}
          className="border-[1.5px] p-2 rounded-md outline-none"
          onChange={handleUrlChange}
        />

        {invalidUrl && url !== "" && (
          <p className="text-red-600 text-sm">{invalidUrl}</p>
        )}

        {loading ? (
          <div className="flex flex-row justify-center items-center text-center p-2">
            <img
              src="https://i.pinimg.com/originals/48/6a/a0/486aa0fa1658b7522ecd8918908ece40.gif"
              className="h-[100px] w-[200px] object-cover text-center"
            />
          </div>
        ) : !invalidUrl && url ? (
          <div className="flex flex-row justify-between">
            <h3 className="truncate w-9/12">{url}</h3>
            <button
              className="bg-primaryColor text-black p-2 rounded-md hover:bg-blue-600 hover:text-white"
              onClick={() => fetchVideoApi(postVideoUrl, url)}
            >
              Continue
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
