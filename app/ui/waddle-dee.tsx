'use client';
import React, { useState, useRef } from 'react';

export default function WaddleDee() {
  const [isSitting, setSit] = useState<boolean>(false);
  const waddleDeeRef = useRef<HTMLDivElement | null>(null);
  const groundPosHeight = 6000;
  const offset = 200;

  const toggleSit = (value: boolean) => {
    if (isSitting === value) {
      return;
    }

    if (waddleDeeRef.current) {
      if (value) {
        const deeBottom =
          waddleDeeRef.current.getBoundingClientRect().height +
          waddleDeeRef.current.getBoundingClientRect().top;
        waddleDeeRef.current.style.top = groundPosHeight + offset + 'px';
      } else {
        waddleDeeRef.current.style.top = '';
      }
    }
    setSit(value);
  };

  const handleScroll = () => {
    // console.log(window.scrollY, groundPosHeight, isSitting, isSit);

    if (window.scrollY >= groundPosHeight) {
      if (waddleDeeRef.current) {
        if (!waddleDeeRef.current.classList.contains('is-sitting')) {
          toggleSit(true);
        }
      }
    } else {
      if (waddleDeeRef.current) {
        if (waddleDeeRef.current.classList.contains('is-sitting')) {
          toggleSit(false);
        }
      }
    }
  };

  window.addEventListener('scroll', handleScroll);

  return (
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
  );
}
