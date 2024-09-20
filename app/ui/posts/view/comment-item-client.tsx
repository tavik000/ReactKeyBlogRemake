'use client';
import React, { useState } from "react";
import { User } from "@nextui-org/react";
import { MarkdownRenderer } from '../../markdown';
import { InteractIcon } from '@/app/ui/posts/view/interaction';
import CommentManageButton from "./comment-manage-button";
import CommentEditForm from "./comment-edit-form";
import { HeartIcon } from '@heroicons/react/24/outline';
import { PostComment } from '@/app/lib/definitions';
import { deleteCommentWithAllLanguages } from "@/app/lib/actions";
import { useLocaleContext } from "@/app/components/context/locale-provider";

const CommentItemClient = ({
    comment,
    commentId,
    postTitle
}: {
    comment: PostComment,
    commentId: string,
    postTitle: string
}) => {
    const { locale, dict } = useLocaleContext();
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => {
        setIsEdit(true);
    };

    const onDelete = () => {
        deleteCommentWithAllLanguages(locale, commentId, comment.post_id, postTitle);
    };

    const onCancel = () => {
        setIsEdit(false);
    }

    if (isEdit) {
        return (
            <div className="flex-col justify-between border-b-2 border-gray-100">
                <CommentEditForm
                    isNewComment={false}
                    commentId={commentId}
                    postId={comment.post_id}
                    postTitle={postTitle}
                    defaultContent={comment.content}
                    onCancel={onCancel}
                />
            </div>
        );
    } else {
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
                    <CommentManageButton
                        authorName={comment.user_name}
                        commentContent={comment.content}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </div>

                {/* Content */}
                <div className="flex mt-4 content-center">
                    <article className="prose-base markdown">
                        <MarkdownRenderer>{comment.content}</MarkdownRenderer>
                    </article>
                </div>

                <div className="flex mt-4 mb-4 content-center">
                    <div className="mr-0 inline-block flex-shrink-0">
                        <InteractIcon count={comment.likes.length} shouldShowCount={true}>
                            <HeartIcon
                                className="flex h-6 w-6 align-middle hover:text-red-500"
                                color="#757575"
                                title="Like"
                            />
                        </InteractIcon>
                    </div>
                </div>
            </div>
        );
    }
};

export default CommentItemClient;