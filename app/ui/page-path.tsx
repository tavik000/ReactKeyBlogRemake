"use client";

import { homepageURL, GetLangFromLocale } from "@/app/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocaleContext } from "@/app/components/context/locale-provider";

export function PagePath() {
  const { lang, dict } = useLocaleContext();
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter(Boolean);
  let postTitle: string = "";

  const isOnPost = pathArray.length >= 4;
  if (isOnPost) {
    pathArray[2] = pathArray[2].replace(/-/g, " ");
    postTitle = decodeURIComponent(pathArray[2]);
  }

  const blogUrl = `/${lang}`;

  return (
    <div>
      <div
        id="page-path"
        className="page-path relative z-10 mb-0 flex justify-center py-3"
      >
        <div className="mx-auto flex max-w-1140px list-none xs:flex-col md:flex-row rounded-md bg-white px-2.5 py-1 xs:w-11/12 xl:w-10/12 xl:basis-2/3">
          <PagePathItem url={homepageURL} shouldShowArrow={true} isPost={false}>
            {dict.overview.homepage}
          </PagePathItem>
          {pathArray.length >= 3 ? (
            <div className="flex xs:flex-col md:flex-row">
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
    <li className="flex items-start text-sm text-nowrap">
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
