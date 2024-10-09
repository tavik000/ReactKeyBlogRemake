import { getDictionary } from "@/app/components/localization/dictionaries";
import PostItem from "./post-item";
import { fetchFilteredPosts } from "@/app/lib/data";
import { DictStructure } from "@/app/components/localization/dict-store";

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
  const dict = (await getDictionary(locale)) as DictStructure;

  if (posts.length === 0) {
    return (
      <div className="category mt-6 flex md:flex-row">
        <div className="flex max-w-1140px rounded-xl bg-white px-12 pb-8 pt-8 shadow-0550 xs:w-11/12 xs:min-w-[300px] xl:w-10/12 xl:basis-2/3 dark:bg-zinc-900">
          <div className="flex flex-col w-full">
            <p className="flex text-lg items-center justify-center text-center">
            {dict.overview.cannotFoundSearch} &quot;{query ? query : tag}&quot;
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ul className="post-items clear-both mx-auto mb-16 mt-6 flex w-full max-w-1140px flex-wrap justify-start p-0 xs:flex-col md:flex-row">
      {posts?.map((post) => <PostItem key={post.id} post={post} />)}
    </ul>
  );
}
