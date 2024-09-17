'use client';

import { useSessionContext } from '@/app/components/context/session-provider';
import { Dropdown, DropdownMenu, DropdownTrigger, DropdownItem } from "@nextui-org/react";
import { useLocaleContext } from '@/app/components/context/locale-provider';

interface CommentManageButtonProps {
    authorName: string;
    onEdit: () => void;
    onDelete: () => void;
}

export default function CommentManageButton({ authorName, onEdit, onDelete }: CommentManageButtonProps) {
    const { dict } = useLocaleContext();
    const sessionContext = useSessionContext();

    const isAuthor = sessionContext?.session?.user?.name === authorName;

    if (!isAuthor) {
        return null;
    }


    return (
        <div className="ml-4">
            <Dropdown
                radius="sm"
                classNames={{
                    content: "py-1 px-1 border border-default-200 rounded-lg border-spacing-4 bg-gradient-to-br from-white to-gray-100",
                }}
            >
                <DropdownTrigger>
                    <button>
                        <div className="mb-2 text-gray-500 hover:text-black">...</div>
                    </button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Comment management actions"
                    variant="solid"
                    className="p-3"
                    onAction={(key) => {
                        if (key === "edit") {
                            onEdit();
                        } else if (key === "delete") {
                            onDelete();
                        }
                    }}
                >
                    <DropdownItem key="edit" className="hover:bg-gray-200">
                        Edit
                    </DropdownItem>
                    <DropdownItem key="delete" className="text-red-500 hover:bg-gray-200" color="danger">
                        Delete
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}