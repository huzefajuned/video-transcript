import React from "react";
import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Login";
import PreviousUploads from "./pages/PreviousUploads";
import Auth from "./Auth";
import VideoTranscripter from "./pages/VideoTranscripter";
import Home from "./pages/Home";
import Error from "./pages/Error";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/Home"
        element={
          <Auth>
            <RootLayout>
              <Home />
            </RootLayout>
          </Auth>
        }
      />

      <Route
        path="/uploads"
        element={
          <Auth>
            <RootLayout>
              <PreviousUploads />
            </RootLayout>
          </Auth>
        }
      />

      <Route
        path="/ViewVideo"
        element={
          <Auth>
            <RootLayout>
              <VideoTranscripter />
            </RootLayout>
          </Auth>
        }
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
