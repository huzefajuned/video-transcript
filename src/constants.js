import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { MdTimer10Select } from "react-icons/md";
import {
  BsFillVolumeUpFill,
  BsVolumeDownFill,
  BsVolumeMuteFill,
} from "react-icons/bs";

export const buttonType = [
  {
    id: 1,
    name: "Play",
    icon: <AiFillPlayCircle />,
  },
  {
    id: 2,
    name: "Pause",
    icon: <AiFillPauseCircle />,
  },
  {
    id: 3,
    name: "Back 10s",
    icon: <MdTimer10Select />,
  },
  {
    id: 4,
    name: "Speed 2x",
    icon: <AiFillPauseCircle />,
  },
  {
    id: 5,
    name: "Volume Up",
    icon: <BsFillVolumeUpFill />,
  },
  // },
  // {
  //   id: 6,
  //   name: "Volume Down",
  //   icon: <BsVolumeDownFill />,
  // },

  // {
  //   id: 7,
  //   name: "Mute",
  //   icon: <BsVolumeMuteFill />,
  // },
];

export function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export const fakeTranscript = [
  {
    time: "00:00",
    speaker: "John",
    text: "Hello everyone, welcome to our meeting.",
  },
  {
    time: "00:12",
    speaker: "Alice",
    text: "Hi John, glad to be here!",
  },
  {
    time: "00:24",
    speaker: "Alice",
    text: "That's great to hear! How are we doing on the timeline?",
  },
  {
    time: "00:36",
    speaker: "Eva",
    text: "We're slightly ahead of schedule, which is fantastic. The QA team has started testing the core functionalities and identifying any bugs.",
  },
  {
    time: "00:48",
    speaker: "Bob",
    text: "I have a question about the budget for this project. Are we within the allocated budget?",
  },
  {
    time: "01:00",
    speaker: "John",
    text: "Sure, let's discuss the budget concerns. Eva, can you provide an update on the budget?",
  },
  {
    time: "01:12",
    speaker: "Eva",
    text: "Absolutely. We're currently on track with the budget, and there haven't been any major expenses that would cause concerns.",
  },
  {
    time: "01:24",
    speaker: "John",
    text: "That's reassuring. Let's continue monitoring the budget closely to ensure we stay within our limits.",
  },
  // Add more transcript entries here with timestamps
];
