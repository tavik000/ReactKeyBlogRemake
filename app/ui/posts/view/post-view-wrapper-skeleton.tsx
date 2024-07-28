import { keyTwitterId } from '@/app/lib/constants';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/app/lib/definitions';
import { Skeleton } from '@nextui-org/react';

export default async function PostViewWrapperSkeleton({}: {}) {
  return (
    <>
      <div className="mb-12 flex flex-col">
        <Skeleton className="mb-4 w-2/5 rounded-lg bg-gray-200">
          <span className="bg-default-200 article-title flex-grow items-start px-4 pb-3 text-[18px] font-bold"></span>
        </Skeleton>
        <Skeleton className="mb-4 w-4/5 rounded-lg bg-gray-200">
          <span className="bg-default-200 article-title flex-grow items-start px-4 pb-3 text-[18px] font-bold"></span>
        </Skeleton>
        <Skeleton className="mb-4 h-6 rounded-lg bg-gray-200">
          <div className="mt-2 flex text-28px font-semibold leading-normal"></div>
        </Skeleton>
        <span className="3/5 mt-2 flex flex-wrap justify-start">
          {[1, 2].map((tag) => (
            <div key={tag}>
              <Skeleton className="w-2/12 h-6 mb-4 mr-2 rounded-lg bg-gray-200">
                <span className="bg-default-200 article-title flex-grow items-start px-4 pb-3 text-[18px] font-bold"></span>
              </Skeleton>
            </div>
          ))}
        </span>
        <Skeleton className="h-6 mb-4 rounded-lg bg-gray-200">
          <div className="mt-2 flex text-28px font-semibold leading-normal"></div>
        </Skeleton>
      </div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15].map((tag) => (
        <div key={tag}>
          <Skeleton className="h-6 mb-4 rounded-lg bg-gray-200">
            <span className="bg-default-200 article-title flex-grow items-start px-4 pb-3 text-[18px] font-bold"></span>
          </Skeleton>
        </div>
      ))}
    </>
  );
}
