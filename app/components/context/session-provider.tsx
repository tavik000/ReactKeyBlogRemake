"use client";
import { Session, User } from "next-auth";
import { createContext, useState, useContext } from "react";

type SessionContextProviderProps = {
  children: React.ReactNode;
  inSession: Session | null;
  inLocalUser: User | null;
};

type SessionContextType = {
  session: Session | null;
  localUser: User | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
};

export const SessionContext = createContext<SessionContextType>({} as SessionContextType);

export function useSessionContext() {
  return useContext(SessionContext);
}

export function SessionProvider({ children, inSession, inLocalUser }: SessionContextProviderProps) {
  const [session, setSession] = useState(inSession);
  const [localUser] = useState(inLocalUser);

  return (
    <SessionContext.Provider value={{ session, localUser, setSession }}>
      {children}
    </SessionContext.Provider>
  );
}
