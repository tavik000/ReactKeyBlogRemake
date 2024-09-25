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

export function NotificationButton({ isHidden }: { isHidden: boolean }) {

    const { dict } = useLocaleContext();
    const { notifications } = useNotificationContext();
    const sessionContext = useSessionContext();

    const isLogin = !!sessionContext.session;

    if (!isLogin || isHidden) {
        return null;
    }

    function truncateText(text: string, maxLength: number) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    }

    const NotificationFormatContent = ({ notification }: { notification: Notification }) => {
        // TODO localization
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

    if (!notifications || notifications.length === 0) {
        return (
            <div className="mr-6 flex items-center gap-8 text-black ">
                <DropdownMenu >
                    <DropdownMenuTrigger>
                        <BellIcon className="h-6 w-6 text-gray-500 hover:text-orange-500 hover:cursor-pointer" />
                    </DropdownMenuTrigger>
                    {/* TODO localization */}
                    <DropdownMenuContent
                        aria-label="Notification"
                        className="p-3"
                    >
                        <DropdownMenuLabel>Notification</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup title="Notifications" >
                            <DropdownMenuItem
                                key="no-notifications"
                                className="text-gray-500 hover:cursor-default"
                            >
                                No notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-8 text-black ">
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <BellIcon className="mr-6 h-6 w-6 text-gray-500 hover:text-orange-500 hover:cursor-pointer" />
                </DropdownMenuTrigger>
                {/* TODO localization */}
                <DropdownMenuContent align="start" className="p-3 w-80 -translate-x-16 translate-y-2" >
                    {/* <DropdownSection title={dict.notification.title} /> */}

                    <DropdownMenuLabel>Notification</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup title="Notification" className="">
                        <ScrollArea className="h-[500px]">
                            {notifications.map((notification) => (
                                <DropdownMenuItem
                                    key={notification.id}
                                >
                                    <div className="mt-2 flex flex-row hover:cursor-pointer">
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
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </ScrollArea>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup title="Delete">
                        <DropdownMenuItem key="delete" className="text-gray-600 hover:bg-gray-200" color="danger">
                            <div className="flex items-center justify-center align-middle w-full hover:cursor-pointer">
                                <p className="flex text-center font-bold">Clear All Notifications</p>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div >
    );
}
