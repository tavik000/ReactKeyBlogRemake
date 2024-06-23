import PostItem from './post-item';
// import { fetchPostPages } from '@/app/lib/data';

export default async function PostWrapper({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  // const totalPages = await fetchInvoicesPages(query);

  return (
    <ul className="post-items mx-auto mt-6 flex w-full max-w-1140px flex-row flex-wrap justify-start p-0">
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
    </ul>
  );
}
