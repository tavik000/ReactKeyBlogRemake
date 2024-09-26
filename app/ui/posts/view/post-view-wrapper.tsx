import { fetchPostById, fetchPostCommentByPostId } from '@/app/lib/data';
import PostViewClient from './post-view-client';

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

  if (!post) {
    console.error('Post not found, postId:', postId);
    return <div>Post not found</div>;
  }

  const flattenedComments = comments.flat();
    
  return (
    <PostViewClient post={post} comments={flattenedComments} />
  );
}
