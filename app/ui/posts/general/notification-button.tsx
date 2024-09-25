'use client';

import { useNotificationContext } from "@/app/components/context/notification-provider";
import { useSessionContext } from "@/app/components/context/session-provider";
// import { Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, DropdownSection, User } from "@nextui-org/react";

import { useLocaleContext } from '@/app/components/context/locale-provider';
import { BellIcon } from "@heroicons/react/24/solid";

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

export function NotificationButton( { isHidden }: { isHidden: boolean }) {

    const { dict } = useLocaleContext();
    const { notifications } = useNotificationContext();
    const sessionContext = useSessionContext();

    const isLogin = !!sessionContext.session;

    if (!isLogin || isHidden) {
        return null;
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
                        {notifications.map((notification) => (
                            <DropdownMenuItem
                                key={notification.id}
                            >
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={notification.source_user_img} alt={notification.source_user_name} />
                                    <AvatarFallback>{notification.source_user_name}</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 w-80">
                                    <p>{notification.comment_content}</p>
                                </div>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup title="Delete">
                        <DropdownMenuItem key="delete" className="text-red-500 hover:bg-gray-200" color="danger">
                            Delete All Notifications
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div >
    );
}
