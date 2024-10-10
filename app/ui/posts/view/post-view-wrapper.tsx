import { fetchPostById, fetchPostCommentByPostId } from "@/app/lib/data";
import PostViewClient from "./post-view-client";
import { getDictionary } from "@/app/components/localization/dictionaries";
import { DictStructure } from "@/app/components/localization/dict-store";
import PostContentContainer from "./post-content-container";


export default async function PostViewWrapper({
  postId,
  locale,
}: {
  postId: string;
  locale: string;
}) {
  const [post, comments] = await Promise.all([
    fetchPostById(postId, locale),
    fetchPostCommentByPostId(postId),
  ]);
  const dict = (await getDictionary(locale)) as DictStructure;

  if (!post) {
    console.error("Post not found, postId:", postId);
    return (
    <div>
      <PostContentContainer>
        <div className="flex flex-col">
          <p
            id="post-title"
            className="mt-2 flex justify-center text-lg font-semibold leading-normal"
          >
            {dict.post.postNotFound}
          </p>
        </div>
      </PostContentContainer>
    </div>
    );
  }

  const flattenedComments = comments.flat();

  return <PostViewClient post={post} comments={flattenedComments} />;
}
