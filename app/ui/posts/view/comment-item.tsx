import React from "react";
import { PostComment } from "@/app/lib/definitions";
import { HeartIcon } from '@heroicons/react/24/outline';
import { User } from "@nextui-org/react";
import { MarkdownRenderer } from '../../markdown';
import { InteractIcon } from '@/app/ui/posts/view/interaction';

export default function CommentItem({
  // comment,
}: {
    // comment: PostComment;
  }) {

  const create_date = new Date();




  return (
    <div className="mt-6 flex-col justify-between border-b-2 border-t-2 border-gray-100">
      <div className="flex mt-4 content-center w-full">
        <User
          name="User"
          avatarProps={{
            size: "sm",
            src: "https://i.pravatar.cc/300"
          }}
        />

        <p className="flex items-center ml-auto text-sm text-gray-500">
          {create_date
            .toDateString()
            .split(' ')
            .slice(1)
            .join(' ')
            .replace(/(?<=\d) /, ', ')}
        </p>

      </div>

      {/* Markdown */}
      <div className="flex mt-4 content-center">
        <div className="mr-0 inline-block flex-shrink-0">
          <MarkdownRenderer> A Markdown Post</MarkdownRenderer>
        </div>
      </div>

      <div className="flex mt-4 mb-4 content-center">
        <div className="mr-0 inline-block flex-shrink-0">
          <InteractIcon count={1} shouldShowCount={true}>
            <HeartIcon
              className="flex h-6 w-6 align-middle"
              color="#757575"
              title="Like"
            />
          </InteractIcon>
        </div>
      </div>

      {/* Like */}
    </div>

  );
}