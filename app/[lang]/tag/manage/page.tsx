import PostContentContainer from "@/app/ui/posts/view/post-content-container";
import TagManageWrapper from "@/app/ui/tag/tag-manage-wrapper";
import { Suspense } from "react";

export default function Page() {
  return (
      <PostContentContainer>
        {/* <Suspense fallback={<PostViewWrapperSkeleton />}> */}
          <TagManageWrapper/>
        {/* </Suspense> */}
      </PostContentContainer>
  );
}
