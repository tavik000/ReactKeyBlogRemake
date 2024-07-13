'use client';
import { SkyBackground } from './sky-background';
import { WaddleDee } from './waddle-dee';
import React, { useState, useRef, useEffect } from 'react';
import PostHeader from './post-header';
import { set } from 'zod';

export default function Sky({ locale }: { locale: string }) {
  const skyBackgroundRef = useRef<HTMLDivElement | null>(null);

  const [isWaddleActive, setWaddleActive] = useState<boolean>(false);
  const [isSitting, setSit] = useState<boolean>(false);
  const [groundPosHeight, setGroundPosHeight] = useState<number>(0);
  const waddleDeeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const toggleSit = (value: boolean) => {
      if (!skyBackgroundRef.current) {
        throw new Error('skyBackgroundRef is not defined');
      }

      if (!waddleDeeRef.current) {
        throw new Error('toggleSit: waddleDeeRef is not defined');
      }
      const groundPosHeight =
        skyBackgroundRef.current.getBoundingClientRect().height;

      const waddleDeeTop = waddleDeeRef.current.getBoundingClientRect().top;

      if (waddleDeeTop === 0) {
        return;
      }

      if (value) {
        waddleDeeRef.current.style.top = groundPosHeight - waddleDeeTop + 'px';
      } else {
        waddleDeeRef.current.style.top = '';
      }
      setSit(value);
    };

    const handleScroll = () => {
      checkAndToggleSit();
    };

    const checkAndToggleSit = () => {
      if (!skyBackgroundRef.current) {
        throw new Error('skyBackgroundRef is not defined');
      }

      if (!waddleDeeRef.current) {
        throw new Error('checkAndToggleSit: waddleDeeRef is not defined');
      }

      const groundPosHeight =
        skyBackgroundRef.current.getBoundingClientRect().height;
      setGroundPosHeight(groundPosHeight);

      const scrollOffset = groundPosHeight * 0.06;
      // console.log(window.scrollY, scrollOffset, groundPosHeight);
      if (window.scrollY + scrollOffset >= groundPosHeight) {
        if (!waddleDeeRef.current.classList.contains('is-sitting')) {
          toggleSit(true);
        }
      } else {
        if (waddleDeeRef.current.classList.contains('is-sitting')) {
          toggleSit(false);
        }
      }
    };

    setWaddleActive(true);
    checkAndToggleSit();
    // setTimeout(() => checkAndToggleSit(), 10);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [groundPosHeight, isWaddleActive]);

  return (
    <>
      <header>
        <PostHeader locale={locale} groundPosHeight={groundPosHeight} />
      </header>
      <main className="flex min-h-screen flex-col">
        <WaddleDee
          isSitting={isSitting}
          isActive={isWaddleActive}
          ref={waddleDeeRef}
        />
        <SkyBackground ref={skyBackgroundRef} />
      </main>
    </>
  );
}
