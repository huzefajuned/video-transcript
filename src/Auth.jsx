import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Auth = ({ children }) => {
  const isAuthenticated = localStorage.getItem("auth_User");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page or any other appropriate action
      navigate("/Login");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return children;
  } else {
    toast.warning("Please login First!");
  }
};

export default Auth;
