
import { createContext, useState } from "react";
import { useEffect } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const role = localStorage.getItem("role");
    const user_id = localStorage.getItem("user_id");
    setAuth({ role: role, user_id: user_id });
  }, []);
  console.log("AuthProvider");
  console.log(auth);
    useEffect(()=>{
        const role=localStorage.getItem('role')
        const user_id=localStorage.getItem('user_id')
        setAuth({role:role, user_id:user_id})
    },[])

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};




