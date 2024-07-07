'use client';
import { SkyBackground } from './sky-background';
import { WaddleDee } from './waddle-dee';
import React, {
  useState,
  useRef,
  useEffect,
} from 'react';

export default function Sky() {
  const skyBackgroundRef = useRef<HTMLDivElement | null>(null);

  const [isSitting, setSit] = useState<boolean>(false);
  const waddleDeeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
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
        if (value) {
          waddleDeeRef.current.style.top =
            groundPosHeight - waddleDeeTop + 'px';
        } else {
          waddleDeeRef.current.style.top = '';
        }
        setSit(value);
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

        const scrollOffset = groundPosHeight * 0.04888;
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

      const handleScroll = () => {
        checkAndToggleSit();
      };

      checkAndToggleSit();
      window.addEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col">
      <WaddleDee isSitting={isSitting} ref={waddleDeeRef} />
      <SkyBackground ref={skyBackgroundRef} />
    </main>
  );
}
