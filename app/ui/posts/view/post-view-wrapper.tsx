import { fetchPostById, fetchPostCommentById } from '@/app/lib/data';
import PostViewClient from './post-view-client';

export default async function PostViewWrapper({
  postId,
  locale,
}: {
  postId: string;
  locale: string;
}) {
  const postResults = await Promise.all([fetchPostById(postId, locale)]);
  const post = postResults[0];
  const commentResults = await Promise.all(
    post.comment_id_list.map(commentId => fetchPostCommentById(commentId))
  );

    
  return (
    <PostViewClient post={post} comments={commentResults} />
  );
}
