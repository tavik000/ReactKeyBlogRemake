import Link from 'next/link';
import Image from 'next/image';

export default function PostItem() {
  return (
    <li className="post-item mb-6 flex list-none flex-col max-w-400px w-1/3 px-11px basis-1/3">
      <article className="block h-full flex-row">
        <Link href="/login" className="article-link flex">
          <div className="post-article flex flex-col bg-white rounded-xl shadow-0550 font-bold h-full pt-6 px-3 pb-4">
            <Image
              src="/1920x1080_KirbyBday.png"
              width={333}
              height={188}
              alt="Screenshot of the dashboard project showing mobile version"
              className="post-article-thumbnail mb-3 block w-full flex-row rounded-xl"
            />
            <span className="article-date px-4 pb-3 text-sm font-normal">June 04, 2024</span>
            <span className="article-title px-4 pb-5 text-lg font-bold">
              The Play Nintendo Tour invites fans of all ages to enjoy a summer
              of fun in cities across the U.S.
            </span>
            <span className="text-right">
              <span className="w-auto px-1em mb-5px ml-5px static inline-block rounded-md text-sm text-center text-white font-normal bg-orange-500">UE</span>
              <span className="w-auto px-1em mb-5px ml-5px static inline-block rounded-md text-sm text-center text-white font-normal bg-orange-500">Other</span>
            </span>
          </div>
        </Link>
      </article>
    </li>
  );
}
