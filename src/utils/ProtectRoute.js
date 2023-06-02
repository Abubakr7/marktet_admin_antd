import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectRoute = (props) => {
  const navigate = useNavigate();
  let token = localStorage.getItem("access_token");
  let rememberMe = JSON.parse(localStorage.getItem("rememberMe"));

  useEffect(() => {
    if (!token && !rememberMe) {
      return navigate("/");
    }
  }, [navigate]);

  return props.children;
};

export default ProtectRoute;
