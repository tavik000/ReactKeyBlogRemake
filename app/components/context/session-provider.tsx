'use client';
import { Session } from 'next-auth';
import { createContext, useState, useContext } from 'react';

type SessionContextProviderProps = {
    children: React.ReactNode;
    inSession: Session | null;
};

type SessionContextType = {
    session: Session | null;
    setSession: React.Dispatch<React.SetStateAction<Session | null>>;
};

export const SessionContext = createContext<SessionContextType>(
    {} as SessionContextType
);

export function useSessionContext() {
    return useContext(SessionContext);
}

export function SessionProvider({
    children,
    inSession,
}: SessionContextProviderProps) {
    const [session, setSession] = useState(inSession);

    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {children}
        </SessionContext.Provider>
    );
}