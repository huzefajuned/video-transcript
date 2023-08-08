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
      const video__URL = URL?.createObjectURL(uploadedVideo);
      setVideoURL(video__URL);
    }
    // it will chnage uplaoed video to URL
  }, [uploadedVideo]);

  useEffect(() => {
    if (!uploadedVideo && !url) {
      navigate("/");
    }
  }, []);
  return (
    <div className="bg-secondayColor h-full w-full flex flex-col">
      <Header />
      <div className="bg-secondayColor flex flex-row">
        <div className="w-1/2 ">
          {/*fix this issue in one--- */}
          {url && <YouTubeVideoPlayer url={url} />}
          {videoURL && <YouTubeVideoPlayer url={videoURL} />}
        </div>
        <div className="w-1/2">
          <div className="p-4 max-w-md mx-auto border rounded shadow mt-5">
            <h2 className="text-xl font-semibold mb-4">Video Transcript</h2>
            <div className="space-y-4">
              {fakeTranscript.map(
                (
                  entry,
                  index //
                ) => (
                  <div key={index} className="flex">
                    <div className="w-1/4 font-medium">{entry.speaker}:</div>
                    <div className="w-3/4">{entry.text}</div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoTranscripter;
