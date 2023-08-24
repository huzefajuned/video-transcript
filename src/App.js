import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Login";
import SingUp from "./pages/SingUp";
import PreviousUploads from "./pages/PreviousUploads";
import Home from "./pages/Home";
import Auth from "./Auth";
import VideoTranscripter from "./pages/VideoTranscripter";

const App = () => {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Sign-up" element={<SingUp />} />

        <Route
          path="/uploads"
          element={
            <Auth>
              <PreviousUploads />
            </Auth>
          }
        />

        <Route
          path="/ViewVideo"
          element={
            <Auth>
              <VideoTranscripter />
            </Auth>
          }
        />
      </Routes>
    </RootLayout>
  );
};

export default App;
