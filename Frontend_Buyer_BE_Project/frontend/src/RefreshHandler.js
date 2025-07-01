import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefrshHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("user-info");
    const token = JSON.parse(data)?.token;

    if (!token) {
      // If unauthenticated and not on /login → force to /login
      if (location.pathname !== "/login") {
        navigate("/login", { replace: true });
      }
    }
    // Else do nothing → PrivateRoute will handle protection
  }, [location.pathname, navigate]);

  return null;
}

export default RefrshHandler;
