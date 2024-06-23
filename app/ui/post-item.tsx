import Link from 'next/link';
import Image from 'next/image';
import PostTag from './post-tag';
import { PostCard } from '../lib/definitions';

export default function PostItem(
  { post }: { post: PostCard }
) {

  
  return (
    <li className="post-item mb-6 flex w-1/3 max-w-400px basis-1/3 list-none flex-col px-11px">
      <article className="block h-full flex-row">
        <Link href="/login" className="article-link flex flex-row">
          <div className="post-article flex h-full flex-col rounded-xl bg-white px-3 pb-4 pt-6 font-bold shadow-0550">
            <Image
              src={post.thumbnail_img}
              width={333}
              height={188}
              alt="Screenshot of the dashboard project showing mobile version"
              className="post-article-thumbnail mb-3 block w-full flex-row rounded-xl"
            />
            <span className="article-title px-4 pb-3 text-lg font-bold">
              {post.title}
            </span>
            <span className="flex flex-row justify-between relative">
              <span className="article-date flex px-1em text-left text-14px/[1.5] font-normal h-full">
                {post.create_date.toDateString().split(' ').slice(1).join(' ').replace(/(?<=\d) /, ", ")}
              </span>
              <span className="w-3/5 flex justify-end flex-wrap">
                {post.tags.map((tag) => (
                  <PostTag key={tag}>
                    {tag}
                  </PostTag>
                ))}
              </span>
            </span>
          </div>
        </Link>
      </article>
    </li>
  );
}
