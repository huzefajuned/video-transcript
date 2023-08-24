import axios from "axios";

export async function transcribeVideoUrlApi(api_Url, video_url) {
  console.log("api_Url", api_Url);

  if (video_url === "" || api_Url === "") {
    return;
  } else {
    try {
      const payload = {
        video_url,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(api_Url, payload, config);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

//  getting status of video through generated credetials...
export async function videoStatusApi(api_Url, payloadData) {
  if (api_Url === "" || !payloadData) {
    return;
  } else {
    try {
      const payload = {
        link: payloadData["link"],
        title: payloadData["title"],
        transcript_id: payloadData["transcript_id"],
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(api_Url, payload, config);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

// get Local storage data--\

export function getLocalStorageData() {
  const data = JSON.parse(localStorage.getItem("videoCredentials"));
  return data;
}
