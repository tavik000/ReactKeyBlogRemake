'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { addNewTag, deleteTag } from '@/app/lib/actions';
import { PostTagItem } from '@/app/ui/posts/general/post-tag';
import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';

export default function TagManage({ postTags }: { postTags: string[] }) {
  const third = Math.ceil(postTags.length / 3);
  const firstPart = postTags.slice(0, third);
  const secondPart = postTags.slice(third, third * 2);
  const thirdPart = postTags.slice(third * 2);

  const [newTag, setNewTag] = useState('');

  const handleAddTag = (tag: string) => {
    setNewTag('');
    return addNewTag(tag);
  };

  return (
    <>
      <div className="mb-12 flex flex-col">
        <h1
          id="post-title"
          className="mt-2 flex text-28px font-semibold leading-normal"
        >
          Tag Management
        </h1>
        <span className="mt-6 flex w-full flex-wrap justify-start">
          <ul className="w-72">
            {firstPart.map((tag) => (
              <ManageTag key={tag} tag={tag} />
            ))}
          </ul>
          <ul className="w-72">
            {secondPart.map((tag) => (
              <ManageTag key={tag} tag={tag} />
            ))}
          </ul>
          <ul className="w-72">
            {thirdPart.map((tag) => (
              <ManageTag key={tag} tag={tag} />
            ))}
          </ul>
        </span>
        <div className="mt-10 flex">
          <input
            id="title_en"
            name="title_en"
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="peer block h-10 w-2/5 rounded-md border border-gray-500 py-2 pl-3 text-28px font-semibold outline-2 placeholder:text-gray-500"
            aria-describedby="title-error"
          />
          <Button
            color="success"
            className="ml-4 bg-green-500 hover:bg-green-400"
            onClick={() => {
              handleAddTag(newTag);
            }}
          >
            Add Tag
          </Button>
        </div>
      </div>
    </>
  );
}

const ManageTag = ({ tag }: { tag: string }) => {
  const handleDeleteTag = (tag: string) => {
    deleteTag(tag);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <li key={tag}>
      <div className="flex flex-row items-start">
        <PostTagItem
          key={tag}
          locale="en"
          tag={tag}
          isLabel={true}
          isClickable={false}
          className="flex"
        />
        <button className="ml-1 flex hover:scale-125" onClick={onOpen}>
          <XMarkIcon className="h-4 w-4 text-gray-500 hover:text-red-500" />
        </button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="bg-gray-600 opacity-95 rounded-lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white">
                Caution
              </ModalHeader>
              <ModalBody>
                <p className="text-white">Are you sure you want to delete this tag? </p><p className="text-red-500">{tag}</p>
              </ModalBody>
              <ModalFooter>
                <Button className="bg-gray-600 hover:bg-gray-400" onClick={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-400"
                  onClick={() => handleDeleteTag(tag)}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </li>
  );
};
