import { useLocaleContext } from '@/app/components/context/locale-provider';
import PostItem from './post-item';
import { fetchFilteredPosts } from '@/app/lib/data';

export default async function PostWrapper({
  tag,
  query,
  currentPage,
}: {
  tag: string;
  query: string;
  currentPage: number;
}) {
  const { locale } = useLocaleContext();
  const posts = await fetchFilteredPosts(tag, query, currentPage, locale);

  return (
    <ul className="post-items clear-both mx-auto mb-16 mt-6 flex w-full max-w-1140px flex-row flex-wrap justify-start p-0">
      {posts?.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
}
