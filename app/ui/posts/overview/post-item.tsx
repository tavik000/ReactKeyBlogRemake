import Link from 'next/link';
import Image from 'next/image';
import { PostTagItem } from '@/app/ui/posts/general/post-tag';
import { PostCard } from '@/app/lib/definitions';
import { GetLangFromLocale } from '@/app/lib/constants';

export default function PostItem({
  locale,
  post,
}: {
  locale: string;
  post: PostCard;
}) {
  const urlRegex = /\s/g;
  const url_title = post.title.toLowerCase().replace(urlRegex, '-');

  const lang = GetLangFromLocale(locale);

  return (
    <li className="post-item mb-6 flex h-400px w-1/3 max-w-400px basis-1/3 list-none flex-col px-11px">
      <article className="block h-full flex-row">
        <Link
          href={`${lang}/posts/${url_title}/${post.id}#blog-title`}
          className="article-link flex h-full flex-row"
        >
          {/* <Link href={`/posts/${post.id}`} className="article-link flex flex-row h-full"> */}
          <div className="post-article flex h-full w-full flex-col justify-between rounded-xl bg-white px-3 pb-4 pt-6 font-bold shadow-0550">
            <Image
              src={post.thumbnail_img}
              width={333}
              height={188}
              alt="thumbnail image"
              className="post-article-thumbnail mb-3 block w-full flex-row rounded-xl"
              priority={true}
            />
            <span className="article-title flex-grow items-start px-4 pb-3 text-lg font-bold">
              {post.title}
            </span>
            <span className="relative mb-0 flex flex-row justify-between ">
              <span className="article-date flex h-full items-end px-1em text-left text-14px/[1.5] font-normal">
                {post.create_date
                  .toDateString()
                  .split(' ')
                  .slice(1)
                  .join(' ')
                  .replace(/(?<=\d) /, ', ')}
              </span>
              <span className="flex w-3/5 flex-wrap justify-end">
                {post.tags.map((tag) => (
                  <PostTagItem
                    key={tag}
                    locale={locale}
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
