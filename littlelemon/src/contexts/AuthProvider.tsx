import React, { createContext, useContext, useState } from "react";

type childrenType = {
  children: React.ReactNode;
};

type AuthState = {
  access: string | null;
  refresh: string | null;
  password: string | null;
  user: string | null;
  role: string | null;
};

type AuthContextType = {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
  persist: boolean;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

const AuthProvider = ({ children }: childrenType) => {
  const [auth, setAuth] = useState<AuthState>({
    access: null,
    refresh: null,
    password: null,
    user: null,
    role: null,
  });
  const [persist, setPersist] = useState<boolean>(() => {
    const stored = localStorage.getItem("persist");
    return stored ? JSON.parse(stored) : false;
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
