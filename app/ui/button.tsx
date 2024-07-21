import clsx from 'clsx';
import Link from 'next/link';
import {
  GlobeAltIcon,
  UserCircleIcon,
  ArrowUpOnSquareIcon,
} from '@heroicons/react/24/outline';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center justify-center rounded-lg px-4 text-sm text-center font-medium text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  );
}

export function RoundButton({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'round-button relative z-auto m-5 w-full max-w-md items-center overflow-hidden rounded-3xl text-lg font-bold text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}
    >
      <span className="button-span relative z-10 block rounded-3xl pb-2 shadow-02 before:absolute before:left-0 before:top-0 before:h-1/2 before:w-full before:bg-white before:bg-opacity-10 hover:bg-blue-400 hover:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
        {children}
      </span>
    </button>
  );
}

export function LanguageButton({ href }: { href: string }) {
  return (
    <Link
      className="my-2 flex h-10 w-10 items-center justify-center rounded-md"
      href={href}
    >
      <GlobeAltIcon className="h-5 w-5 text-gray-500" />
    </Link>
  );
}

export function UserButton({ href }: { href: string }) {
  return (
    <Link
      className="my-2 flex h-10 w-10 items-center justify-center rounded-md"
      href={href}
    >
      <UserCircleIcon className="h-5 w-5 text-gray-500" />
    </Link>
  );
}

export function ShareButton({ ...rest }: ButtonProps) {
  return (
    <button {...rest} className="px-0.5 py-2">
      <ArrowUpOnSquareIcon className="h-6 w-6" color="#6b6b6b" title="Share" />
    </button>
  );
}
