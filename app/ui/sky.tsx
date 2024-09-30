'use client';
import { SkyBackground } from './sky-background';
import React, { useState, useRef, useEffect } from 'react';
import PostHeader from './posts/general/post-header';
import { WaddleDee } from './waddle-dee';
import { Bear, CuriousBear } from './bear';

export default function Sky() {

  const skyBackgroundRef = useRef<HTMLDivElement | null>(null);

  const [isBearActive, setBearActive] = useState<boolean>(false);
  const [isSitting, setSit] = useState<boolean>(false);
  const [groundPosHeight, setGroundPosHeight] = useState<number>(0);
  const curiousBearRef = useRef<HTMLDivElement | null>(null);
  const curiousBearTopCache = useRef<number>(0);

  useEffect(() => {
    const toggleSit = (value: boolean) => {
      if (!skyBackgroundRef.current) {
        throw new Error('skyBackgroundRef is not defined');
      }

      if (!curiousBearRef.current) {
        throw new Error('toggleSit: curiousBearRef is not defined');
      }
      const groundPosHeight =
        skyBackgroundRef.current.getBoundingClientRect().height;


      const curiousBearTop = curiousBearRef.current.getBoundingClientRect().top;
      if (curiousBearTopCache.current === 0) {
        curiousBearTopCache.current = curiousBearTop;
      }

      if (curiousBearTop === 0) {
        return;
      }


      // bear
      const sitTopOffset = -100;

      // Waddle dee
      // const sitTopOffset = 0;
      const sitPosY = groundPosHeight - curiousBearTopCache.current + sitTopOffset;

      if (value) {
        curiousBearRef.current.style.top =
          sitPosY + 'px';
      } else {
        curiousBearRef.current.style.top = '';
      }
      setSit(value);
    };

    const handleScroll = () => {
      checkAndToggleSit();
    };

    const handleResize = () => {
      if (!skyBackgroundRef.current) {
        console.error('skyBackgroundRef is not defined');
        return;
      }

      if (!curiousBearRef.current) {
        throw new Error('checkAndToggleSit: curiousBearRef is not defined');
      }
      if (curiousBearRef.current.classList.contains('is-sitting')) {
        const groundPosHeight =
          skyBackgroundRef.current.getBoundingClientRect().height;

        curiousBearRef.current.style.top =
          groundPosHeight - curiousBearTopCache.current + 'px';
      }
    };

    const checkAndToggleSit = () => {
      if (!skyBackgroundRef.current) {
        console.error('skyBackgroundRef is not defined');
        return;
      }

      if (!curiousBearRef.current) {
        throw new Error('checkAndToggleSit: curiousBearRef is not defined');
      }

      const groundPosHeight =
        skyBackgroundRef.current.getBoundingClientRect().height;
      setGroundPosHeight(groundPosHeight);

      const defaultZoomLevel = 1.5;
      const zoomLevel = window.devicePixelRatio;
      // Waddle dee 
      // const scrollOffset =
      //   groundPosHeight * 0.048 * (zoomLevel / defaultZoomLevel);

      // bear
      const scrollOffset =
        groundPosHeight * 0.058 * (zoomLevel / defaultZoomLevel);
      // console.log(window.scrollY, scrollOffset, groundPosHeight);

      if (window.scrollY + scrollOffset >= groundPosHeight) {
        if (!curiousBearRef.current.classList.contains('is-sitting')) {
          toggleSit(true);
        }
      } else {
        if (curiousBearRef.current.classList.contains('is-sitting')) {
          toggleSit(false);
        }
      }
    };

    setBearActive(true);
    checkAndToggleSit();
    // setTimeout(() => checkAndToggleSit(), 10);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [groundPosHeight, isBearActive]);

  return (
    <>
      <header>
        <PostHeader groundPosHeight={groundPosHeight} />
      </header>
      <main className="flex min-h-screen flex-col">
        {/* <WaddleDee
          isSitting={isSitting}
          isActive={isBearActive}
          ref={curiousBearRef}
        /> */}
        <CuriousBear
          isSitting={isSitting}
          isActive={isBearActive}
          ref={curiousBearRef}
        />
        <SkyBackground ref={skyBackgroundRef} />
      </main>
    </>
  );
}
