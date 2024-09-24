'use client';

import { useNotificationContext } from "@/app/components/context/notification-provider";
import { useSessionContext } from "@/app/components/context/session-provider";
import { Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, DropdownSection, User } from "@nextui-org/react";
import { useLocaleContext } from '@/app/components/context/locale-provider';
import { BellIcon } from "@heroicons/react/24/solid";

export function NotificationButton() {
    const { dict } = useLocaleContext();
    const { notifications } = useNotificationContext();
    const sessionContext = useSessionContext();

    const isLogin = !!sessionContext.session;

    if (!isLogin) {
        return null;
    }

    if (!notifications || notifications.length === 0) {
        return (
            <div className="mr-6 flex items-center gap-8 text-black ">
                <Dropdown
                    radius="sm"
                    classNames={{
                        content: "py-1 px-1 border border-default-200 rounded-lg border-spacing-4 bg-gradient-to-br from-white to-gray-100",
                    }}
                >
                    <DropdownTrigger>
                        <BellIcon className="h-6 w-6 text-gray-500 hover:text-orange-500 hover:cursor-pointer" />
                    </DropdownTrigger>
                    {/* TODO localization */}
                    <DropdownMenu
                        aria-label="Notification"
                        variant="solid"
                        className="p-3"
                    >
                        <DropdownSection title="Notificaitons" showDivider >
                            <DropdownItem
                                key="no-notifications"
                                className="text-gray-500 hover:cursor-default"
                            >
                                No notifications
                            </DropdownItem>
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>
            </div>
        )
    }

    return (
        <div className="mr-6 flex items-center gap-8 text-black ">
            <Dropdown
                radius="sm"
                classNames={{
                    content: "py-1 px-1 border border-default-200 rounded-lg border-spacing-4 bg-gradient-to-br from-white to-gray-100 w-auto",
                }}
            >
                <DropdownTrigger>
                    <BellIcon className="h-6 w-6 text-gray-500 hover:text-orange-500 hover:cursor-pointer" />
                </DropdownTrigger>
                {/* TODO localization */}
                <DropdownMenu
                    aria-label="Notification"
                    variant="solid"
                    className="p-3 w-80"
                    onAction={(key) => {
                        if (key === "edit") {
                            // onEdit();
                        } else if (key === "delete") {
                            // onOpen();
                        }
                        else {
                            console.error('Unexpected key type:', typeof key);
                        }
                    }}
                >
                    {/* <DropdownSection title={dict.notification.title} /> */}
                    <DropdownSection title="Notification" showDivider className="">
                        {notifications.map((notification) => (
                            <DropdownItem
                                key={notification.id}
                                description={notification.create_date.toDateString()}
                                startContent={
                                    <User
                                        name={notification.source_user_name}
                                        avatarProps={{
                                            size: 'sm',
                                            src: notification.source_user_img,
                                        }}
                                    />
                                }
                            >
                                <div className="w-32">
                                    <p>{notification.comment_content}</p>
                                </div>
                            </DropdownItem>
                        ))}
                    </DropdownSection>
                    <DropdownSection title="Delete">
                        <DropdownItem key="delete" className="text-red-500 hover:bg-gray-200" color="danger">
                            Delete All Notifications
                        </DropdownItem>
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
