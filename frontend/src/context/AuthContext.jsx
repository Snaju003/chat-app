/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("auth-user")) || null
  );

  // Save the authUser to localStorage whenever it changes
  useEffect(() => {
    if (authUser) {
      localStorage.setItem("auth-user", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("auth-user");
    }
  }, [authUser]); // This will run whenever authUser changes

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
