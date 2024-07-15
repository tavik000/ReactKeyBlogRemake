import { keyTwitterId } from '@/app/lib/constants';
import { Metadata } from 'next';
import { fetchPostById } from '@/app/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import PostTag from '@/app/ui/posts/post-tag';
import PostInteraction from '@/app/ui/posts/post-interaction';
import { Post } from '@/app/lib/definitions';
import PostContent from '@/app/ui/posts/post-content';
import PostContainer from '@/app/ui/posts/post-container';

export const metadata: Metadata = {
  title: 'post',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const postResults = await Promise.all([fetchPostById(id, 'en')]);
  const post = postResults[0];

  // TODO: not found

  return (
    <main>
      <PostContainer>
        <div className="mb-12 flex flex-col">
          <AuthorInfo post={post} />
          <h1 className="mt-2 flex text-28px font-semibold leading-normal">
            {post.title}
          </h1>
          <span className="3/5 mt-2 flex flex-wrap justify-start">
            {post.tags.map((tag) => (
              <PostTag key={tag}>{tag}</PostTag>
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
      </PostContainer>
    </main>
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
