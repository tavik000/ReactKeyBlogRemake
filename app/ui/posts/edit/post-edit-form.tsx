'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../../button';
import { useFormState } from 'react-dom';
import { Post } from '@/app/lib/definitions';
import {
  createPostWithAllLanguages,
  State,
  updatePostWithAllLanguages,
} from '@/app/lib/actions';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { GetLangFromLocale } from '@/app/lib/constants';
import { PostTagItem } from '@/app/ui/posts/general/post-tag';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button as NextUIButton,
} from '@nextui-org/react';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

const { db } = require('@vercel/postgres');

const MDEditor = dynamic(() => import('../../../components/MdEditor'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface CloudinaryResult {
  public_id: string;
  secure_url: string;
}

export default function PostEditForm({
  locale,
  posts,
  allPostTags,
  isNewPost,
}: {
  locale: string;
  posts: Post[];
  allPostTags: string[];
  isNewPost: boolean;
}) {
  const lang = GetLangFromLocale(locale);
  const post_en = posts[0];
  const post_ja = posts[1];
  const post_kr = posts[2];
  const post_hk = posts[3];

  const [editPostTags, setEditPostTag] = useState(post_en.tags);
  const [isExceedFiveTag, setIsExceedFiveTag] = useState(false);

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
  const formStateParams = isNewPost
    ? createPostWithAllLanguages.bind(
        null,
        locale,
        thumbnailImage,
        editPostTags,
        markdownValue_en,
        markdownValue_ja,
        markdownValue_kr,
        markdownValue_hk,
      )
    : updatePostWithAllLanguages.bind(
        null,
        locale,
        post_en.id,
        thumbnailImage,
        editPostTags,
        markdownValue_en,
        markdownValue_ja,
        markdownValue_kr,
        markdownValue_hk,
      );

  const [state, dispatch] = useFormState<State, FormData>(
    formStateParams,
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
              {thumbnailImage ? (
                <Image
                  src={thumbnailImage}
                  width={333}
                  height={188}
                  alt="thumbnail image"
                  className="block rounded-xl"
                  priority={true}
                />
              ) : (
                <></>
              )}
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
          <div className="flex flex-row">
            <label
              htmlFor="content"
              className="mb-2 flex text-base font-medium"
            >
              Category
            </label>
            {isExceedFiveTag ? (
              <p className="mb-2 ml-2 flex text-base text-red-500">
                (Maximum of 5 tags)
              </p>
            ) : (
              <></>
            )}
            {state.errors?.tags &&
              state.errors.tags.map((error: string) => (
                <p
                  className="mb-2 ml-2 flex text-base text-red-500"
                  key={error}
                >
                  {error}
                </p>
              ))}
          </div>
          <div className="flex flex-row items-end">
            <Dropdown className="flex-none">
              <DropdownTrigger>
                <NextUIButton
                  variant="bordered"
                  className="rounded-lg border border-gray-200 bg-white hover:bg-gray-100"
                >
                  Add Tag
                  <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-500 hover:text-gray-100" />
                </NextUIButton>
              </DropdownTrigger>
              <DropdownMenu
                className="max-h-96 overflow-y-auto rounded-lg bg-white"
                aria-label="Static Actions"
                onAction={(key) => {
                  const newTag = key.toString();
                  setEditPostTag((prevTags) => {
                    if (prevTags.length >= 5) {
                      setIsExceedFiveTag(true);
                      return prevTags;
                    }
                    const updatedTags = new Set([...prevTags, newTag]);
                    return Array.from(updatedTags);
                  });
                }}
              >
                {allPostTags.map((tag: string) => (
                  <DropdownItem className="hover:bg-gray-100" key={tag}>
                    {tag}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <div className="ml-4 flex h-full flex-none">
              {editPostTags.map((tag: string) => (
                <div className="flex flex-row items-start" key={tag}>
                  <PostTagItem
                    tag={tag}
                    isLabel={true}
                    isClickable={false}
                    className="flex"
                  />
                  <button
                    className="ml-1 flex hover:scale-125"
                    onClick={() => {
                      setEditPostTag((prevTags) => {
                        const updatedTags = new Set([...prevTags]);
                        updatedTags.delete(tag);
                        setIsExceedFiveTag(false);
                        return Array.from(updatedTags);
                      });
                    }}
                  >
                    <XMarkIcon className="h-4 w-4 text-gray-500 hover:text-red-500" />
                  </button>
                </div>
              ))}
            </div>
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
            className="w-full bg-blue-500 hover:bg-blue-400 focus-visible:outline-blue-500 active:bg-blue-600"
          >
            Save
          </Button>
        </div>
        <div className="w-1/2 px-2">
          <Link
            href={{
              pathname: `/${lang}`,
            }}
            className="w-full"
          >
            <Button
              type="button"
              className="w-full bg-red-500 hover:bg-red-400 focus-visible:outline-red-500 active:bg-red-600"
            >
              Cancel
            </Button>
          </Link>
        </div>
      </div>
    </form>
  );
}
