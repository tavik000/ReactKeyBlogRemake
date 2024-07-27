import PostItemSkeleton from './post-item-skeleton';

export default async function PostWrapperSkeleton({}: {}) {
  return (
    <ul className="post-items clear-both mx-auto mb-16 mt-6 flex w-full max-w-1140px flex-row flex-wrap justify-start p-0">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <PostItemSkeleton key={num} />
      ))}
    </ul>
  );
}
