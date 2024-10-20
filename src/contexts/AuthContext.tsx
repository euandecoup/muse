import React, { createContext, useContext, useState } from "react";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

interface AuthContextType {
  user: User | null | undefined;
  loading: boolean;
  isGuest: boolean;
  continueAsGuest: () => void;
  exitGuestMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, loading] = useAuthState(auth);
  const [isGuest, setIsGuest] = useState(false);

  const continueAsGuest = () => {
    setIsGuest(true);
  };

  const exitGuestMode = () => {
    setIsGuest(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isGuest, continueAsGuest, exitGuestMode }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
