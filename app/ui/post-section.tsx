import { lusitana, sniglet } from '@/app/ui/fonts';
import Link from 'next/link';
import { homepageURL } from '@/app/lib/constants';

export default function PostSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="post-section">
      <div className="divide-line">
        <h1
          className={`blog-title ${sniglet.className} absolute -top-20 ml-10 text-5xl font-extrabold`}
        >
          Key Blog
        </h1>
      </div>
      <span className="bg"></span>
      <div className="page-path relative z-10 mb-0 py-3">
        <ul className="w-1200px mx-auto list-none rounded-md bg-white">
          <PagePathItem url={homepageURL} shouldShowArrow={true}>Key Homepage</PagePathItem>
          <PagePathItem url='/' shouldShowArrow={false}>Blog</PagePathItem>
        </ul>
      </div>
      {children}
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
