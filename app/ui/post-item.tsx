import Link from 'next/link';
import Image from 'next/image';
import PostTag from './post-tag';
import { PostCard } from '../lib/definitions';

export default function PostItem(
  { post }: { post: PostCard }
) {

  
  return (
    <li className="post-item mb-6 flex w-1/3 max-w-400px basis-1/3 list-none flex-col px-11px h-400px">
      <article className="block h-full flex-row">
        <Link href="/login" className="article-link flex flex-row h-full">
          <div className="post-article flex h-full w-full justify-between flex-col rounded-xl bg-white px-3 pb-4 pt-6 font-bold shadow-0550">
            <Image
              src={post.thumbnail_img}
              width={333}
              height={188}
              alt="Screenshot of the dashboard project showing mobile version"
              className="post-article-thumbnail mb-3 block w-full flex-row rounded-xl"
            />
            <span className="article-title items-start px-4 pb-3 text-lg font-bold flex-grow">
              {post.title}
            </span>
            <span className="mb-0 flex flex-row justify-between relative ">
              <span className="article-date flex items-end px-1em text-left text-14px/[1.5] font-normal h-full">
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
