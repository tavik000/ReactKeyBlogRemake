import { fetchPostById, fetchPostCommentByPostId } from '@/app/lib/data';
import PostViewClient from './post-view-client';
import Head from 'next/head';

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
  const { title, content } = post;
  const limitedContent = content.split(' ').slice(0, 200).join(' ');

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={limitedContent} />
      </Head>
      <PostViewClient post={post} comments={flattenedComments} />
    </>
  );
}