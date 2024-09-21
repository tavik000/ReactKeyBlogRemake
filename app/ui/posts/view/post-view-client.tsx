'use client'
import {
  keyEmail,
  keyTwitterId,
} from '@/app/lib/constants';
import PostContent from '@/app/ui/posts/view/post-content';
import { PostTagItem } from '@/app/ui/posts/general/post-tag';
import PostInteraction from '@/app/ui/posts/view/post-interaction';
import Link from 'next/link';
import Image from 'next/image';
import PostContentContainer from './post-content-container';
import CommentItem from './comment-item';
import CommentEditForm from '@/app/ui/posts/view/comment-edit-form';
import { Post, PostComment } from '@/app/lib/definitions';
import PostManage from './post-manage';
import { useLocaleContext } from '@/app/components/context/locale-provider';
import { useSessionContext } from '@/app/components/context/session-provider';
import { useLoginOpenFromPostContext } from '@/app/components/context/login-open-from-post-provider';
import { useState } from 'react';
import { likePostWithAllLanguages, unlikePostWithAllLanguages } from '@/app/lib/actions';

export default function PostViewClient({
  post,
  comments
}: {
  post: Post
  comments: PostComment[]
}
) {

  const postId = post.id;
  const { dict } = useLocaleContext();
  const sessionContext = useSessionContext();
  const { setIsLoginOpenFromPost } = useLoginOpenFromPostContext();
  const isLikedBefore: boolean = !!sessionContext.session && post.likes.includes(sessionContext.session?.user?.name ?? '');
  const [isLiked, setIsLiked] = useState<boolean>(isLikedBefore);
  const [isLikeDisabled, setIsLikeDisabled] = useState(false);
  const [isShowingClickEffect, setIsShowingClickEffect] = useState(false);
  const isSelfPost = sessionContext.session?.user?.name === post.author;

  const handleClickLike = () => {
    if (isSelfPost) return;
    if (isLikeDisabled) return;

    if (!sessionContext.session) {
      setIsLoginOpenFromPost(true);
      return;
    }

    if (!isLiked) {
      if (sessionContext.session?.user?.name) {
        likePostWithAllLanguages(sessionContext.session.user.name, postId);
        setIsLiked(true);
        setIsShowingClickEffect(true);
        setTimeout(() => setIsShowingClickEffect(false), 200);
        setIsLikeDisabled(true);
        setTimeout(() => setIsLikeDisabled(false), 5000);
      } else {
        console.error('User name is not found');
      }
    } else {
      if (sessionContext.session?.user?.name) {
        unlikePostWithAllLanguages(sessionContext.session.user.name, postId);
        setIsLiked(false);
      } else {
        console.error('User name is not found');
      }
    }
  };

  return (
    <div>
      <PostContentContainer>
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
              <PostTagItem key={tag} tag={tag} isLabel={true} />
            ))}
          </span>
          <PostDate post={post} />

          <PostInteraction
            likeCount={post.likes.length +
              ((isLiked && !isLikedBefore) ? 1 :
                (isLikedBefore && !isLiked) ? -1 : 0)}
            commentCount={post.comment_id_list.length}
            isSelfPost={isSelfPost}
            isLiked={isLiked}
            isShowingClickEffect={isShowingClickEffect}
            handleClickLike={handleClickLike}
          />
        </div>
        <PostContent post={post} />
        <PostInteraction
          likeCount={post.likes.length +
            ((isLiked && !isLikedBefore) ? 1 :
              (isLikedBefore && !isLiked) ? -1 : 0)}
          commentCount={post.comment_id_list.length}
          isSelfPost={isSelfPost}
          isLiked={isLiked}
          isShowingClickEffect={isShowingClickEffect}
          handleClickLike={handleClickLike}
        />
        {sessionContext.session && sessionContext.session?.user && sessionContext.session.user.email === keyEmail ? (
          <PostManage postId={postId} postTitle={post.title} />
        ) : (
          <> </>
        )}
      </PostContentContainer>

      <div className="mt-6">
        <PostContentContainer>
          <h2 className="mt-2 text-lg font-semibold leading-normal">
            {dict.comment.commentTitle}
          </h2>
          {post.comment_id_list.length > 0 ? (
            <div className="mt-6 border-t-[1px]">
              {post.comment_id_list.map((commentId) => (
                <CommentItem key={commentId} commentId={commentId} comment={comments.find(comment => comment.id === commentId) ?? null} postTitle={post.title} />
              ))}
            </div>
          ) : (
            <div className="mt-4 pt-8 border-t-2 border-gray-100">
              <p>{dict.comment.noComment}</p>
            </div>
          )}
          <div>
            <CommentEditForm isNewComment={true} postId={postId} postTitle={post.title} commentId={null} onCancel={null} />
          </div>
        </PostContentContainer>
      </div>
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

function PostDate({ post }: { post: Post }) {
  return (
    <div className="mt-2 flex text-sm text-gray-500">
      {post.modify_date > post.create_date ? (
        <div className="flex-row flex">
          <p className="flex">
            Last updated on{' '}
            {post.modify_date
              .toDateString()
              .split(' ')
              .slice(1)
              .join(' ')
              .replace(/(?<=\d) /, ', ')}
          </p>
          <p className="ml-2 flex">
            Posted on{' '}
            {post.create_date
              .toDateString()
              .split(' ')
              .slice(1)
              .join(' ')
              .replace(/(?<=\d) /, ', ')}
          </p>
        </div>
      ) : (
        <p>
          Posted on{' '}
          {post.create_date
            .toDateString()
            .split(' ')
            .slice(1)
            .join(' ')
            .replace(/(?<=\d) /, ', ')}
        </p>
      )}

    </div>
  );
}