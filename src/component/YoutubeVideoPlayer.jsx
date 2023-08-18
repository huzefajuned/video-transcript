import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { buttonType, formatTime } from "../constants";
import Notes from "./Notes";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { MdTimer10Select } from "react-icons/md";
import {
  BsFillVolumeUpFill,
  BsVolumeDownFill,
  BsVolumeMuteFill,
} from "react-icons/bs";
import CustomRangeInput from "./CustomRangeInput";

function YouTubeVideoPlayer({ url }) {
  const [play, setPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lastClickedButton, setLastClickedButton] = useState(null);
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
    } else if (btn === "Back 10s") {
      if (playerRef.current) {
        const newTime = Math.max(0, currentTime - 10);
        playerRef.current.seekTo(newTime);
        setCurrentTime(newTime);
      }
    } else if (btn === "Speed 2x") {
      if (playerRef.current) {
        // Set playbackRate through the state
        playerRef.current.seekTo(currentTime, "seconds");
        playerRef.current.getInternalPlayer().playbackRate = 2;
      }
    } else if (btn === "Volume Up") {
      if (playerRef.current) {
        const currentVolume = playerRef.current.getInternalPlayer().volume;
        const newVolume = Math.min(1, currentVolume + 0.1);
        playerRef.current.getInternalPlayer().volume = newVolume;
      }
    } else if (btn === "Fast") {
      if (playerRef.current) {
        playerRef.current.seekTo(currentTime + 10);
      }
    }

    setLastClickedButton(btn);
  }

  function handleProgressBarChange(e) {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (playerRef.current) {
      playerRef.current.seekTo(newTime);
    }
  }

  return (
    <div className=" w-full p-[1px] h-[90vh] ">
      <div className="p-0 m-0 ">
        <ReactPlayer
          ref={playerRef}
          url={url}
          playing={play}
          width="100%"
          onDuration={(duration) => setDuration(duration)}
        />
        <div className=" w-[90%] ml-[5%]">
          <CustomRangeInput
            min={0}
            max={duration}
            onChange={handleProgressBarChange}
            value={currentTime}
          />

          <div className=" flex flex-row justify-between">
            <p className="text-black text-base">00:00</p>
            <p className="text-black text-2xl font-bold">
              {formatTime(Math.floor(currentTime))}
            </p>
            <p className="text-black text-base">{formatTime(duration)}</p>
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-3 justify-between border-[1px] border-r-0 border-l-0 mt-4 ">
          {play ? (
            <button className="text-sm border-l-[2px] text-center  w-[100px] p-[3px] flex flex-col items-center justify-center text-gray-600 ">
              <div
                onClick={() => setPlay(false)}
                className="flex items-center justify-center"
              >
                <p className="text-2xl text-center">
                  <AiFillPauseCircle />
                </p>
              </div>
              <span className="text-lg">Pause</span>
            </button>
          ) : (
            <button className="text-sm border-l-[2px] text-center  w-[100px] p-[3px] flex flex-col items-center justify-center text-gray-600">
              <div
                onClick={() => setPlay(true)}
                className="flex items-center justify-center"
              >
                <p className="text-2xl text-center">
                  <AiFillPlayCircle />
                </p>
              </div>
              <span className="text-lg">Play</span>
            </button>
          )}

          <button className="text-sm border-l-[2px] text-center  w-[100px] p-[3px] flex flex-col items-center justify-center text-gray-600">
            <div className="flex items-center justify-center">
              <p className="text-2xl text-center">
                <MdTimer10Select />
              </p>
            </div>
            <span className="text-lg">Back 10s</span>
          </button>

          <button className="text-sm border-l-[2px] text-center  w-[100px] p-[3px] flex flex-col items-center justify-center text-gray-600">
            <div className="flex items-center justify-center">
              <p className="text-2xl text-center">
                <AiFillPauseCircle />
              </p>
            </div>
            <span className="text-lg">1X Speed</span>
          </button>

          <button className="text-sm border-l-[2px] text-center  w-[100px] p-[3px] flex flex-col items-center justify-center text-gray-600">
            <div className="flex items-center justify-center">
              <p className="text-2xl text-center">
                <BsFillVolumeUpFill />
              </p>
            </div>
            <span className="text-lg">Volume</span>
          </button>

          {/* {buttonType.map((btn) => (
            <button
              key={btn.id}
              onClick={() => handleButtonClick(btn.name)}
              className={`text-sm border-l-[2px] text-center  w-[100px] p-[3px] flex flex-col items-center justify-center${
                lastClickedButton === btn.name
                  ? "bg-green-500 text-blue-900"
                  : "bg-red-900"
              }`}
            >
              <div className="flex items-center justify-center">
                <p className="text-2xl text-center">{btn.icon}</p>
              </div>
              <span className="text-lg">{btn.name}</span>
            </button>
          ))} */}
        </div>
        <Notes />
      </div>
    </div>
  );
}

export default YouTubeVideoPlayer;
