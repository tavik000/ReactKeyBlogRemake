import { keyEmail } from '@/app/lib/constants';
import PostContentContainer from '@/app/ui/posts/view/post-content-container';
import TagManageWrapper from '@/app/ui/tag/tag-manage-wrapper';
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();
  if (!session) {
    return (
      <PostContentContainer>
        <div>Access Denied</div>
      </PostContentContainer>
    );
  }
  if (session) {
    if (session.user?.email !== keyEmail) {
      return (
        <PostContentContainer>
          <div>Access Denied</div>
        </PostContentContainer>
      );
    }
  }

  return (
    <PostContentContainer>
      {/* <Suspense fallback={<PostViewWrapperSkeleton />}> */}
      <TagManageWrapper />
      {/* </Suspense> */}
    </PostContentContainer>
  );
}
