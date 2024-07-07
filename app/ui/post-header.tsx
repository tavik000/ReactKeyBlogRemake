'use client';
import PostSearch from './post-search';
import { RoundButton } from './button';
import { useEffect, useState } from 'react';

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<null | 'down' | 'up'>(
    null,
  );
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
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

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', updateScrollDirection); // add event listener
    }
    return () => {
      window.removeEventListener('scroll', updateScrollDirection); // clean up
    };
  }, [scrollDirection]);

  return { scrollDirection, lastScrollY };
}

export default function PostHeader({
  locale,
  groundPosHeight,
}: {
  locale: string;
  groundPosHeight: number;
}) {
  const { scrollDirection, lastScrollY } = useScrollDirection();

//   const isHidden = lastScrollY < groundPosHeight || scrollDirection === 'down';
  const isHidden = lastScrollY < groundPosHeight;

  return (
    <div
      className={`options fixed z-30 mx-auto flex h-14 w-full flex-row  bg-white/95
    ${isHidden ? '-top-24' : 'top-0'}`}
    >
      <div className="flex w-1/2 flex-row">
        <PostSearch placeholder="Search posts..." />
      </div>
      <div className="flex w-1/2 flex-row justify-end">
        <RoundButton>Home</RoundButton>
        <RoundButton>Login</RoundButton>
        <RoundButton>EN</RoundButton>
      </div>
    </div>
  );
}
