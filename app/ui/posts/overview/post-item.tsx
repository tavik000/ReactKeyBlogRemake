"use client";
import Link from "next/link";
import Image from "next/image";
import { PostTagItem } from "@/app/ui/posts/general/post-tag";
import { PostCard } from "@/app/lib/definitions";
import { useLocaleContext } from "@/app/components/context/locale-provider";
import { getFormatDateByLocale } from "@/app/lib/utils";

export default function PostItem({ post }: { post: PostCard }) {
  const { lang } = useLocaleContext();
  const urlRegex = /\s/g;
  const url_title = post.title.toLowerCase().replace(urlRegex, "-");

  return (
  <li className="post-item mx-auto mb-6 flex min-h-[300px] w-full max-w-[400px] list-none flex-col px-[11px] sm:w-1/3 md:w-1/2 md:max-w-none md:basis-1/2 lg:basis-1/3">
      <article className="mx-auto block h-full w-full flex-row">
        <Link
          href={`${lang}/posts/${url_title}/${post.id}#blog-title`}
          className="article-link mx-auto flex h-full flex-row"
        >
          <div className="post-article flex h-full w-full flex-col justify-between rounded-xl dark:bg-zinc-900 bg-white px-3 pb-4 pt-6 font-bold shadow-0550 ">
            <Image
              src={post.thumbnail_img}
              width={333}
              height={188}
              alt="thumbnail image"
              className="post-article-thumbnail mb-3 block w-full flex-row rounded-xl"
              priority={true}
            />
            <span className="article-title flex-grow items-start px-4 pb-3 text-[18px] font-bold">
              {post.title}
            </span>
            <span className="relative mb-0 flex flex-row justify-between ">
              <span className="article-date flex h-full items-end text-nowrap px-1em text-left text-14px/[1.5] font-normal">
                {getFormatDateByLocale(post.create_date, lang)}
              </span>
              <span className="flex w-3/5 flex-wrap justify-end">
                {post.tags.map((tag) => (
                  <PostTagItem
                    key={tag}
                    tag={tag}
                    isLabel={true}
                    isClickable={false}
                  />
                ))}
              </span>
            </span>
          </div>
        </Link>
      </article>
    </li>
  );
}
