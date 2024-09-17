'use client';
import { useState, useEffect, useRef } from "react";
import { useSessionContext } from "@/app/components/context/session-provider";
import { Session } from "next-auth";

export default function LoginSuccessfulBanner() {
    const sessionContext = useSessionContext();
    const [showBanner, setShowBanner] = useState(false);
    const prevSession = useRef<Session | null>(null);

    useEffect(() => {
        if (!prevSession.current && sessionContext.session) {
            setShowBanner(true);
            const timer = setTimeout(() => setShowBanner(false), 3000);
            return () => clearTimeout(timer);
        }
        prevSession.current = sessionContext.session;
    }, [sessionContext.session]);

    return (
        showBanner && (
            <div className="flex w-full justify-center items-center">
                <div className={`${showBanner ? 'block animate-slide-down' : 'hidden animate-slide-up'} flex-row flex 
             fixed top-16 mx-auto justify-center items-center transform 
             w-72 rounded-lg bg-green-500 text-white p-4 text-center z-50`}>
                    <div className="flex items-center">
                        <svg className="w-6 h-6 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="flex text-lg">Login successful!</p>
                    </div>
                    <div className="flex justify-end align-middle">
                        <button onClick={() => setShowBanner(false)} className="flex ml-6 w-6 h-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-700">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}