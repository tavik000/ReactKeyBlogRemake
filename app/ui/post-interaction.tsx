import { HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ShareButton } from '@/app/ui/button';

export default function PostInteraction({
  likeCount,
  commentCount,
}: {
  likeCount: number;
  commentCount: number;
}) {
  return (
    <div className="mt-6 flex  justify-between border-b-2 border-t-2 border-gray-100">
      <div className="flex content-center">
        <InteractIcon count={likeCount} shouldShowCount={true}>
          <HeartIcon
            className="flex h-6 w-6 align-middle"
            color="#757575"
            title="Like"
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

const InteractIcon = ({
  count,
  shouldShowCount,
  children,
}: {
  count: number;
  shouldShowCount: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div className="inline-block flex-shrink-0 w-16 py-2 px-0.5 break-words">
      <div className="flex flex-row content-center">
        <Link href="/" className="flex">
          <div className="relative mr-1">
            <span>
              <div className="inline-block align-middle">{children}</div>
            </span>
          </div>
          {shouldShowCount && (
            <div className="block break-words">
              <div className="inline-block">
                <p className="flex">{count}</p>
              </div>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};
