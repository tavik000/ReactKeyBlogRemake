"use client";
import { Session } from "next-auth";
import { User } from "@/app/lib/definitions";
import { createContext, useState, useContext } from "react";

type SessionContextProviderProps = {
  children: React.ReactNode;
  inSession: Session | null;
  inLocalUser: User;
};

type SessionContextType = {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
  localUser: User;
  setLocalUser: React.Dispatch<React.SetStateAction<User>>;
};

export const SessionContext = createContext<SessionContextType>({} as SessionContextType);

export function useSessionContext() {
  return useContext(SessionContext);
}

export function SessionProvider({
  children,
  inSession,
  inLocalUser,
}: SessionContextProviderProps) {
  const [session, setSession] = useState(inSession);
  const [localUser, setLocalUser] = useState(inLocalUser);

  return (
    <SessionContext.Provider value={{ session, setSession, localUser, setLocalUser }}>
      {children}
    </SessionContext.Provider>
  );
}
