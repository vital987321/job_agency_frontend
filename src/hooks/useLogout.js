import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const useLogOut = (url) => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const logout = useCallback(() => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    localStorage.removeItem("AdminListItemsOnPage");
    setAuth({});
    navigate("/");
  }, [navigate]);

  return { logout };
};
