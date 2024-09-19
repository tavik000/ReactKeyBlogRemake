'use client';

import { useSessionContext } from '@/app/components/context/session-provider';
import { Dropdown, DropdownMenu, DropdownTrigger, DropdownItem } from "@nextui-org/react";
import { useLocaleContext } from '@/app/components/context/locale-provider';
import { Button } from '@/app/ui/button';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from '@nextui-org/react';
import { keyEmail } from '@/app/lib/constants';

interface CommentManageButtonProps {
    authorName: string;
    commentContent: string;
    onEdit: () => void;
    onDelete: () => void;
}

export default function CommentManageButton({ authorName, commentContent, onEdit, onDelete }: CommentManageButtonProps) {
    const { dict } = useLocaleContext();
    const sessionContext = useSessionContext();

    const isAuthor = sessionContext?.session?.user?.name === authorName;
    const isBlogAuthor = sessionContext?.session?.user?.email === keyEmail;

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    if (!isAuthor && !isBlogAuthor) {
        return null;
    }

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    };

    return (
        <div>
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
                                onOpen();
                            }
                            else {
                                console.error('Unexpected key type:', typeof key);
                            }
                        }}
                    >
                        {isAuthor ? (
                            <DropdownItem key="edit" className="hover:bg-gray-200">
                                {dict.comment.edit}
                            </DropdownItem>
                        ) : <DropdownItem key="edit" className="text-gray-500 hover:bg-gray-200 hidden" />
                        }
                        <DropdownItem key="delete" className="text-red-500 hover:bg-gray-200" color="danger">
                            {dict.comment.delete}
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                className="rounded-lg bg-gray-600 opacity-95"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-white">
                                {dict.comment.caution}
                            </ModalHeader>
                            <ModalBody>
                                <p className="text-white">
                                    {dict.comment.areYouSureDeleteComment}
                                </p>
                                <p className="text-red-500">{truncateText(commentContent, 100)}</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    className="bg-gray-600 hover:bg-gray-400"
                                    onClick={onClose}
                                >
                                    {dict.comment.close}
                                </Button>
                                <Button
                                    className="bg-red-500 hover:bg-red-400"
                                    onClick={() => {
                                        onDelete()
                                        onClose()
                                    }}
                                >
                                    {dict.comment.delete}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}