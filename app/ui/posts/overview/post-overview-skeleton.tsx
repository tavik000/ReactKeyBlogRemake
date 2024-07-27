import PostCategorySkeleton from './post-category-skeleton';
import PostWrapperSkeleton from './post-wrapper-skeleton';

export default async function PostOverviewSkeleton({}: {}) {
  return (
    <>
      <div className="post-overview">
        <PostCategorySkeleton/>
        <PostWrapperSkeleton/>
      </div>
    </>
  );
}
