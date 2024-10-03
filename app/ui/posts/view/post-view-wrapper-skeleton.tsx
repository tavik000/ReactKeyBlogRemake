import { keyTwitterId } from '@/app/lib/constants';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/app/lib/definitions';
import { Skeleton } from '@nextui-org/react';
import PostContentContainer from './post-content-container';

export default async function PostViewWrapperSkeleton({ }: {}) {
  return (
    <>
      <PostContentContainer>
        <div className="mb-12 flex flex-col">
          <Skeleton className="mb-4 w-2/5 rounded-lg bg-gray-200 dark:bg-zinc-700">
            <span className="bg-default-200 article-title flex-grow items-start px-4 pb-3 text-[18px] font-bold"></span>
          </Skeleton>
          <Skeleton className="mb-4 w-4/5 rounded-lg bg-gray-200 dark:bg-zinc-700">
            <span className="bg-default-200 article-title flex-grow items-start px-4 pb-3 text-[18px] font-bold"></span>
          </Skeleton>
          <Skeleton className="mb-4 h-6 rounded-lg bg-gray-200 dark:bg-zinc-700">
            <div className="mt-2 flex text-28px font-semibold leading-normal"></div>
          </Skeleton>
          <Skeleton className="mb-4 h-6 rounded-lg bg-gray-200 dark:bg-zinc-700">
            <div className="mt-2 flex text-28px font-semibold leading-normal"></div>
          </Skeleton>
        </div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15].map((tag) => (
          <div key={tag}>
            <Skeleton className="mb-4 h-6 rounded-lg bg-gray-200 dark:bg-zinc-700">
              <span className="bg-default-200 article-title flex-grow items-start px-4 pb-3 text-[18px] font-bold"></span>
            </Skeleton>
          </div>
        ))}
      </PostContentContainer>
    </>
  );
}
