import { createContext, useState } from "react";

export const VideoContext = createContext();

export const VideoContextProvider = ({ children }) => {
  const [url, setUrl] = useState("");
  const [uploadedVideo, setUploadedVideo] = useState("");
  const [invalidUrl, setInvalidUrl] = useState(null);
  const [loadProcess, setLoadProcess] = useState();

  return (
    <VideoContext.Provider
      value={{
        url,
        setUrl,
        uploadedVideo,
        setUploadedVideo,
        invalidUrl,
        setInvalidUrl,
        loadProcess,
        setLoadProcess,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
