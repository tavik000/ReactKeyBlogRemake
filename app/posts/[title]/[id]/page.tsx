import { keyTwitterId } from '@/app/lib/constants';
import { Metadata } from 'next';
import { fetchPostById } from '@/app/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import PostTag from '@/app/ui/post-tag';
import PostInteraction from '@/app/ui/post-interaction';
import { Post } from '@/app/lib/definitions';
import ReactMarkdown from 'react-markdown';

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
      <div className="flex min-h-screen flex-col">
        <div className="relative mt-6 flex justify-center md:flex-row">
          <div className="flex w-10/12 max-w-1140px basis-2/3 rounded-xl bg-white px-12 pb-8 pt-8 shadow-0550">
            <div className="flex w-full flex-col">
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
              <article className="prose">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </article>
            </div>
          </div>
        </div>
      </div>
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
