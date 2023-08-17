import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoUploadComponent from "./VideoUploadComponent";
import { VideoContext } from "../context/VideoContext";
import { getLocalStorageData, transcribeVideoUrlApi } from "../services";
import { postVideoUrl } from "../Locals";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrClose } from "react-icons/gr";
import SideMenu from "./SideMenu";

function UploadUrl() {
  const navigate = useNavigate();

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

  const [menuOpen, setMenuOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [localStorageData, setLocalStorageData] = useState({});
  useEffect(() => {
    const localStorageData = getLocalStorageData();
    setLocalStorageData(localStorageData);
  }, []);

  console.log("localStorageData all data", localStorageData?.length);

  const handleVideoUpload = (videoFile) => {
    // add this functuonlity later -- upload video file

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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

      console.log("existingData before push", existingData);

      // Ensure that existingData is an array
      if (!Array.isArray(existingData)) {
        existingData = [];
      }

      // Add the new data object to the array
      existingData.push(data);

      // Save the updated array back to local storage
      localStorage.setItem("videoCredentials", JSON.stringify(existingData));

      setLoading(false);

      console.log("existingData after push", existingData);

      await navigate("/Editor"); // or use setTimeout
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      {/* Side Menu */}
      <div
        className={`${
          menuOpen ? "w-2/12" : "w-0"
        } h-full transition-all duration-300 overflow-hidden fixed top-0 left-0 z-10 bg-white`}
      >
        <SideMenu toggleMenu={toggleMenu} />
      </div>

      {/* Main Content */}
      <div className="bg-white w-[600px] h-[auto] rounded-xl flex flex-col gap-4 p-10  shadow-2xl">
        {/* Hamburger menu and close icon */}

        {localStorageData?.length !== undefined ? (
          menuOpen !== true ? (
            <RxHamburgerMenu
              size={25}
              className="cursor-pointer absolute top-4 left-4"
              onClick={toggleMenu}
            />
          ) : (
            <GrClose
              size={25}
              className="cursor-pointer absolute top-4 left-4"
              onClick={toggleMenu}
            />
          )
        ) : (
          ""
        )}

        <h2 className="text-center text-2xl">Video Upload</h2>

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

        <h2 className="text-center text-2xl">Paste Url</h2>

        <input
          type="text"
          placeholder="Please paste a valid youtube video URL"
          value={url || ""}
          className="border-[1.5px] p-2 rounded-md outline-none"
          onChange={handleUrlChange}
          // disabled={uploadedVideo !== null}
        />

        {invalidUrl && url !== "" && (
          <p className="text-red-600 text-sm">{invalidUrl}</p>
        )}

        {loading ? (
          <div className="flex flex-row justify-center items-center text-center p-2">
            <img
              src="https://cdn.dribbble.com/users/1018473/screenshots/3963419/loader.gif"
              className="h-[100px] w-[200px] object-cover text-center"
            />
          </div>
        ) : (!invalidUrl && url) || uploadedVideo ? (
          <div className="flex flex-row justify-between">
            <h3 className="truncate w-9/12">{url || uploadedVideo?.path}</h3>
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
}

export default UploadUrl;
