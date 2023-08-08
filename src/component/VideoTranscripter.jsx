import React, { useContext, useEffect } from "react";
import { VideoContext } from "../context/VideoContext";
import { useNavigate } from "react-router-dom";
import { transcribeVideo } from "../services";
import YouTubeVideoPlayer from "./YoutubeVideoPlayer";

function VideoTranscripter() {
  const navigate = useNavigate();

  // Call the function
  async function transcribeVideoApiCall() {
    try {
      const transcriptionResult = await transcribeVideo();
      console.log(transcriptionResult);
    } catch (error) {
      console.error("Transcription failed:", error);
    }
  }
  // useEffect(() => {
  //   console.log("api started inisde useEffect");
  //   transcribeVideoApiCall();
  // }, []);

  const { url, uploadedVideo } = useContext(VideoContext);
  useEffect(() => {
    if (!uploadedVideo && !url) {
      navigate("/");
    }
  }, []);
  return (
    <div className="bg-secondayColor h-screen w-screen flex flex-row justify-center">
      <div className="w-1/2 ">
        {url && <YouTubeVideoPlayer url={url || uploadedVideo} />}
      </div>
      <div className="w-1/2 ">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut error
          dolorem consectetur quos nisi voluptate commodi in nesciunt modi eaque
          consequuntur ullam, aliquam rerum optio et iste totam soluta eos.
        </p>
      </div>
    </div>
  );
}

export default VideoTranscripter;
