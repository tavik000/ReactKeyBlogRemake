'use client';

import Link from 'next/link';
import Image from 'next/image';
import { RoundButton, Button } from '../../button';
import { useFormState } from 'react-dom';
import { Post } from '@/app/lib/definitions';
import { State, updatePostWithAllLanguages } from '@/app/lib/actions';
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

export default function PostEditForm({ posts }: { posts: Post[] }) {
  const post_en = posts[0];
  const post_ja = posts[1];
  const post_kr = posts[2];
  const post_hk = posts[3];

  const [markdownValue_en, setMarkdownValue_en] = useState('');

  const handleMarkdownChange_en = (value: string | undefined) => {
    setMarkdownValue_en(value || '');
  };

  const [markdownValue_ja, setMarkdownValue_ja] = useState('');

  const handleMarkdownChange_ja = (value: string | undefined) => {
    setMarkdownValue_ja(value || '');
  };

  const [markdownValue_kr, setMarkdownValue_kr] = useState('');

  const handleMarkdownChange_kr = (value: string | undefined) => {
    setMarkdownValue_kr(value || '');
  };

  const [markdownValue_hk, setMarkdownValue_hk] = useState('');

  const handleMarkdownChange_hk = (value: string | undefined) => {
    setMarkdownValue_hk(value || '');
  };

  const [thumbnailImage, setThumbnailImage] = useState(post_en.thumbnail_img);

  const initialState = { message: null, errors: {} };

  const updatePostWithId = updatePostWithAllLanguages.bind(
    null,
    post_en.id,
    thumbnailImage,
    markdownValue_en,
    markdownValue_ja,
    markdownValue_kr,
    markdownValue_hk,
  );

  const [state, dispatch] = useFormState<State, FormData>(
    updatePostWithId,
    initialState,
  );

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
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
                    <Button
                      type="button"
                      onClick={handleOnClick}
                      className="bg-blue-500 hover:bg-blue-400"
                    >
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
          <label htmlFor="title_en" className="mb-2 block text-lg font-medium">
            Title (English)
          </label>
          <input
            id="title_en"
            name="title_en"
            type="text"
            defaultValue={post_en.title}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-28px font-semibold outline-2 placeholder:text-gray-500"
            aria-describedby="title-error"
          />
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title_en &&
              state.errors.title_en.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-base font-medium">
            Content (English)
          </label>
          <MDEditor
            postContent={post_en.content}
            onMarkdownChange={handleMarkdownChange_en}
          />
          <div id="content-error" aria-live="polite" aria-atomic="true">
            {state.errors?.content_en &&
              state.errors.content_en.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="title_ja" className="mb-2 block text-lg font-medium">
            Title (Japanese)
          </label>
          <input
            id="title_ja"
            name="title_ja"
            type="text"
            defaultValue={post_ja.title}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-28px font-semibold outline-2 placeholder:text-gray-500"
            aria-describedby="title-error"
          />
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title_ja &&
              state.errors.title_ja.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-base font-medium">
            Content (Japanese)
          </label>
          <MDEditor
            postContent={post_ja.content}
            onMarkdownChange={handleMarkdownChange_ja}
          />
          <div id="content-error" aria-live="polite" aria-atomic="true">
            {state.errors?.content_ja &&
              state.errors.content_ja.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="title_kr" className="mb-2 block text-lg font-medium">
            Title (Korean)
          </label>
          <input
            id="title_kr"
            name="title_kr"
            type="text"
            defaultValue={post_kr.title}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-28px font-semibold outline-2 placeholder:text-gray-500"
            aria-describedby="title-error"
          />
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title_kr &&
              state.errors.title_kr.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-base font-medium">
            Content (Korean)
          </label>
          <MDEditor
            postContent={post_kr.content}
            onMarkdownChange={handleMarkdownChange_kr}
          />
          <div id="content-error" aria-live="polite" aria-atomic="true">
            {state.errors?.content_kr &&
              state.errors.content_kr.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="title_hk" className="mb-2 block text-lg font-medium">
            Title (Traditional Chinese)
          </label>
          <input
            id="title_hk"
            name="title_hk"
            type="text"
            defaultValue={post_hk.title}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-28px font-semibold outline-2 placeholder:text-gray-500"
            aria-describedby="title-error"
          />
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title_hk &&
              state.errors.title_hk.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-base font-medium">
            Content (Traditional Chinese)
          </label>
          <MDEditor
            postContent={post_hk.content}
            onMarkdownChange={handleMarkdownChange_hk}
          />
          <div id="content-error" aria-live="polite" aria-atomic="true">
            {state.errors?.content_hk &&
              state.errors.content_hk.map((error: string) => (
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
      </div>
      <div className="mt-4 flex flex-row">
        <div className="w-1/2 px-2">
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-400"
          >
            Save
          </Button>
        </div>
        <div className="w-1/2 px-2">
          <Link href="/" className="w-full">
            <Button
              type="button"
              className="w-full bg-red-500 hover:bg-red-400"
            >
              Cancel
            </Button>
          </Link>
        </div>
      </div>
    </form>
  );
}
