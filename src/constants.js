import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";

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
    speaker: "John",
    text: "Hello everyone, welcome to our meeting.",
  },
  {
    speaker: "Alice",
    text: "Hi John, glad to be here!",
  },
  {
    speaker: "Bob",
    text: "Hey everyone, let's get started.",
  },
  {
    speaker: "Eva",
    text: "Hi everyone, I have a few updates to share.",
  },
  {
    speaker: "John",
    text: "Sure, go ahead Eva.",
  },
  {
    speaker: "Eva",
    text: "Thank you. We're making good progress on the project. The development team has completed the backend integration and is now working on the frontend.",
  },
  {
    speaker: "Alice",
    text: "That's great to hear! How are we doing on the timeline?",
  },
  {
    speaker: "Eva",
    text: "We're slightly ahead of schedule, which is fantastic. The QA team has started testing the core functionalities and identifying any bugs.",
  },
  {
    speaker: "Bob",
    text: "I have a question about the budget for this project. Are we within the allocated budget?",
  },
  {
    speaker: "John",
    text: "Sure, let's discuss the budget concerns. Eva, can you provide an update on the budget?",
  },
  {
    speaker: "Eva",
    text: "Absolutely. We're currently on track with the budget, and there haven't been any major expenses that would cause concerns.",
  },
  {
    speaker: "John",
    text: "That's reassuring. Let's continue monitoring the budget closely to ensure we stay within our limits.",
  },
  // Add more transcript entries here
];
