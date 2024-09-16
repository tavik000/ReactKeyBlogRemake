import React from "react";
import { PostComment } from "@/app/lib/definitions";
import { HeartIcon } from '@heroicons/react/24/outline';
import { User } from "@nextui-org/react";
import { MarkdownRenderer } from '../../markdown';
import { InteractIcon } from '@/app/ui/posts/view/interaction';
import { fetchPostCommentById } from '@/app/lib/data';

export default async function CommentItem({
  commentId,
}: {
  commentId: string;
}) {

  const create_date = new Date();

  const commentResults = await Promise.all([fetchPostCommentById(commentId)]);
  const comment = commentResults[0];



  return (
    <div className="flex-col justify-between border-b-2 border-gray-100">
      <div className="flex mt-4 content-center w-full">
        <User
          name={comment.user_name}
          avatarProps={{
            size: "sm",
            src: comment.user_img
          }}
        />
        {comment.modify_date > comment.create_date ? (
          <p className="flex items-center ml-auto text-sm text-gray-500">
            {comment.modify_date
              .toDateString()
              .split(' ')
              .slice(1)
              .join(' ')
              .replace(/(?<=\d) /, ', ')} (Edited)
          </p>
        ) : (
          <p className="flex items-center ml-auto text-sm text-gray-500">
            {comment.create_date
              .toDateString()
              .split(' ')
              .slice(1)
              .join(' ')
              .replace(/(?<=\d) /, ', ')}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="flex mt-4 content-center">
        <article className="prose-base markdown">
          <MarkdownRenderer>{comment.content}</MarkdownRenderer>
        </article>
      </div>

      <div className="flex mt-4 mb-4 content-center">
        <div className="mr-0 inline-block flex-shrink-0">
          <InteractIcon count={comment.likes} shouldShowCount={true}>
            <HeartIcon
              className="flex h-6 w-6 align-middle"
              color="#757575"
              title="Like"
            />
          </InteractIcon>
        </div>
      </div>

    </div>
  );
}