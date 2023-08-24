import React from "react";
import { useNavigate } from "react-router-dom";

const Table = ({ localStorageData: videoCredential }) => {
  const navigate = useNavigate();

  function convertTimestampToDateString(timestamp) {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  }

  function handleOpenVideo(videoCredential) {
    navigate("/ViewVideo", { state: { videoCredential } });
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-lg bg-primaryColor  text-white dark:bg-gray-800"
            >
              Name of Video
            </th>

            <th
              scope="col"
              className="px-6 py-3  text-lg bg-primaryColor  text-white dark:bg-gray-800"
            >
              Date
            </th>

            <th
              scope="col"
              className="px-6 py-3  text-lg bg-primaryColor  text-white"
            >
              Actions
            </th>
          </tr>
        </thead>
        {videoCredential?.length !== undefined ? (
          videoCredential?.map((item, index) => (
            <tbody>
              <tr
                key={index}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                  {item.title}
                </td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                  {convertTimestampToDateString(item.timestamp)}
                </td>
                {/* <td className="px-6 py-4">{item.price}</td> */}
                <td className="px-6 py-4">
                  <button
                    // onClick={() => handleView(item.link)}
                    onClick={() => handleOpenVideo(item)}
                    className="text-blue-500"
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          ))
        ) : (
          <tbody>
            <img
              src="https://i.pinimg.com/originals/ae/51/e1/ae51e1395e87cc72c6021df5445cc5f8.gif"
              alt="loader"
            />
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Table;
