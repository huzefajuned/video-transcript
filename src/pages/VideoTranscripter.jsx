import React, { useContext, useEffect, useState } from "react";
import { VideoContext } from "../context/VideoContext";
import YouTubeVideoPlayer from "../component/YoutubeVideoPlayer";
import { fakeTranscript } from "../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { getLocalStorageData, videoStatusApi } from "../services";
import { getStatusUrl } from "../Locals";

function VideoTranscripter() {
  const location = useLocation();
  // const [url_state, setUrlState] = useState(null);
  const [selectedCurrentVideo, setSelectedCurrentVideo] = useState(null);
  const [selectedCurrentVideoStatus, setSelectedCurrentVideoStatus] =
    useState(null);

  const { url, uploadedVideo } = useContext(VideoContext);
  const navigate = useNavigate();
  const [videoURL, setVideoURL] = useState(null);
  const [localStorageData, setLocalStorageData] = useState({});

  // get status of current video --
  useEffect(() => {
    // this api is for getting status or transcript of already pushed video url---
    async function fetchVideoApi(setSelectedCurrentVideo) {
      // console.log("fetchVideoApi hit");
      try {
        const apiUrl = getStatusUrl; // Call the function to get the API URL
        const data = await videoStatusApi(apiUrl, setSelectedCurrentVideo);
        await setSelectedCurrentVideoStatus(data);
        // return data; // Return the API response
      } catch (error) {
        console.log("error", error);
        return {}; // Return an empty object in case of error
      }
    }
    fetchVideoApi(selectedCurrentVideo);
  }, [selectedCurrentVideo]);
  useEffect(() => {
    if (location.state !== null) {
      let videoCredential = location.state["videoCredential"];
      setSelectedCurrentVideo(videoCredential);
      console.log("test 1");
    } else {
      console.log("test 2");
      console.log("location.state after2 ", location.state);

      navigate("/");
    }
  }, [location.state]);

  useEffect(() => {
    if (uploadedVideo !== "") {
      const videoURL = URL.createObjectURL(uploadedVideo);
      setVideoURL(videoURL);
    }
  }, [uploadedVideo]);

  useEffect(() => {
    const localStorageData = getLocalStorageData();
    setLocalStorageData(localStorageData);
    if (localStorageData !== {} || localStorageData !== null) {
      // console.log("ok");
    } else if (!url) {
      navigate("/");
      console.log("test 3");
    }
  }, [navigate, uploadedVideo, url]);

  const { link, title } = localStorageData;
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/3 border-r-2">
          {url || videoURL || link || selectedCurrentVideo?.link ? (
            <YouTubeVideoPlayer
              url={url || videoURL || link || selectedCurrentVideo?.link}
            />
          ) : null}
        </div>
        <div className="w-full md:w-5/12 p-10">
          <div className="rounded h-full overflow-hidden">
            <div className="overflow-auto h-full  block">
              {fakeTranscript ? (
                <div className="h-full w-full flex justify-center items-center ">
                  {selectedCurrentVideoStatus?.[1] !== undefined ? (
                    selectedCurrentVideoStatus?.[1]
                  ) : selectedCurrentVideoStatus?.status ? (
                    selectedCurrentVideoStatus?.status
                  ) : (
                    <h2 className="text-center  p-4">
                      Please wait, we are processing your request{" "}
                    </h2>
                  )}
                </div>
              ) : (
                fakeTranscript.map((entry, index) => (
                  <div
                    key={index}
                    className="mb-1 border-b-[1px] pb-2 border-b-[#8c8d8d]"
                  >
                    <div className="flex flex-col md:flex-row items-center md:mb-1 gap-10">
                      <p className="text-[#5730d8] text-2xl font-bold md:w-2/6">
                        {entry.speaker}:
                      </p>
                      <p className="text-gray-400 text-xl font-bold md:w-4/6">
                        {entry.time}
                      </p>
                    </div>
                    <p className="text-gray-800 text-base ">{entry.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoTranscripter;
