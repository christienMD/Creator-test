import React, { createContext, useContext, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const token = localStorage.getItem("auth_token");

  const value = {
    token,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
