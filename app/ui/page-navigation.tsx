import Link from 'next/link';

export default function PageNavigation() {
  return (
    <div className="page-navigation flex flex-wrap z-10 content-center relative justify-center clear-both mb-20 text-center text-xs">
      <Link
        href="/login"
        className="min-w-54px min-h-40px cursor-pointer rounded-md text-center px-5px py-2 m-0.5 bg-white inline-block hover:bg-orange-500 visited:border-black"
      >
        Prev
      </Link>
    </div>
  );
}
