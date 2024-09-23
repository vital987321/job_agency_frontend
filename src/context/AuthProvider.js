import { createContext, useState } from "react";
import { useEffect } from "react";
import api from "../services/api/api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      fetchUserData(user_id);
    }
    //else {setAuth({})}
  }, []);

  const fetchUserData = async (user_id) => {
    try {
      const request = await api
        .get("/user/" + user_id)
        .then((response) => {
          setAuth({
            user_id,
            role: response.data.role,
            username: response.data.username,
            userAvatarUrl: response.data.avatar,
          });
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
