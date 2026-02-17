import React, { createContext, useState, useCallback } from "react";
import { getToken, setToken as saveToken, removeToken } from "@/shared/lib/token-storage";

interface AuthContextValue {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(() => getToken());

  const setToken = useCallback((newToken: string) => {
    saveToken(newToken);
    setTokenState(newToken);
  }, []);

  const logout = useCallback(() => {
    removeToken();
    setTokenState(null);
  }, []);

  const value: AuthContextValue = {
    token,
    isAuthenticated: token !== null,
    setToken,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};