import Link from 'next/link';
import Image from 'next/image';
import PostTag from './post-tag';

export default function PostItem() {
  return (
    <li className="post-item mb-6 flex w-1/3 max-w-400px basis-1/3 list-none flex-col px-11px">
      <article className="block h-full flex-row">
        <Link href="/login" className="article-link flex">
          <div className="post-article flex h-full flex-col rounded-xl bg-white px-3 pb-4 pt-6 font-bold shadow-0550">
            <Image
              src="/1920x1080_KirbyBday.png"
              width={333}
              height={188}
              alt="Screenshot of the dashboard project showing mobile version"
              className="post-article-thumbnail mb-3 block w-full flex-row rounded-xl"
            />
            <span className="article-title px-4 pb-3 text-lg font-bold">
              The Play Nintendo Tour invites fans of all ages to enjoy a summer
              of fun in cities across the U.S.
            </span>
            <span className="flex flex-row justify-between relative">
              <span className="article-date flex px-1em text-left text-14px/[1.5] font-normal h-full">
                June 04, 2024
              </span>
              <span className="w-3/5 flex justify-end flex-wrap">
                <PostTag>UE</PostTag>
                <PostTag>UE/ Visual Effect</PostTag>
                <PostTag>Other</PostTag>
              </span>
            </span>
          </div>
        </Link>
      </article>
    </li>
  );
}
