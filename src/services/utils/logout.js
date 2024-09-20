import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useLogOut = () => {
  const navigate = useNavigate();

  localStorage.removeItem("userAvatarUrl");
  localStorage.removeItem("role");
  localStorage.removeItem("user_id");
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  navigate("/");
};
