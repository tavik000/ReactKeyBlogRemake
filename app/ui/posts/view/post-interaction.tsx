import { HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ShareButton } from '@/app/ui/button';
import { InteractIcon } from '@/app/ui/posts/view/interaction';

export default function PostInteraction({
  likeCount,
  commentCount,
  isSelfPost,
  isLiked,
  isShowingClickEffect,
  handleClickLike,
}: {
  likeCount: number;
  commentCount: number;
  isSelfPost: boolean;
  isLiked: boolean;
  isShowingClickEffect: boolean;
  handleClickLike: () => void;
}) {
  return (
    <div className="mt-6 flex  justify-between border-b-2 border-t-2 border-gray-100">
      <div className="flex content-center">
        <InteractIcon count={likeCount} shouldShowCount={true}>
          <HeartIcon
            className={`flex h-6 w-6 align-middle hover:cursor-pointer
                                ${isSelfPost ? 'hover:cursor-not-allowed' :
                isLiked ? 'fill-orange-500 text-orange-500' : 'hover:text-orange-500'}
                                ${isShowingClickEffect ? 'click-effect' : ''}
                                `}
            color="#757575"
            title="Like"
            onClick={() => {
              handleClickLike();
            }}
          />
        </InteractIcon>
        <InteractIcon count={commentCount} shouldShowCount={commentCount > 0}>
          <ChatBubbleLeftIcon
            className="flex h-6 w-6 align-middle"
            color="#757575"
            title="Comment"
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
