import React, { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { FaFileUpload } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { VideoContext } from "../context/VideoContext";

function VideoUploadComponent({ onVideoUpload }) {
  const { uploadedVideo } = useContext(VideoContext);

  console.log("uploadedVideo", uploadedVideo);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const videoFile = acceptedFiles[0];
        onVideoUpload(videoFile);
      }
    },
    [onVideoUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="p-8 border border-dashed border-gray-300 rounded-lg shadow-md">
      <div
        {...getRootProps()}
        className={`flex items-center justify-center h-40 ${
          isDragActive ? "bg-blue-100" : "bg-gray-100"
        } hover:bg-blue-100 cursor-pointer transition duration-300 ease-in-out`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-500 flex flex-col align-center justify-center gap-2">
          <span className="flex items-center justify-center">
            {uploadedVideo ? (
              <IoCheckmarkDoneSharp
                size={35}
                className="text-center to-green-400"
                color="green"
              />
            ) : (
              <FaFileUpload size={35} className="text-center" />
            )}
          </span>
          <span className="flex items-center">
            {isDragActive
              ? `Drop the video file here...`
              : "Drag & drop a video file here, or click to select one"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default VideoUploadComponent;
