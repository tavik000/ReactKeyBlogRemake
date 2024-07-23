import PostItem from './post-item';
import { fetchFilteredPosts } from '@/app/lib/data';

export default async function PostWrapper({
  query,
  currentPage,
  locale,
}: {
  query: string;
  currentPage: number;
  locale: string;
}) {
  const posts = await fetchFilteredPosts(query, currentPage, locale);

  return (
    <ul className="post-items clear-both mx-auto mb-16 mt-6 flex w-full max-w-1140px flex-row flex-wrap justify-start p-0">
      {posts?.map((post) => (
        <PostItem key={post.id} locale={locale} post={post} />
      ))}
    </ul>
  );
}
