'use client';

import Link from 'next/link';
import Image from 'next/image';
import { RoundButton, Button } from '../../button';
import { useFormState } from 'react-dom';
import { Post } from '@/app/lib/definitions';
import { updatePost } from '@/app/lib/actions';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import * as commands from '@uiw/react-md-editor/commands'; //TODO
import { set } from 'zod'; //TODO
const { db } = require('@vercel/postgres');

const MDEditor = dynamic(() => import('../../../components/MdEditor'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface CloudinaryResult {
  public_id: string;
  secure_url: string;
}

export default function PostEditForm({ post }: { post: Post }) {
  const [markdownValue, setMarkdownValue] = useState('');

  const handleMarkdownChange = (value: string | undefined) => {
    setMarkdownValue(value || '');
  };

  const [thumbnailImage, setThumbnailImage] = useState(post.thumbnail_img);

  const initialState = { message: null, errors: {} };
  const updatePostWithId = updatePost.bind(null, post.id, thumbnailImage, markdownValue, 'en');
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
          <label
            htmlFor="thumbnail_img"
            className="mb-2 block text-base font-medium"
          >
            Thumbnail Image (333 x 188)
          </label>
          <div className="flex flex-col items-baseline">
            <div className="mt-6 flex">
              <Image
                src={thumbnailImage}
                width={333}
                height={188}
                alt="thumbnail image"
                className="block rounded-xl"
                priority={true}
              />
            </div>
            <div className="mt-6 flex">
              <CldUploadWidget
                uploadPreset="key_blog_thumbnail"
                onSuccess={(result, { widget }) => {
                  const info = result.info as CloudinaryResult;
                  setThumbnailImage(info.secure_url);
                  widget.close();
                }}
              >
                {({ open }) => {
                  function handleOnClick() {
                    open();
                  }
                  return (
                    <Button type="button" onClick={handleOnClick}>
                      Upload an Image
                    </Button>
                  );
                }}
              </CldUploadWidget>
            </div>
          </div>
          <div id="thumbnail_img-error" aria-live="polite" aria-atomic="true">
            {state.errors?.thumbnail_img &&
              state.errors.thumbnail_img.map((error: string) => (
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
