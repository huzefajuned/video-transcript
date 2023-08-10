import React, { useContext, useEffect, useState } from "react";
import { VideoContext } from "../context/VideoContext";
import { useNavigate } from "react-router-dom";
import YouTubeVideoPlayer from "./YoutubeVideoPlayer";
import Header from "./Header";
import { fakeTranscript } from "../constants";

function VideoTranscripter() {
  const { url, uploadedVideo } = useContext(VideoContext);
  const navigate = useNavigate();
  const [videoURL, setVideoURL] = useState(null);

  useEffect(() => {
    if (uploadedVideo !== null) {
      const videoURL = URL.createObjectURL(uploadedVideo);
      setVideoURL(videoURL);
    }
  }, [uploadedVideo]);

  useEffect(() => {
    if (!uploadedVideo && !url) {
      navigate("/");
    }
  }, [navigate, uploadedVideo, url]);

  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <div className="flex gap-10 ">
        <div className="w-5/12 border-r-2">
          {url || videoURL ? (
            <YouTubeVideoPlayer url={url || videoURL} />
          ) : null}
        </div>
        <div className="w-5/12">
          <div className=" rounded  p-4 h-full">
            <div className="overflow-auto h-full">
              {fakeTranscript.map((entry, index) => (
                <div key={index} className="mb-1">
                  <div className="flex items-center mb-1 gap-10">
                    <p className="font-medium text-blue-700 text-xl">
                      {entry.speaker}:
                    </p>
                    <p className="text-gray-400 text-lg">{entry.time}</p>
                  </div>
                  <p className="text-gray-800 text-base">{entry.text}</p>
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
