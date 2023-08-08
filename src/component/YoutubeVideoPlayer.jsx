import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { buttonType, formatTime } from "../constants";

function YouTubeVideoPlayer({ url }) {
  const [play, setPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lastClickedButton, setLastClickedButton] = useState(null); // State to track the last clicked button
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

    setLastClickedButton(btn); // Update the last clicked button
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
      <div className="bg-slate-100 p-5 rounded-md">
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
              key={btn.id}
              onClick={() => handleButtonClick(btn.name)}
              className={`border border-gray-300 rounded-md p-2  ${
                lastClickedButton === btn.name ? "bg-green-500 text-white" : ""
              }`}
            >
              <p className="text-2xl">{btn.icon}</p>
              {btn.name}
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
