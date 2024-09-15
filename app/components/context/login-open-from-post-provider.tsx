'use client';
import { createContext, useState, useContext } from 'react';

export const LoginOpenFromPostContext = createContext<any>(undefined);

export function useLoginOpenFromPostContext() {
    return useContext(LoginOpenFromPostContext);
}

export function LoginOpenFromPostProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoginOpenFromPost, setIsLoginOpenFromPost] = useState(false);

    return (
        <LoginOpenFromPostContext.Provider value={{
            isLoginOpenFromPost,
            setIsLoginOpenFromPost
        }}>
            {children}
        </LoginOpenFromPostContext.Provider>
    );
}