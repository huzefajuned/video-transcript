import React, { useContext, useEffect, useState } from "react";
import { VideoContext } from "../context/VideoContext";
import { useNavigate } from "react-router-dom";
import YouTubeVideoPlayer from "./YoutubeVideoPlayer";
import Header from "./Header";
import { fakeTranscript } from "../constants";
import SideMenu from "../component/SideMenu";
import { getLocalStorageData } from "../services";

function VideoTranscripter() {
  const { url, uploadedVideo } = useContext(VideoContext);
  const navigate = useNavigate();
  const [videoURL, setVideoURL] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [localStorageData, setLocalStorageData] = useState({});

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (uploadedVideo !== null) {
      const videoURL = URL.createObjectURL(uploadedVideo);
      setVideoURL(videoURL);
    }
  }, [uploadedVideo]);

  useEffect(() => {
    const localStorageData = getLocalStorageData();
    setLocalStorageData(localStorageData);
    if (localStorageData !== {} || localStorageData !== null) {
      console.log("ok");
    } else if (!uploadedVideo && !url) {
      navigate("/");
    }
  }, [navigate, uploadedVideo, url]);

  const { link, title } = localStorageData;
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header toggleMenu={toggleMenu} menuOpen={menuOpen} />
      <div className="flex gap-10 ">
        {/* Side Menu */}
        <div
          className={`${
            menuOpen ? "w-2/12" : "w-0"
          } h-full  transition-all duration-300 overflow-hidden`}
        >
          <SideMenu />
        </div>

        <div className="w-4/12 border-r-2">
          {url || videoURL || link ? (
            <YouTubeVideoPlayer url={url || videoURL || link} />
          ) : null}
        </div>
        <div className="w-5/12 p-10">
          <div className="rounded h-full">
            <div className="overflow-auto h-full">
              {fakeTranscript.map((entry, index) => (
                <div
                  key={index}
                  className="mb-1 border-b-[1px] pb-2 border-b-[#8c8d8d]"
                >
                  <div className="flex items-center mb-1 gap-10">
                    <p className="text-[#5730d8] text-2xl font-bold">
                      {entry.speaker}:
                    </p>
                    <p className="text-gray-400 text-xl font-bold">
                      {entry.time}
                    </p>
                  </div>
                  <p className="text-gray-800 text-base ">{entry.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoTranscripter;
