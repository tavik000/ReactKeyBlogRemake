'use client';
import { Notification } from "@/app/lib/definitions";
import { createContext, useState, useContext } from 'react';

type NotificationContextProviderProps = {
    children: React.ReactNode;
    inNotifications: Notification[] | null;
};

type NotificationContextType = {
    notifications: Notification[] | null;
    setNotifications: React.Dispatch<React.SetStateAction<Notification[] | null>>;
};

export const NotificationContext = createContext<NotificationContextType>(
    {} as NotificationContextType
);

export function useNotificationContext() {
    return useContext(NotificationContext);
}

export function NotificationProvider({
    children,
    inNotifications,
}: NotificationContextProviderProps) {
    const [notifications, setNotifications] = useState(inNotifications);

    return (
        <NotificationContext.Provider value={{ notifications, setNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
}