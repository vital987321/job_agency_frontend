import { useEffect } from "react";
import {  useNavigate} from "react-router-dom";


export const useLogOut = (url) => {
    const navigate = useNavigate();
    if (url) {
        localStorage.removeItem("userAvatarUrl");
        localStorage.removeItem("role");
        localStorage.removeItem("user_id");
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        navigate("/")
    }
        


  };