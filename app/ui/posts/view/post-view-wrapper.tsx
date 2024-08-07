import {
  GetLanguageName,
  GetLocaleFromLang,
  keyEmail,
  keyTwitterId,
} from '@/app/lib/constants';
import PostContent from '@/app/ui/posts/view/post-content';
import { PostTagItem } from '@/app/ui/posts/general/post-tag';
import PostInteraction from '@/app/ui/posts/view/post-interaction';
import Link from 'next/link';
import Image from 'next/image';
import { fetchPostById } from '@/app/lib/data';
import { Post } from '@/app/lib/definitions';
import PostManage from './post-manage';
import { auth } from '@/auth';

export default async function PostViewWrapper({
  postId,
  locale,
}: {
  postId: string;
  locale: string;
}) {
  const postResults = await Promise.all([fetchPostById(postId, locale)]);
  const post = postResults[0];
  const session = await auth();

  return (
    <>
      <div className="mb-12 flex flex-col">
        <AuthorInfo post={post} />
        <h1
          id="post-title"
          className="mt-2 flex text-28px font-semibold leading-normal"
        >
          {post.title}
        </h1>
        <span className="3/5 mt-2 flex flex-wrap justify-start">
          {post.tags.map((tag) => (
            <PostTagItem key={tag} locale={locale} tag={tag} isLabel={true} />
          ))}
        </span>
        <PostDate post={post} />

        <PostInteraction
          likeCount={post.likes}
          commentCount={post.comment_id_list.length}
        />
      </div>
      <PostContent post={post} />
      <PostInteraction
        likeCount={post.likes}
        commentCount={post.comment_id_list.length}
      />
      {session && session?.user && session.user.email === keyEmail ? (
        <PostManage locale={locale} postId={postId} postTitle={post.title} />
      ) : (
        <> </>
      )}
    </>
  );
}

function AuthorInfo({ post }: { post: Post }) {
  return (
    <Link
      className="flex flex-row items-center"
      href={`https://twitter.com/${keyTwitterId}`}
      passHref={true}
    >
      <Image
        src="https://pbs.twimg.com/profile_images/1786593978907017216/lkgFHOOf_400x400.jpg"
        alt={post.title}
        width={24}
        height={24}
        className="mr-2 rounded-full"
      />
      <p>
        @{keyTwitterId}({post.author})
      </p>
    </Link>
  );
}

function PostDate({ post }: { post: Post }) {
  return (
    <div className="mt-2 flex text-sm text-gray-500">
      <p>
        Last updated on{' '}
        {post.modify_date
          .toDateString()
          .split(' ')
          .slice(1)
          .join(' ')
          .replace(/(?<=\d) /, ', ')}
      </p>
      <p className="ml-2">
        Posted on{' '}
        {post.create_date
          .toDateString()
          .split(' ')
          .slice(1)
          .join(' ')
          .replace(/(?<=\d) /, ', ')}
      </p>
    </div>
  );
}
