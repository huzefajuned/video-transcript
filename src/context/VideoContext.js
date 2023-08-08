import { createContext, useState } from "react";

export const VideoContext = createContext();

export const VideoContextProvider = ({ children }) => {
  const [url, setUrl] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [invalidUrl, setInvalidUrl] = useState(null);

  return (
    <VideoContext.Provider
      value={{
        url,
        setUrl,
        uploadedVideo,
        setUploadedVideo,
        invalidUrl,
        setInvalidUrl,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
