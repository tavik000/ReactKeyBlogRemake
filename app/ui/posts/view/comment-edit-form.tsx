'use client';
import { Button } from '@/app/ui/button';
import { useLoginOpenFromPostContext } from '@/app/components/context/login-open-from-post-provider';
import { useSessionContext } from '@/app/components/context/session-provider';
import { Avatar } from '@nextui-org/react';
import { useLocaleContext } from '@/app/components/context/locale-provider';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { CommentState, createCommentWithAllLanguages, updateComment } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { get } from 'http';

const CommentMDEditor = dynamic(() => import('@/app/components/CommentMdEditor'), {
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
}: {
    isNewComment: boolean,
    commentId: string | null,
    postId: string,
    postTitle: string,
    defaultContent?: string,
    onCancel: null | (() => void),
}) {

    const { locale, dict } = useLocaleContext();
    const { session } = useSessionContext();
    const { setIsLoginOpenFromPost } = useLoginOpenFromPostContext();

    const [markdownValue, setMarkdownValue] = useState(defaultContent || '');
    const [shouldClearToggle, setShouldClearToggle] = useState(false);

    const handleMarkdownChange = (value: string | undefined) => {
        setMarkdownValue(value || '');
    };

    const clearMarkdownValue = () => {
        setShouldClearToggle(!shouldClearToggle);
    };

    const initialState = { message: null, errors: {} };
    const formStateParams = isNewComment ?
        createCommentWithAllLanguages.bind(
            null,
            markdownValue,
            locale,
            postId,
            postTitle,
            session?.user?.name ?? '',
            session?.user?.image ?? ''
        ) : updateComment.bind(
            null,
            commentId ?? '',
            locale,
            markdownValue,
            postId,
            postTitle,
        );

    const [state, dispatch] = useFormState<CommentState, FormData>(
        formStateParams,
        initialState,
    );

    type DictStructure = {
        [key: string]: any;
    };
    
    const getDictValue = (errorString: string): string => {
        const keys = errorString.split('.').slice(1); 
        return keys.reduce((acc: DictStructure, key: string) => acc[key], dict as DictStructure) as unknown as string;
    };

    return (
        <div>
            {session && session?.user && session.user?.image ? (
                <>
                    <div className="flex-col mt-4">
                        <div className="flex">
                            <Avatar
                                src={session.user.image}
                                size='sm'
                            />
                            {isNewComment ? (
                                <div className="flex flex-row w-full justify-between">
                                    <p className="flex ml-2 justify-start">{dict.comment.writeComment}</p>
                                    <p className="flex justify-end mt-1 align-bottom text-sm text-gray-400">{dict.comment.pasteImageTip}</p>
                                </div>
                            ) : (
                                <div className="flex flex-row w-full justify-between">
                                    <p className="ml-2 text-center align-middle justify-center">{dict.comment.editComment}</p>
                                    <p className="flex justify-end mt-1 align-bottom text-sm text-gray-400">{dict.comment.pasteImageTip}</p>
                                </div>
                            )}
                        </div>
                        <form
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
                            <div className="flex flex-col w-full justify-between">
                                <label htmlFor="content" className="mb-2 block text-base font-medium" />
                                <CommentMDEditor
                                    isNewComment={isNewComment}
                                    content={markdownValue}
                                    onMarkdownChange={handleMarkdownChange}
                                    shouldClear={shouldClearToggle}
                                />
                                <div id="content-error" aria-live="polite" aria-atomic="true">
                                    {state?.errors?.commentContent &&
                                        state.errors.commentContent.map((error: string, index: number) => (
                                            error && (
                                                <p className="mt-2 text-sm text-red-500" key={index}>
                                                    {state?.message ? getDictValue(state.message) : ''}
                                                </p>
                                            )
                                        ))}
                                </div>
                                <div className="flex justify-end mb-1">
                                    <div className="flex justify-end mt-1 w-24">
                                        {!isNewComment &&
                                            (<Button className="flex justify-center border-2 box-border border-gray-300 
                                                bg-white hover:bg-gray-200 focus-visible:outline-gray-200 active:bg-gray-300"
                                                onClick={() => {
                                                    if (onCancel) {
                                                        onCancel();
                                                    }
                                                }}
                                            >
                                                <p className="flex text-gray-500 whitespace-nowrap">{dict.comment.cancel}</p>
                                            </Button>)
                                        }
                                    </div>
                                    <div className="flex mt-1 ml-1 justify-end w-24">
                                        <Button
                                            className="max-w-24 flex bg-orange-500 hover:bg-orange-600 focus-visible:outline-orange-500 active:bg-orange-600"
                                            type="submit"
                                        >
                                            {isNewComment ? dict.comment.respond : dict.comment.update}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>


                    </div>
                </>
            ) : (
                <>
                    <div className="flex-col rounded-lg mt-4 p-6 text-center bg-gray-200">
                        <p className="flex justify-center text-lg font-semibold text-black">{dict.comment.letComment}</p>
                        <div className="flex-col flex justify-center mt-4 w-full">
                            <Button className=" flex justify-center bg-orange-500 hover:bg-orange-600 focus-visible:outline-orange-500 active:bg-orange-600"
                                onClick={() => {
                                    setIsLoginOpenFromPost(true);
                                }}
                            >
                                {dict.comment.login}
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}