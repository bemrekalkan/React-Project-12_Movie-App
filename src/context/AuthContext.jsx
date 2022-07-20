import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrenUser] = useState(true);

  return (
    <AuthContext.Provider value={{ currentUser, first }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
