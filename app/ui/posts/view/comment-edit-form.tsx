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

interface CloudinaryResult {
    public_id: string;
    secure_url: string;
}

const MDEditor = dynamic(() => import('@/app/components/MdEditor'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

export default function CommentEditForm({
    isNewComment,
    commentId,
    postId,
    postTitle
}: {
    isNewComment: boolean,
    commentId: string | null,
    postId: string,
    postTitle: string
}) {

    const { locale, dict } = useLocaleContext();
    const { session } = useSessionContext();
    const { setIsLoginOpenFromPost } = useLoginOpenFromPostContext();

    const [markdownValue, setMarkdownValue] = useState('');

    const handleMarkdownChange = (value: string | undefined) => {
        setMarkdownValue(value || '');
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





    return (
        <div>
            {session && session?.user && session.user?.image ? (
                <>
                    {/* localization */}
                    <div className="flex-col mt-4">
                        <div className="flex">
                            <Avatar
                                src={session.user.image}
                                size='sm'
                            />
                            {isNewComment ? (
                                <p className="ml-2 text-center align-middle justify-center">comment something...</p>
                            ) : (
                                <p className="ml-2 text-center align-middle justify-center">edit your comment...</p>
                            )}
                        </div>
                        <form action={dispatch}>
                            <label htmlFor="content" className="mb-2 block text-base font-medium" />
                            <MDEditor
                                content="Markdown content"
                                onMarkdownChange={handleMarkdownChange}
                            />
                            <div id="content-error" aria-live="polite" aria-atomic="true">
                                {state.errors?.commentContent &&
                                    state.errors.commentContent.map((error: string) => (
                                        <p className="mt-2 text-sm text-red-500" key={error}>
                                            {error}
                                        </p>
                                    ))}
                            </div>
                        </form>


                    </div>
                </>
            ) : (
                <>
                    <div className="flex-col rounded-lg mt-4 p-6 text-center bg-gray-200">
                        <p className="flex justify-center text-lg font-semibold text-black">Let&apos;s comment your feeling</p>
                        <div className="flex justify-center mt-4 w-full">
                            <Button className=" flex justify-center bg-orange-500 hover:bg-orange-600 focus-visible:outline-orange-500 active:bg-orange-600"
                                onClick={() => {
                                    setIsLoginOpenFromPost(true);
                                }}
                            >
                                Login
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}