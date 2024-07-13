import { homepageURL } from '@/app/lib/constants';
import Link from 'next/link';

export function PagePath() {
    return (

      <div className="page-path flex justify-center relative z-10 mb-0 py-3">
        <ul className="w-10/12 basis-2/3 max-w-1140px mx-auto list-none rounded-md bg-white">
          <PagePathItem url={homepageURL} shouldShowArrow={true}>Key Homepage</PagePathItem>
          <PagePathItem url='/' shouldShowArrow={false}>Blog</PagePathItem>
        </ul>
      </div>
    );
}

function PagePathItem({
  children,
  shouldShowArrow,
  url,
}: {
  children: string;
  shouldShowArrow?: boolean;
  url: string;
}) {
  return (
    <li className="mx-2.5 inline text-sm">
      <Link href={url} className="text-orange-400 hover:underline">
        <span>{children}</span>
      </Link>
      {shouldShowArrow && <span className="page-path-arrow ml-3.5">&gt;</span>}
    </li>
  );
}