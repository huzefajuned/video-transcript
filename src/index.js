import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { VideoContextProvider } from "./context/VideoContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./context/AuthContext";
// import dotenv from "dotenv";
// dotenv.config();

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <VideoContextProvider>
      <BrowserRouter>
        <App />
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          limit={1}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </VideoContextProvider>
  </AuthContextProvider>
);
