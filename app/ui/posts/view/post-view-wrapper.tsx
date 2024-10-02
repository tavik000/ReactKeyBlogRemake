import { fetchPostById, fetchPostCommentByPostId } from "@/app/lib/data";
import PostViewClient from "./post-view-client";
import Head from "next/head";

export async function generateMetadata({ postId, locale }: { postId: string; locale: string }) {
  const post = await fetchPostById(postId, locale);

  if (!post) {
    return {
      title: 'Post not found',
      description: 'The requested post could not be found.',
    };
  }

  const { title, content } = post;
  const limitedContent = content.split(" ").slice(0, 200).join(" ");

  return {
    title: title,
    description: limitedContent,
  };
}

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
    console.error("Post not found, postId:", postId);
    return <div>Post not found</div>;
  }

  const flattenedComments = comments.flat();
  const { title, content } = post;
  const limitedContent = content.split(" ").slice(0, 200).join(" ");

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={limitedContent} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={limitedContent} />
        <meta property="og:image" content="/opengraph-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kiikey4" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={limitedContent} />
        <meta name="twitter:image" content="/opengraph-image.png" />
      </Head>
      <PostViewClient post={post} comments={flattenedComments} />
    </>
  );
}