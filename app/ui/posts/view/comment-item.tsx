import { fetchPostCommentById } from '@/app/lib/data';
import CommentItemClient from './comment-item-client';
import { PostComment } from '@/app/lib/definitions';

export default function CommentItem({
  commentId,
  comment,
  postTitle,
  postId,
}: {
  commentId: string;
  comment: PostComment | null;
  postTitle: string;
  postId: string;
}) {

  if (!comment) {
    console.error('Comment is not found, commentId:' + commentId);
    return null;
  }

  return (
    <CommentItemClient comment={comment} commentId={comment.id} postTitle={postTitle} postId={postId} />
  );
}