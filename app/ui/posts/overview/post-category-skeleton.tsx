import { PostTagItem } from '@/app/ui/posts/general/post-tag';
import { Skeleton } from '@nextui-org/react';

export default async function PostCategorySkeleton({}: {}) {
  return (
    <div className="category mt-6 flex md:flex-row">
      <div className="flex w-10/12 max-w-1140px basis-2/3 rounded-xl bg-white px-12 pb-8 pt-8 shadow-0550">
        <div className="flex flex-col">
          <Skeleton className="mb-4 h-8 w-1/5 rounded-lg bg-gray-200 shadow-sm" />
          <div className="flex flex-col">
            <div className="flex flex-row">
              {[1, 2, 3].map((num) => (
                <ul key={num} className="w-80">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <li key={num}>
                      <Skeleton className="mb-2 h-6 w-1/3 rounded-lg bg-gray-200 shadow-sm" />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
