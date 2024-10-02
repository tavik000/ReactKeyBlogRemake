'use client';
import { HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { ShareButton } from '@/app/ui/button';
import { InteractIcon } from '@/app/ui/posts/view/interaction';
import { useLocaleContext } from '@/app/components/context/locale-provider';

export default function PostInteraction({
  likeCount,
  commentCount,
  isSelfPost,
  isLiked,
  isShowingClickEffect,
  postLikes,
  handleClickLike,
}: {
  likeCount: number;
  commentCount: number;
  isSelfPost: boolean;
  isLiked: boolean;
  isShowingClickEffect: boolean;
  postLikes: string[];
  handleClickLike: () => void;
}) {

  const { dict } = useLocaleContext();

  const likeTooltipContent = dict.post.likes + ": " + postLikes.join(', ');
  const truncatedLikeTooltipContent = likeTooltipContent.length > 100
    ? likeTooltipContent.substring(0, 100) + '...'
    : likeTooltipContent;

  const handleChatBubbleClick = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="mt-6 flex justify-between border-b-2 border-t-2 border-gray-100">
      <div className="flex content-center">
        <InteractIcon count={likeCount} shouldShowCount={true} tooltipContent={truncatedLikeTooltipContent}>
          <HeartIcon
            className={`flex h-6 w-6 align-middle
                                ${isSelfPost ? 'hover:cursor-not-allowed' :
                isLiked ? 'hover:cursor-pointer fill-orange-500 text-orange-500' : 'hover:cursor-pointer hover:text-orange-500'}
                                ${isShowingClickEffect ? 'click-effect' : ''}
                                `}
            color="#757575"
            title={dict.post.like}
            onClick={() => {
              handleClickLike();
            }}
          />
        </InteractIcon>
        <InteractIcon count={commentCount} shouldShowCount={commentCount > 0} tooltipContent={dict.post.comment}>
          <ChatBubbleLeftIcon
            className="flex h-6 w-6 align-middle hover:cursor-pointer hover:text-orange-500"
            color="#757575"
            title={dict.post.comment}
            onClick={handleChatBubbleClick}
          />
        </InteractIcon>
      </div>
      <div className="flex content-center">
        <div className="mr-0 inline-block flex-shrink-0">
          <ShareButton type="submit">a</ShareButton>
        </div>
      </div>
    </div>
  );
}
