'use client';

import { homepageURL } from '@/app/lib/constants';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import path from 'path';

export function PagePath() {
  const pathname = usePathname();
  const pathArray = pathname.split('/').filter(Boolean);
  let postTitle: string = '';

  if (pathArray.length >= 3) {
    pathArray[1] = pathArray[1].replace(/-/g, ' ');
    postTitle = pathArray[1];
  }

  return (
    <div className="page-path relative z-10 mb-0 flex justify-center py-3">
      <div className="flex flex-row py-1 px-2.5 mx-auto w-10/12 max-w-1140px basis-2/3 list-none rounded-md bg-white">
        <PagePathItem url={homepageURL} shouldShowArrow={true} isPost={false}>
          Key Homepage
        </PagePathItem>
        {pathArray.length >= 3 ? (
          <div className="flex flex-row">
            <PagePathItem url="/" shouldShowArrow={true} isPost={false}>
              Blog
            </PagePathItem>
            <PagePathItem url="" shouldShowArrow={false} isPost={true}>
              {postTitle}
            </PagePathItem>
          </div>
        ) : (
          <PagePathItem url="/" shouldShowArrow={false} isPost={false}>
            Blog
          </PagePathItem>
        )}
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
    <li className="inline text-sm">
      <Link href={url} className="text-orange-400 hover:underline">
        <span>{children}</span>
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
