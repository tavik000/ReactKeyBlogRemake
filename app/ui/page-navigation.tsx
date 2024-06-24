import Link from 'next/link';

export default function PageNavigation() {
  return (
    <div className="page-navigation clear-both mb-20 text-center text-xs">
      <Link
        href="/login"
        className="min-w-54px min-h-32px cursor-pointer rounded-md px-5px py-2 m-0.5 bg-white hover:bg-orange-500 visited:border-black"
      >
        Prev
      </Link>
      <Link
        href="/login"
        className="min-w-54px min-h-32px cursor-pointer rounded-md px-5px py-2 m-0.5 bg-white hover:bg-orange-500 visited:border-black"
      >
        1
      </Link>
      <Link
        href="/login"
        className="min-w-54px min-h-32px cursor-pointer rounded-md px-5px py-2 m-0.5 bg-white hover:bg-orange-500 visited:border-black"
      >
        Next 
      </Link>
    </div>
  );
}
