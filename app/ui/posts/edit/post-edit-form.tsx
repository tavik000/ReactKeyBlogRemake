'use client';

import Link from 'next/link';
import { RoundButton } from '../../button';
import { useFormState } from 'react-dom';
import { Post } from '@/app/lib/definitions';
import { updatePost } from '@/app/lib/actions';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import * as commands from '@uiw/react-md-editor/commands';
const { db } = require('@vercel/postgres');

const MDEditor = dynamic(() => import('../../../components/MdEditor'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function PostEditForm({ post }: { post: Post }) {

  const [markdownValue, setMarkdownValue] = useState('');

  const handleMarkdownChange = (value: string | undefined) => {
    setMarkdownValue(value || '');
  };

  const initialState = { message: null, errors: {} };
  const updatePostWithId = updatePost.bind(null, post.id, markdownValue, 'en');
  const [state, dispatch] = useFormState(updatePostWithId, initialState);


  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-lg font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={post.title}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-28px font-semibold outline-2 placeholder:text-gray-500"
            aria-describedby="title-error"
          />
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-base font-medium">
            Content
          </label>
          <MDEditor
            postContent={post.content}
            onMarkdownChange={handleMarkdownChange}
          />
          <div id="content-error" aria-live="polite" aria-atomic="true">
            {state.errors?.content &&
              state.errors.content.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="my-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
        <RoundButton type="submit" className="w-full">
          Save
        </RoundButton>
      </div>
    </form>
  );
}
