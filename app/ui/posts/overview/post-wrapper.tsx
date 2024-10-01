import PostItem from "./post-item";
import { fetchFilteredPosts } from "@/app/lib/data";

export default async function PostWrapper({
  tag,
  query,
  currentPage,
  locale,
}: {
  tag: string;
  query: string;
  currentPage: number;
  locale: string;
}) {
  const posts = await fetchFilteredPosts(tag, query, currentPage, locale);

  return (
    <ul className="post-items clear-both mx-auto mb-16 mt-6 flex w-full max-w-1140px flex-wrap justify-start p-0 xs:flex-col md:flex-row">
      {posts?.map((post) => <PostItem key={post.id} post={post} />)}
    </ul>
  );
}
