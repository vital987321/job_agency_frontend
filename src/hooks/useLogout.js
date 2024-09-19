import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useLogOut = (url) => {
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem("userAvatarUrl");
    localStorage.removeItem("ApplicationsOnPage");
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/");
  }, [navigate]);

  return { logout };
};
