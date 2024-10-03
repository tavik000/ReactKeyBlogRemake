"use client";
import React, { useState, useContext, useEffect, useRef } from "react";
import { Button } from "@/app/ui/button";
import { useLoginOpenFromPostContext } from "@/app/components/context/login-open-from-post-provider";
import { useSessionContext } from "@/app/components/context/session-provider";
import { Avatar } from "@nextui-org/react";
import { useLocaleContext } from "@/app/components/context/locale-provider";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import {
  CommentState,
  createCommentWithAllLanguagesAndNotifications,
  updateComment,
} from "@/app/lib/actions";
import { useFormState } from "react-dom";

const CommentMDEditor = dynamic(() => import("@/app/components/CommentMdEditor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function CommentEditForm({
  isNewComment,
  commentId,
  postId,
  postTitle,
  defaultContent,
  onCancel,
  notifyTargetUserList,
}: {
  isNewComment: boolean;
  commentId: string | null;
  postId: string;
  postTitle: string;
  defaultContent?: string;
  onCancel: null | (() => void);
  notifyTargetUserList?: string[];
}) {
  const { locale, dict } = useLocaleContext();
  const { session } = useSessionContext();
  const { setIsLoginOpenFromPost } = useLoginOpenFromPostContext();

  const [markdownValue, setMarkdownValue] = useState(defaultContent || "");
  const [shouldClearToggle, setShouldClearToggle] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleMarkdownChange = (value: string | undefined) => {
    setMarkdownValue(value || "");
  };

  const clearMarkdownValue = () => {
    setShouldClearToggle(!shouldClearToggle);
  };

  const initialState = { message: null, errors: {} };
  const formStateParams = isNewComment
    ? createCommentWithAllLanguagesAndNotifications.bind(
        null,
        markdownValue,
        locale,
        postId,
        postTitle,
        session?.user?.name ?? "",
        session?.user?.image ?? "",
        notifyTargetUserList ?? [],
      )
    : updateComment.bind(null, commentId ?? "", locale, markdownValue, postId, postTitle);

  const [state, dispatch] = useFormState<CommentState, FormData>(
    formStateParams,
    initialState,
  );

  type DictStructure = {
    [key: string]: any;
  };

  const getDictValue = (errorString: string): string => {
    const keys = errorString.split(".").slice(1);
    return keys.reduce(
      (acc: DictStructure, key: string) => acc[key],
      dict as DictStructure,
    ) as unknown as string;
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "Enter") {
        formRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true }),
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      {session && session?.user && session.user?.image ? (
        <>
          <div className="mt-4 flex-col">
            <div className="flex">
              <Avatar src={session.user.image} size="sm" />
              {isNewComment ? (
                <div className="flex w-full flex-row justify-between">
                  <p className="ml-2 flex justify-start text-nowrap">
                    {dict.comment.writeComment}
                  </p>
                  <p className="mt-1 flex justify-end align-bottom text-sm text-gray-400">
                    {dict.comment.pasteImageTip}
                  </p>
                </div>
              ) : (
                <div className="flex w-full flex-row justify-between">
                  <p className="ml-2 justify-center text-nowrap text-center align-middle">
                    {dict.comment.editComment}
                  </p>
                  <p className="mt-1 flex justify-end align-bottom text-sm text-gray-400">
                    {dict.comment.pasteImageTip}
                  </p>
                </div>
              )}
            </div>
            <form
              ref={formRef}
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                dispatch(new FormData(e.currentTarget));
                if (isNewComment) {
                  clearMarkdownValue();
                }
                if (onCancel) {
                  onCancel();
                }
              }}
            >
              <div className="flex w-full flex-col justify-between">
                <label htmlFor="content" className="mb-2 block text-base font-medium" />
                <CommentMDEditor
                  isNewComment={isNewComment}
                  content={markdownValue}
                  onMarkdownChange={handleMarkdownChange}
                  shouldClear={shouldClearToggle}
                />
                <div id="content-error" aria-live="polite" aria-atomic="true">
                  {state?.errors?.commentContent &&
                    state.errors.commentContent.map(
                      (error: string, index: number) =>
                        error && (
                          <p className="mt-2 text-sm text-red-500" key={index}>
                            {state?.message ? getDictValue(state.message) : ""}
                          </p>
                        ),
                    )}
                </div>
                <div className="mb-1 flex justify-end">
                  <div className="mt-1 flex w-24 justify-end">
                    {!isNewComment && (
                      <Button
                        className="box-border flex justify-center border-2 border-gray-300 
                                                bg-white hover:bg-gray-200 focus-visible:outline-gray-200 active:bg-gray-300
                                                dark:border-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-700"
                        onClick={() => {
                          if (onCancel) {
                            onCancel();
                          }
                        }}
                      >
                        <p className="flex whitespace-nowrap font-bold text-gray-500 dark:text-gray-200">
                          {dict.comment.cancel}
                        </p>
                      </Button>
                    )}
                  </div>
                  <div className="ml-1 mt-1 flex w-24 justify-end">
                    <Button
                      className="flex max-w-24 bg-orange-500 hover:bg-orange-600 focus-visible:outline-orange-500 active:bg-orange-600"
                      type="submit"
                    >
                      <p className="font-bold">
                        {isNewComment ? dict.comment.respond : dict.comment.update}
                      </p>
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="mt-4 flex-col rounded-lg bg-gray-200 p-6 text-center">
            <p className="flex justify-center text-lg font-semibold text-black">
              {dict.comment.letComment}
            </p>
            <div className="mt-4 flex w-full flex-col justify-center">
              <Button
                className=" flex justify-center bg-orange-500 hover:bg-orange-600 focus-visible:outline-orange-500 active:bg-orange-600"
                onClick={() => {
                  setIsLoginOpenFromPost(true);
                }}
              >
                <p className="font-bold">{dict.comment.login}</p>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
