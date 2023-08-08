import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

const buttonType = ["Play", "Pause", "Fast"];

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function YouTubeVideoPlayer({ url }) {
  const [play, setPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && play) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [play]);

  function handleButtonClick(btn) {
    if (btn === "Play") {
      setPlay(true);
    } else if (btn === "Pause") {
      setPlay(false);
    } else if (btn === "Fast") {
      if (playerRef.current) {
        playerRef.current.seekTo(currentTime + 10);
      }
    }
  }

  function handleProgressBarChange(e) {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (playerRef.current) {
      playerRef.current.seekTo(newTime);
    }
  }

  return (
    <div className="p-5 h-full w-full ">
      <div className="bg-slate-300 p-5 rounded-md">
        <ReactPlayer
          ref={playerRef}
          url={url}
          playing={play}
          width="100%"
          onDuration={(duration) => setDuration(duration)}
        />
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleProgressBarChange}
          className="w-full mt-2"
        />
        <div className="flex flex-row gap-10 ">
          {buttonType.map((btn) => (
            <button
              key={btn}
              onClick={() => handleButtonClick(btn)}
              className="border border-gray-300 rounded-md p-2 hover:bg-blue-200"
            >
              {btn}
            </button>
          ))}
          <p className="text-gray-600">
            {formatTime(Math.floor(currentTime))} / {formatTime(duration)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default YouTubeVideoPlayer;
