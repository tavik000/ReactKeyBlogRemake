import { Skeleton } from '@nextui-org/react';

export default function PostItemSkeleton({}: {}) {
  return (
    <li className="post-item mb-6 flex min-h-[400px] w-1/3 max-w-400px basis-1/3 list-none flex-col px-11px">
      <article className="block h-full flex-row">
        <div className="article-link flex h-full flex-row">
          <div className="post-article flex h-full w-full flex-col justify-between rounded-xl bg-white px-3 pb-4 pt-6 font-bold shadow-0550 dark:bg-zinc-900">
            <Skeleton className="rounded-lg bg-gray-200 dark:bg-zinc-700">
              <div className="bg-default-300 h-[188px] w-[333px] rounded-lg"></div>
            </Skeleton>
            <Skeleton className="w-full h-4 rounded-lg bg-gray-200 dark:bg-zinc-700">
              <span className="bg-default-200 article-title flex-grow items-start px-4 pb-3 text-[18px] font-bold"></span>
            </Skeleton>
            <Skeleton className="w-full h-4 rounded-lg bg-gray-200 dark:bg-zinc-700">
              <span className="article-title flex-grow items-start px-4 pb-3 text-[18px] font-bold"></span>
            </Skeleton>
            <Skeleton className="w-full h-4 rounded-lg bg-gray-200 dark:bg-zinc-700">
              <span className="article-title flex-grow items-start px-4 pb-3 text-[18px] font-bold"></span>
            </Skeleton>
            <span className="relative mb-0 flex flex-row justify-between ">
              <Skeleton className="w-3/5 rounded-lg bg-gray-200 dark:bg-zinc-700">
                <span className="article-date flex h-full items-end px-1em text-left text-14px/[1.5] font-normal"></span>
              </Skeleton>
              <span className="flex w-3/5 flex-wrap justify-end">
                <Skeleton className="w-3/5 rounded-lg bg-gray-200 dark:bg-zinc-700">
                  <span
                    className={`static mb-5px ml-5px inline-block w-auto rounded-sm bg-orange-500 px-1em text-center text-13px/[1.5] font-normal text-white`}
                  ></span>
                </Skeleton>
              </span>
            </span>
          </div>
        </div>
      </article>
    </li>
  );
}
