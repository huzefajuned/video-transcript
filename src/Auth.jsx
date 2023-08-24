import { useNavigate } from "react-router-dom";

const Auth = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("auth_User");

  if (isAuthenticated) {
    return children;
  } else {
    navigate("/Login");
    return null;
  }
};

export default Auth;
