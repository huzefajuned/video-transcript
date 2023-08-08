import axios from "axios";

export async function transcribeVideo() {
  const options = {
    method: "GET",
    url: "https://video-to-text-video-transcription-and-summarization.p.rapidapi.com/transcribe",
    params: {
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4", // Corrected URL
    },
    headers: {
      "X-RapidAPI-Key": "f5d426db4cmshb702520f42bf4a4p186f1cjsn13ade8cd3bad",
      "X-RapidAPI-Host":
        "video-to-text-video-transcription-and-summarization.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
