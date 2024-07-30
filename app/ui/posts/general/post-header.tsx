'use client';
import PostSearch from './post-search';
import {
  CreatePostButton,
  LanguageButton,
  TagButton,
} from '@/app/ui/button';
import { UserButton } from './userButton';
import { useEffect, useState } from 'react';
import { sniglet } from '@/app/ui/fonts';
import Link from 'next/link';
import { homepageURL } from '@/app/lib/constants';
import { DictStructure } from '@/app/components/localization/dict-store';
import { Session } from 'next-auth';
import { keyEmail } from '@/app/lib/constants';
import { signOut } from '@/auth';
import { signOutAction } from '@/app/lib/actions';

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<null | 'down' | 'up'>(
    null,
  );
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    let lastY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastY ? 'down' : 'up';
      if (
        direction !== scrollDirection &&
        (scrollY - lastY > 10 || scrollY - lastY < -10)
      ) {
        setScrollDirection(direction);
      }
      setLastScrollY(lastY);
      lastY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener('scroll', updateScrollDirection); // add event listener
    setTimeout(() => {
      setLastScrollY(window.scrollY);
    }, 0);
    return () => {
      window.removeEventListener('scroll', updateScrollDirection); // clean up
    };
  }, [scrollDirection]);

  return { scrollDirection, lastScrollY, isLoaded };
}

export default function PostHeader({
  locale,
  groundPosHeight,
  dict,
  session,
}: {
  locale: string;
  groundPosHeight: number;
  dict: DictStructure;
  session?: Session;
}) {
  const { scrollDirection, lastScrollY, isLoaded } = useScrollDirection();

  const isHidden = lastScrollY < groundPosHeight || !isLoaded;

  return (
    <div
      className={`options fixed z-30 mx-auto flex h-14 w-full flex-row  bg-white/95
    ${isHidden ? '-top-24' : 'top-0'}`}
    >
      <div className="flex w-1/2 flex-row">
        <Link
          href={homepageURL}
          className={`blog-title flex ${sniglet.className} my-2 ml-4 text-4xl font-semibold`}
        >
          Key
        </Link>
        <PostSearch locale={locale} placeholder={dict.header.searchPost} />
      </div>
      <div className="flex w-1/2 flex-row justify-end">
        {session?.user?.email === keyEmail ? (
          <>
            <CreatePostButton locale={locale} />
            <TagButton href="/en/tag/manage" />
          </>
        ) : null}
        <LanguageButton locale={locale} isHidden={isHidden} />
        <UserButton locale={locale} session={session}/>
      </div>
    </div>
  );
}
