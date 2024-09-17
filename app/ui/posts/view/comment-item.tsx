import { fetchPostCommentById } from '@/app/lib/data';
import CommentItemClient from './comment-item-client';

export default async function CommentItem({
  commentId,
  postTitle,
}: {
  commentId: string;
  postTitle: string;
}) {
  const commentResults = await Promise.all([fetchPostCommentById(commentId)]);
  const comment = commentResults[0];

  return (
    <CommentItemClient comment={comment} commentId={commentId} postTitle={postTitle} />
  );
}