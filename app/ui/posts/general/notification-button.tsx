'use client';

import { useNotificationContext } from "@/app/components/context/notification-provider";
import { useSessionContext } from "@/app/components/context/session-provider";
import { useLocaleContext } from '@/app/components/context/locale-provider';
import { BellIcon } from "@heroicons/react/24/solid";
import { Notification } from "@/app/lib/definitions";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { keyName } from "@/app/lib/constants";
import Link from "next/link";
import { deleteAllNotificationByTargetUserName, setNotificationIsRead } from "@/app/lib/actions";
import { useEffect, useState } from "react";

export function NotificationButton({ isHidden }: { isHidden: boolean }) {

    const { lang, dict } = useLocaleContext();
    const { notifications } = useNotificationContext();
    const sessionContext = useSessionContext();

    const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
    const [isClearAllNotifications, setIsClearAllNotifications] = useState(false);

    const isLogin = !!sessionContext.session;

    useEffect(() => {
        if (notifications === undefined) return;
        if (notifications === null || notifications.length === 0) {
            setUnreadNotificationsCount(0);
            return;
        }
        const count = notifications.filter(notification => !notification.is_read).length;
        console.log('unread notifications count', count);
        setUnreadNotificationsCount(count);
    }, [notifications]);

    if (!isLogin || isHidden) {
        return null;
    }

    function truncateText(text: string, maxLength: number) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    }


    function GetNotificationLink(notification: Notification): string {
        // TODO localization for post_title

        const urlRegex = /\s/g;
        const url_title = notification.post_title.toLowerCase().replace(urlRegex, '-');
        let url = '';
        if (notification.type === 'comment') {
            url = `/${lang}/posts/${url_title}/${notification.post_id}#comment-${notification.comment_id}`;
        } else if (notification.type === 'like') {
            if (notification.comment_id == null) {
                url = `/${lang}/posts/${url_title}/${notification.post_id}`;
            } else {
                url = `/${lang}/posts/${url_title}/${notification.post_id}#comment-${notification.comment_id}`;
            }
        }
        console.log('notification link', url);
        return url;
    }


    const NotificationFormatContent = ({ notification }: { notification: Notification }) => {
        // TODO localization for format, and post title
        const truncatedPostTitle = truncateText(notification.post_title, 100);
        let truncatedCommentContent = '';
        if (notification.comment_content) {
            truncatedCommentContent = truncateText(notification.comment_content, 100);
        }
        if (notification.type === 'comment') {
            if (notification.target_user_name === keyName) {
                return (
                    <p>{notification.source_user_name} <strong>commented</strong> on your article <strong>{truncatedPostTitle}</strong>: &quot;{truncatedCommentContent}&quot;</p>
                )
            }
            else {
                return (
                    <p>{notification.source_user_name} <strong>commented</strong> on the article you&apos;re subscribed to: <strong>{truncatedPostTitle}</strong></p>
                )
            }
        } else if (notification.type === 'like') {
            if (notification.comment_id == null) {
                return (
                    <p>{notification.source_user_name} <strong>liked</strong> your article <strong>{truncatedPostTitle}</strong></p>
                )
            } else {
                return (
                    <p>{notification.source_user_name} <strong>liked</strong> your comment: &quot;{truncatedCommentContent}&quot;</p>
                )
            }
        }
    }


    if (!notifications || notifications.length === 0 || isClearAllNotifications) {
        return (
            <div className="flex items-center gap-8 text-black">
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <div className="flex mr-6 relative items-center">
                            <BellIcon className="flex h-6 w-6 text-gray-500 hover:text-orange-500 hover:cursor-pointer" />
                        </div>
                    </DropdownMenuTrigger>
                    {/* TODO localization */}
                    <DropdownMenuContent align="start" className="p-3 w-80 -translate-x-16 translate-y-2" >
                        <DropdownMenuLabel>Notification</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup title="Notifications" >
                            <DropdownMenuLabel
                                key="no-notifications"
                            >
                                <div className="mt-2 flex relative hover:cursor-default items-center justify-center">
                                    <p className="flex items-center text-center font-bold">
                                        No notifications
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        )
    }


    return (
        <div className="flex items-center gap-8 text-black">
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <div className="flex mr-6 relative items-center">
                        <BellIcon className="flex h-6 w-6 text-gray-500 hover:text-orange-500 hover:cursor-pointer" />
                        {unreadNotificationsCount > 0 && (
                            <div id="counter" className="absolute -top-1 -right-1 flex p-1 w-4 h-4 bg-orange-500 text-white text-xs rounded-lg items-center justify-center">
                                {unreadNotificationsCount}
                            </div>
                        )}
                    </div>
                </DropdownMenuTrigger>
                {/* TODO localization */}
                <DropdownMenuContent align="start" className="p-3 w-80 -translate-x-16 translate-y-2" >
                    {/* <DropdownSection title={dict.notification.title} /> */}

                    <DropdownMenuLabel>Notification</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup title="Notification">
                        <ScrollArea className="h-[500px]">
                            {notifications.map((notification) => (
                                <DropdownMenuItem
                                    key={notification.id}
                                >
                                    <Link
                                        className="mt-2 flex flex-row relative hover:cursor-pointer"
                                        href={GetNotificationLink(notification)}
                                        onClick={() => setNotificationIsRead(notification.id)}>
                                        {!notification.is_read && (
                                            <div id="not-read-mark" className="mr-2 mt-[14px] z-10 flex w-1.5 h-1.5 min-w-1.5 min-h-1.5 align-middle bg-orange-500 rounded-sm" />
                                        )}
                                        <Avatar className="flex w-8 h-8">
                                            <AvatarImage src={notification.source_user_img} alt={notification.source_user_name} />
                                            <AvatarFallback>{notification.source_user_name}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col ml-4">
                                            <div className="flex">
                                                <NotificationFormatContent notification={notification} />
                                            </div>
                                            <div className="flex mt-1">
                                                <p className="text-gray-400 text-xs">{notification.create_date
                                                    .toDateString()
                                                    .split(' ')
                                                    .slice(1)
                                                    .join(' ')
                                                    .replace(/(?<=\d) /, ', ')}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </ScrollArea>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup title="Delete">
                        <DropdownMenuItem key="delete" className="text-gray-600 hover:bg-gray-200" color="danger">
                            <button className="flex items-center justify-center align-middle w-full hover:cursor-pointer"
                                onClick={() => {
                                    const userName = sessionContext.session?.user?.name;
                                    if (userName) {
                                        deleteAllNotificationByTargetUserName(userName);
                                        setIsClearAllNotifications(true);
                                    }
                                }}>
                                <p className="flex text-center font-bold">Clear All Notifications</p>
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div >
    );
}
