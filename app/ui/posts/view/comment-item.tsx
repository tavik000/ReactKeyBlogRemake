import React from "react";
import { PostComment } from "@/app/lib/definitions";
import { User } from "@nextui-org/react";

export default function CommentItem({
  // comment,
}: {
    // comment: PostComment;
  }) {

  const create_date = new Date();




  return (
    <div className="mt-6 flex justify-between border-b-2 border-t-2 border-gray-100">
      <div className="flex content-center w-full">
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
      <div className="flex content-center">
        <div className="mr-0 inline-block flex-shrink-0">
        </div>
      </div>

      {/* Like */}
    </div>

  );
}