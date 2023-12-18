import React, { createContext, useContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children, value }) => {
  
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    return { state: { user: null, loggedIn: false } };
  }
  return context;
};

export { UserProvider };
