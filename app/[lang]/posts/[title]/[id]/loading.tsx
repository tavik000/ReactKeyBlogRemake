import PostContentContainer from '@/app/ui/posts/view/post-content-container';
import PostViewWrapperSkeleton from '@/app/ui/posts/view/post-view-wrapper-skeleton';

export default function Loading() {
  return (
    <PostContentContainer>
      <PostViewWrapperSkeleton />;
    </PostContentContainer>
  );
}
