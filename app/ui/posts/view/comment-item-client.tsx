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
import { useSessionContext } from "@/app/components/context/session-provider";
import { useLoginOpenFromPostContext } from "@/app/components/context/login-open-from-post-provider";
import { likeComment, unlikeComment } from "@/app/lib/actions";

const CommentItemClient = ({
    comment,
    commentId,
    postTitle,
    postId,
}: {
    comment: PostComment,
    commentId: string,
    postTitle: string
    postId: string
}) => {
    const { locale, dict } = useLocaleContext();
    const sessionContext = useSessionContext();
    const { setIsLoginOpenFromPost } = useLoginOpenFromPostContext();
    const [isEdit, setIsEdit] = useState(false);
    const isLikedBefore: boolean = !!sessionContext.session && comment.likes.includes(sessionContext.session?.user?.name ?? '');
    const [isLiked, setIsLiked] = useState<boolean>(isLikedBefore);
    const [isLikeDisabled, setIsLikeDisabled] = useState(false);
    const [isShowingClickEffect, setIsShowingClickEffect] = useState(false);
    const isSelfComment = sessionContext.session?.user?.name === comment.user_name;

    const likeTooltipContent = dict.post.likes + ": " + comment.likes.join(', ');
    const truncatedLikeTooltipContent = likeTooltipContent.length > 100
        ? likeTooltipContent.substring(0, 100) + '...'
        : likeTooltipContent;

    const onEdit = () => {
        setIsEdit(true);
    };

    const onDelete = () => {
        deleteCommentWithAllLanguages(locale, commentId, comment.post_id, postTitle);
    };

    const onCancel = () => {
        setIsEdit(false);
    }

    const handleClickLike = () => {
        if (isSelfComment) return;
        if (isLikeDisabled) return;

        if (!sessionContext.session) {
            setIsLoginOpenFromPost(true);
            return;
        }

        if (!isLiked) {
            if (sessionContext.session?.user?.name) {
                const sourceUserName = sessionContext.session.user.name;
                const sourceUserImage = sessionContext.session.user.image;
                const targetUserName = comment.user_name;
                likeComment(targetUserName, sourceUserName, sourceUserImage ?? '', postId, postTitle, commentId, comment.content, locale);
                setIsLiked(true);
                setIsShowingClickEffect(true);
                setTimeout(() => setIsShowingClickEffect(false), 200);
                setIsLikeDisabled(true);
                setTimeout(() => setIsLikeDisabled(false), 5000);
            } else {
                console.error('No user name found in session');
            }
        } else {
            if (sessionContext.session?.user?.name) {
                unlikeComment(sessionContext.session.user.name, commentId);
                setIsLiked(false);
            } else {
                console.error('No user name found in session');
            }
        }

    };

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
            <div
                id={`comment-${commentId}`}
                className="flex-col justify-between border-b-2 border-gray-100">
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
                        <InteractIcon
                            count={comment.likes.length +
                                ((isLiked && !isLikedBefore) ? 1 :
                                    (isLikedBefore && !isLiked) ? -1 : 0)}
                            shouldShowCount={true}
                            tooltipContent={truncatedLikeTooltipContent}>
                            <HeartIcon
                                className={`flex h-6 w-6 align-middle 
                                ${isSelfComment ? 'hover:cursor-not-allowed' :
                                        isLiked ? 'hover:cursor-pointer fill-orange-500 text-orange-500' : 'hover:cursor-pointer hover:text-orange-500'}
                                ${isShowingClickEffect ? 'click-effect' : ''}
                                `}
                                color="#757575"
                                title={dict.post.like}
                                onClick={() => {
                                    handleClickLike();
                                }}
                            />
                        </InteractIcon>
                    </div>
                </div>
            </div>
        );
    }
};

export default CommentItemClient;