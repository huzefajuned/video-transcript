import React, { useState } from "react";
import "./App.css";
import UploadUrl from "./component/UploadUrl";
import VideoTranscripter from "./component/VideoTranscripter";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { VideoContextProvider } from "./context/VideoContext";

function App() {
  return (
    <>
      <VideoContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<UploadUrl />} />
            <Route path="/Editor" element={<VideoTranscripter />} />
          </Routes>
        </BrowserRouter>
      </VideoContextProvider>
    </>
  );
}

export default App;
