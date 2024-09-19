'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { usePathname } from 'next/navigation';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import { deletePostWithAllLanguages } from '@/app/lib/actions';
import { useLocaleContext } from '@/app/components/context/locale-provider';

export default function PostManage({
  postId,
  postTitle,
}: {
  postId: string;
  postTitle: string;
}) {
  const { locale } = useLocaleContext();
  const pathname = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDeletePost = () => {
    deletePostWithAllLanguages(locale, postId);
  };

  return (
    <>
      <div className="mt-4 flex flex-row">
        <div className="w-1/2 px-2">
          <Link
            href={{
              pathname: `${pathname}/edit`,
            }}
            className="w-full"
          >
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-400 focus-visible:outline-blue-500 active:bg-blue-600"
            >
              Edit
            </Button>
          </Link>
        </div>
        <div className="w-1/2 px-2">
          <Button
            type="button"
            className="w-full bg-red-500 hover:bg-red-400 focus-visible:outline-red-500 active:bg-red-600"
            onClick={onOpen}
          >
            Delete
          </Button>
        </div>
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
                Caution
              </ModalHeader>
              <ModalBody>
                <p className="text-white">
                  Are you sure you want to delete this post?
                </p>
                <p className="text-red-500">{postTitle}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-gray-600 hover:bg-gray-400"
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-400"
                  onClick={() => handleDeletePost()}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
