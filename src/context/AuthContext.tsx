import React, { useState } from "react";
import useAuthState from "../hooks/useAuthState";
import { authService } from "../services/auth.service";
export const AuthContext = React.createContext<any>(null!);

interface IPodium {
  champion: string | null;
  runner_up: string | null;
  third_place: string | null;
}
interface IMatchResult {
  _id: string | null;
  local_score: number | null;
  visitor_score: number | null;
}

interface AuthContextType {
  user: any;
  signin: (user: string) => void;
  signout: () => void;
}

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const authState = useAuthState();

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
