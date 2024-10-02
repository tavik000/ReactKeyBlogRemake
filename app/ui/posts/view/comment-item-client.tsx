"use client";
import React, { useState } from "react";
import { User } from "@nextui-org/react";
import { MarkdownRenderer } from "../../markdown";
import { InteractIcon } from "@/app/ui/posts/view/interaction";
import CommentManageButton from "./comment-manage-button";
import CommentEditForm from "./comment-edit-form";
import { HeartIcon } from "@heroicons/react/24/outline";
import { PostComment } from "@/app/lib/definitions";
import { deleteCommentWithAllLanguages } from "@/app/lib/actions";
import { useLocaleContext } from "@/app/components/context/locale-provider";
import { useSessionContext } from "@/app/components/context/session-provider";
import { useLoginOpenFromPostContext } from "@/app/components/context/login-open-from-post-provider";
import { likeComment, unlikeComment } from "@/app/lib/actions";
import { getFormatDateByLocale } from "@/app/lib/utils";

const CommentItemClient = ({
  comment,
  commentId,
  postTitle,
  postId,
}: {
  comment: PostComment;
  commentId: string;
  postTitle: string;
  postId: string;
}) => {
  const { locale, lang, dict } = useLocaleContext();
  const sessionContext = useSessionContext();
  const { setIsLoginOpenFromPost } = useLoginOpenFromPostContext();
  const [isEdit, setIsEdit] = useState(false);
  const isLikedBefore: boolean =
    !!sessionContext.session &&
    comment.likes.includes(sessionContext.session?.user?.name ?? "");
  const [isLiked, setIsLiked] = useState<boolean>(isLikedBefore);
  const [isLikeDisabled, setIsLikeDisabled] = useState(false);
  const [isShowingClickEffect, setIsShowingClickEffect] = useState(false);
  const isSelfComment =
    sessionContext.session?.user?.name === comment.user_name;

  const likeTooltipContent = dict.post.likes + ": " + comment.likes.join(", ");
  const truncatedLikeTooltipContent =
    likeTooltipContent.length > 100
      ? likeTooltipContent.substring(0, 100) + "..."
      : likeTooltipContent;

  const onEdit = () => {
    setIsEdit(true);
  };

  const onDelete = () => {
    deleteCommentWithAllLanguages(
      locale,
      commentId,
      comment.post_id,
      postTitle,
    );
  };

  const onCancel = () => {
    setIsEdit(false);
  };

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
        likeComment(
          targetUserName,
          sourceUserName,
          sourceUserImage ?? "",
          postId,
          postTitle,
          commentId,
          comment.content,
          locale,
        );
        setIsLiked(true);
        setIsShowingClickEffect(true);
        setTimeout(() => setIsShowingClickEffect(false), 200);
        setIsLikeDisabled(true);
        setTimeout(() => setIsLikeDisabled(false), 5000);
      } else {
        console.error("No user name found in session");
      }
    } else {
      if (sessionContext.session?.user?.name) {
        unlikeComment(sessionContext.session.user.name, commentId);
        setIsLiked(false);
      } else {
        console.error("No user name found in session");
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
        className="flex flex-col justify-between border-b-2 border-gray-100"
      >
        <div className="mt-4 flex w-full content-center justify-between">
          <User
            name={comment.user_name}
            avatarProps={{
              size: "sm",
              src: comment.user_img,
            }}
            className="text-nowrap"
          />
          <div className="flex content-center items-center">
            <div className="flex items-center">
              {comment.modify_date > comment.create_date ? (
                <p className="ml-auto flex items-center text-end md:text-nowrap text-gray-500 text-sm">
                  {getFormatDateByLocale(comment.modify_date, lang)} (
                  {dict.comment.edited})
                </p>
              ) : (
                <p className="ml-auto flex items-center text-nowrap text-sm text-gray-500">
                  {getFormatDateByLocale(comment.create_date, lang)}
                </p>
              )}
            </div>

            <CommentManageButton
              authorName={comment.user_name}
              commentContent={comment.content}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        </div>

        {/* Content */}
        <div className="mt-4 flex content-center">
          <article className="markdown prose-base">
            <MarkdownRenderer>{comment.content}</MarkdownRenderer>
          </article>
        </div>

        <div className="mb-4 mt-4 flex content-center">
          <div className="mr-0 inline-block flex-shrink-0">
            <InteractIcon
              count={
                comment.likes.length +
                (isLiked && !isLikedBefore
                  ? 1
                  : isLikedBefore && !isLiked
                    ? -1
                    : 0)
              }
              shouldShowCount={true}
              tooltipContent={truncatedLikeTooltipContent}
            >
              <HeartIcon
                className={`flex h-6 w-6 align-middle 
                                ${
                                  isSelfComment
                                    ? "hover:cursor-not-allowed"
                                    : isLiked
                                      ? "fill-orange-500 text-orange-500 hover:cursor-pointer"
                                      : "hover:cursor-pointer hover:text-orange-500"
                                }
                                ${isShowingClickEffect ? "click-effect" : ""}
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
