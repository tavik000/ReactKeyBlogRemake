'use client';
import { log } from 'console';
import { SkyBackground } from './sky-background';
import React, { useState, useRef, useEffect, MutableRefObject } from 'react';

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
          throw new Error('waddleDee is not defined');
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
          throw new Error('waddleDee is not defined');
        }

        const groundPosHeight =
          skyBackgroundRef.current.getBoundingClientRect().height;

        const scrollOffset = groundPosHeight * 0.04888;
        console.log(window.scrollY, scrollOffset, groundPosHeight);
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
      <div
        id="waddleDee"
        className={`waddle-dee ${isSitting ? 'is-sitting' : ''}`}
        ref={waddleDeeRef}
      >
        <div className="parasol">
          <div className="parasol-top">
            <div className="parasol-top-material"></div>
            <div className="parasol-top-footer">
              <div className="parasol-top-footer-left"></div>
              <div className="parasol-top-footer-center"></div>
              <div className="parasol-top-footer-right"></div>
            </div>
          </div>
          <div className="parasol-stick"></div>
        </div>
        <div className="waddle-arm waddle-arm-left"></div>
        <div className="waddle-arm waddle-arm-right"></div>
        <div className="waddle-body">
          <div className="waddle-face">
            <div className="waddle-blush waddle-blush-left"></div>
            <div className="waddle-blush waddle-blush-right"></div>
            <div className="waddle-eye waddle-eye-left"></div>
            <div className="waddle-eye waddle-eye-right"></div>
          </div>
        </div>
        <div className="waddle-foot waddle-foot-left"></div>
        <div className="waddle-foot waddle-foot-right"></div>
      </div>
      <SkyBackground ref={skyBackgroundRef} />
    </main>
  );
}
