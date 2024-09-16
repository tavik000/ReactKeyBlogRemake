import PostCategory from './post-category';
import PostWrapper from './post-wrapper';
import Pagination from './pagination';
import { fetchPostsPages } from '@/app/lib/data';

export default async function PostOverview({
  searchParams,
  locale,
}: {
  searchParams?: {
    tag?: string;
    query?: string;
    page?: string;
  };
  locale: string;
}) {
  const tag = searchParams?.tag || '';
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchPostsPages(tag, query, locale);

  return (
    <>
      <div className="post-overview">
        <PostCategory locale={locale} />
        <PostWrapper tag={tag} query={query} currentPage={currentPage} locale={locale} />
        <Pagination totalPages={totalPages} />
      </div>

      {/* <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p
            // className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
            className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            alt="Screenshots of the dashboard project showing desktop version"
            className="hidden md:block"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            alt="Screenshot of the dashboard project showing mobile version"
            className="block md:hidden"
          />
        </div>
      </div> */}
    </>
  );
}
