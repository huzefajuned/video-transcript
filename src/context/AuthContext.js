import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAut] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAut }}>
      {children}
    </AuthContext.Provider>
  );
};
