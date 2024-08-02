'use client';

import { homepageURL, GetLangFromLocale } from '@/app/lib/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DictStructure } from '@/app/components/localization/dict-store';
import { Button } from '@/app/ui/button';
import { signInAction } from '@/app/lib/actions';
import { AuthError } from 'next-auth';

export function PagePath({
  locale,
  dict,
}: {
  locale: string;
  dict: DictStructure;
}) {
  const pathname = usePathname();
  const pathArray = pathname.split('/').filter(Boolean);
  let postTitle: string = '';

  const isOnPost = pathArray.length >= 4;
  if (isOnPost) {
    pathArray[2] = pathArray[2].replace(/-/g, ' ');
    postTitle = decodeURIComponent(pathArray[2]);
  }

  const lang = GetLangFromLocale(locale);
  const blogUrl = `/${lang}`;

  return (
    <div>
      <div
        id="page-path"
        className="page-path relative z-10 mb-0 flex justify-center py-3"
      >
        <div className="mx-auto flex w-10/12 max-w-1140px basis-2/3 list-none flex-row rounded-md bg-white px-2.5 py-1">
          <PagePathItem url={homepageURL} shouldShowArrow={true} isPost={false}>
            {dict.overview.homepage}
          </PagePathItem>
          {pathArray.length >= 3 ? (
            <div className="flex flex-row">
              <PagePathItem url={blogUrl} shouldShowArrow={true} isPost={false}>
                {dict.overview.blog}
              </PagePathItem>
              <PagePathItem url="" shouldShowArrow={false} isPost={true}>
                {postTitle}
              </PagePathItem>
            </div>
          ) : (
            <PagePathItem url={blogUrl} shouldShowArrow={false} isPost={false}>
              {dict.overview.blog}
            </PagePathItem>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-between px-1 py-2">
        <Button
          color="primary"
          className={
            'mb-4 flex w-full bg-white z-10 rounded-lg outline-gray-300 hover:outline-orange-200'
          }
          onClick={() => {
            try {
              signInAction('google', '/en');
            } catch (error) {
              if (error instanceof AuthError) {
                throw new Error('AuthError: ' + error.message);
              }
            }
          }}
        >
          <span className="">
            <svg viewBox="0 0 533.5 544.3" height="18" width="18">
              <title>google-colored</title>
              <path
                d="M533.5,278.4a320.07,320.07,0,0,0-4.7-55.3H272.1V327.9h147a126,126,0,0,1-54.4,82.7v68h87.7C503.9,431.2,533.5,361.2,533.5,278.4Z"
                fill="#4285f4"
              ></path>
              <path
                d="M272.1,544.3c73.4,0,135.3-24.1,180.4-65.7l-87.7-68c-24.4,16.6-55.9,26-92.6,26-71,0-131.2-47.9-152.8-112.3H28.9v70.1A272.19,272.19,0,0,0,272.1,544.3Z"
                fill="#34a853"
              ></path>
              <path
                d="M119.3,324.3a163,163,0,0,1,0-104.2V150H28.9a272.38,272.38,0,0,0,0,244.4Z"
                fill="#fbbc04"
              ></path>
              <path
                d="M272.1,107.7a147.89,147.89,0,0,1,104.4,40.8h0l77.7-77.7A261.56,261.56,0,0,0,272.1,0,272.1,272.1,0,0,0,28.9,150l90.4,70.1C140.8,155.6,201.1,107.7,272.1,107.7Z"
                fill="#ea4335"
              ></path>
            </svg>
          </span>
          <p className="font-semibold">{dict.header.signInWithGoogle}</p>
        </Button>

        <Button
          color="primary"
          className={
            'mb-4 flex w-full rounded-lg z-10 bg-white outline-gray-300 hover:outline-orange-200'
          }
          onClick={() => {
            try {
              signInAction('twitter', '/en');
            } catch (error) {
              if (error instanceof AuthError) {
                throw new Error('AuthError: ' + error.message);
              }
            }
          }}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-twitter-x"
              viewBox="0 0 16 16"
            >
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
            </svg>
          </span>
          <p className="font-semibold">{dict.header.signInWithTwitter}</p>
        </Button>
      </div>
    </div>
  );
}

function PagePathItem({
  children,
  shouldShowArrow,
  url,
  isPost,
}: {
  children: string;
  shouldShowArrow?: boolean;
  url: string;
  isPost: boolean;
}) {
  return !isPost ? (
    <li className="flex items-start text-sm">
      <Link href={url} className="text-orange-400 hover:underline">
        <span className="whitespace-nowrap">{children}</span>
      </Link>
      {shouldShowArrow && <span className="page-path-arrow mx-2">&gt;</span>}
    </li>
  ) : (
    <li className="inline text-sm">
      <div className="text-black">
        <span>{children}</span>
      </div>
    </li>
  );
}
